import { Edit, EyeIcon, Plus, Search, Trash, Printer } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal, ModalBody } from 'flowbite-react'
import AddNewProduct from '../../components/products/AddNewProduct'
import ProductDetail from '../../components/products/ProductDetail'
import Paginaton from '../../../client/components/common/Paginaton'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  const [openNewProductModal, setOpenNewProductModal] = useState(false)
  const [openProductDetailModal, setOpenProductDetailModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const API_URL = import.meta.env.VITE_API_URL
  const { adminToken } = useAuth()

  useEffect(() => {
    getProducts()
  }, [page])



  async function getProducts() {
    try {
      const res = await axios.get(`${API_URL}/api/product/all-products?page=${page}&limit=${10}`)
      setProducts(res.data.products)
      setTotalPages(res.data.pagination.totalPages)
    } catch (error) {
      console.log("Error fetching products:", error)
    }
  }

  const applyFilters = () => {

  }

  const exportCSV = () => {

  }

  return (
    <section className='text-gray-700'>
      <div className='flex flex-col gap-5'>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <h1 className="text-lg font-bold">Products</h1>

          <div className="flex flex-wrap gap-4 items-center">

            {/* Search */}
            <div className="flex items-center border border-gray-300 rounded-md p-2 focus-within:border-blue-500 transition">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 focus:outline-none px-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="text-gray-400 w-5 h-5 hover:text-blue-500 cursor-pointer" />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border px-3 py-2 rounded text-sm"
            >
              <option>All</option>
              { }
            </select>

            {/* Add Product */}
            <button
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => setOpenNewProductModal(true)}
            >
              <Plus size={16} /> Add Product
            </button>

            {/* Export */}
            <button
              className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
              onClick={exportCSV}
            >
              <Printer size={16} /> Export CSV
            </button>
          </div>
        </div>

        {/* Modals */}
        {openNewProductModal && <AddNewProduct setOpenModal={setOpenNewProductModal} openModal={openNewProductModal} getProducts={getProducts} />}
        {openProductDetailModal && <ProductDetail
          setOpenModal={setOpenProductDetailModal}
          openModal={openProductDetailModal}
          product={selectedProduct}
          getProducts={getProducts}
          setSelectedProduct={setSelectedProduct} />}
        {/* Table */}
        <div className="overflow-x-auto rounded shadow">
          <Table>
            <TableHead className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHeadCell>ID</TableHeadCell>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Category</TableHeadCell>
                <TableHeadCell>Stock</TableHeadCell>
                <TableHeadCell>Price</TableHeadCell>
                <TableHeadCell>Discount</TableHeadCell>
                <TableHeadCell>Sale Price</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {products.length > 0 ? products.map((product, idx) => (
                <TableRow key={product._id} className={`transition hover:bg-blue-50 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className='flex gap-1'>
                    <div><img
                      src={`${API_URL}/${product.images?.find(i => i.main)?.filename}`}
                      className="w-10 h-10 rounded object-contain"
                    /></div>
                    {product.title}
                  </TableCell>
                  <TableCell>{product.category.title}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${5 < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      5
                    </span>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.discountPercent}%</TableCell>
                  <TableCell>${(product.price - (product.price * product.discountPercent / 100)).toFixed(2)}</TableCell>
                  <TableCell className="flex gap-2">
                    <EyeIcon className="p-2 w-9 h-9 rounded hover:bg-gray-200 cursor-pointer" onClick={() => { setOpenProductDetailModal(true); setSelectedProduct(product) }} />
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow key="">
                  <TableCell colSpan={8}>
                    <div className="text-center py-4 text-gray-500">No Product Available</div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/*Pagination*/}
        <div className="flex gap-2 mt-5 justify-center">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded
              ${page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

export default Products
