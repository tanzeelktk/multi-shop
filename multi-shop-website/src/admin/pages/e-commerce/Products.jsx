import { Edit, EyeIcon, Plus, Search, Trash, Printer } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal, ModalBody } from 'flowbite-react'
import AddNewProduct from '../../components/products/AddNewProduct'
import ProductDetail from '../../components/products/ProductDetail'
import UpdateProduct from '../../components/products/UpdateProduct'
import Paginaton from '../../../client/components/common/Paginaton'

const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  const [openNewProductModal, setOpenNewProductModal] = useState(false)
  const [openProductDetailModal, setOpenProductDetailModal] = useState(false)
  const [openUpdateProductModal, setOpenUpdateProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [products, search, categoryFilter])

  async function getProducts() {
    try {
      const res = await fetch('/jsondata/products.json')
      if (!res.ok) throw new Error("Failed to fetch products")
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.log("Error fetching products:", error)
    }
  }

  const applyFilters = () => {
    let temp = products.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    if (categoryFilter !== 'All') {
      temp = temp.filter(p => p.category === categoryFilter)
    }
    setFilteredProducts(temp)
    setCurrentPage(1)
  }

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    setConfirmDelete(false)
  }

  const exportCSV = () => {
    if (filteredProducts.length === 0) return
    const csvData = filteredProducts.map(p => ({
      ID: p.id,
      Name: p.title,
      Category: p.category,
      Stock: 5,
      Price: p.price,
      Discount: p.discount,
      SalePrice: (p.price - (p.price * p.discount / 100)).toFixed(2)
    }))
    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(item => Object.values(item).join(','))
    ].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'products.csv')
    link.click()
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
              {[...new Set(products.map(p => p.category))].map((cat, idx) => (
                <option key={idx}>{cat}</option>
              ))}
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
        {openNewProductModal && <AddNewProduct setOpenModal={setOpenNewProductModal} openModal={openNewProductModal} />}
        {openProductDetailModal && <ProductDetail setOpenModal={setOpenProductDetailModal} openModal={openProductDetailModal} product={selectedProduct} />}
        {openUpdateProductModal && <UpdateProduct setOpenModal={setOpenUpdateProductModal} openModal={openUpdateProductModal} product={selectedProduct} />}
        {confirmDelete && (
          <Modal show={confirmDelete} size="sm" onClose={() => setConfirmDelete(false)}>
            <ModalBody className="text-center space-y-4">
              <p className="font-semibold">Delete this product?</p>
              <p className="text-sm text-gray-500">This action cannot be undone.</p>
              <div className="flex justify-center gap-3">
                <button className="border px-4 py-2 rounded" onClick={() => setConfirmDelete(false)}>Cancel</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(deleteId)}>Delete</button>
              </div>
            </ModalBody>
          </Modal>
        )}

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
              {currentItems.length > 0 ? currentItems.map((product, idx) => (
                <TableRow key={product.id} className={`transition hover:bg-blue-50 ${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${5 < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      5
                    </span>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.discount}%</TableCell>
                  <TableCell>${(product.price - (product.price * product.discount / 100)).toFixed(2)}</TableCell>
                  <TableCell className="flex gap-2">
                    <EyeIcon className="p-2 w-9 h-9 rounded hover:bg-gray-200 cursor-pointer" onClick={() => { setOpenProductDetailModal(true); setSelectedProduct(product) }} />
                    <Edit className="p-2 w-9 h-9 rounded hover:bg-gray-200 cursor-pointer" onClick={() => { setOpenUpdateProductModal(true); setSelectedProduct(product) }} />
                    <Trash className="p-2 w-9 h-9 rounded hover:bg-red-100 text-red-500 cursor-pointer" onClick={() => { setConfirmDelete(true); setDeleteId(product.id) }} />
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={8}>
                    <div className="text-center py-4 text-gray-500">No Product Available</div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <Paginaton
          products={filteredProducts.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />

      </div>
    </section>
  )
}

export default Products
