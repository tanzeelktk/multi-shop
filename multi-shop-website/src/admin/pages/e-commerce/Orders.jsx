import {
  Modal,
  ModalBody,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow
} from 'flowbite-react'
import { EyeIcon, Search, Trash, FileText, Printer } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import OrderDetail from '../../components/orders/OrderDetail'
import Invoice from '../../components/orders/Invoice'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

const Orders = () => {
  const [ordersData, setOrdersData] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])

  const [openOrderDetailModal, setOpenOrderDetailModal] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(null)
  const [invoiceOpen, setInvoiceOpen] = useState(false)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const { adminToken } = useAuth()
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [ordersData, search, statusFilter])

  async function fetchOrders() {
    try {
      const res = await axios.get(`${API_URL}/api/orders/get-all`, { headers: { Authorization: `Bearer ${adminToken}` } })
      console.log(res.data.orders)
      setOrdersData(res.data.orders)
    } catch (error) {
      console.log('Error fetching orders:', error)
    }
  }

  const applyFilters = () => {
    // let temp = ordersData.filter(order =>
    //   order.customer.name.toLowerCase().includes(search.toLowerCase())
    // )
    // if (statusFilter !== 'All') {
    //   temp = temp.filter(order => order.status === statusFilter)
    // }
    // setFilteredOrders(temp)
    // setCurrentPage(1) // reset page
  }

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  // Status Badge helper
  const statusBadge = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-600'
      case 'Pending': return 'bg-yellow-100 text-yellow-600'
      case 'Shipped' : return "bg-purple-100 text-purple-600"
      case 'Processing': return 'bg-blue-100 text-blue-600'
      case 'Cancelled': return 'bg-red-100 text-red-600'
      case 'Delivered': return 'bg-indigo-100 text-indigo-600'
      default: return ''
    }
  }

  // Export to CSV
  const exportCSV = () => {
    const csvData = filteredOrders.map(order => ({
      ID: order.orderId,
      Customer: order.customer.name,
      Subtotal: order.subtotal,
      Total: order.total,
      Status: order.status,
      Date: new Date(order.orderDate).toLocaleDateString()
    }))
    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(item => Object.values(item).join(','))
    ].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'orders.csv')
    link.click()
  }

  return (
    <section className="flex flex-col gap-5">

      {/* Header + Summary */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="font-bold text-xl">Orders</h1>

        <div className="flex flex-wrap gap-2 items-center">
          {/* Search */}
          <div className="flex items-center border px-2 rounded focus-within:border-blue-400">
            <input
              placeholder="Search customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 text-sm focus:outline-none"
            />
            <Search size={18} className="text-gray-500" />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-2 rounded text-sm"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          {/* Export CSV */}
          <button
            onClick={exportCSV}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            <Printer size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Modals */}
      {openOrderDetailModal && (
        <OrderDetail
          openModal={openOrderDetailModal}
          setOpenModal={setOpenOrderDetailModal}
          order={currentOrder}
          setOrder={setCurrentOrder}
          fetchOrders={fetchOrders}
        />
      )}

      {invoiceOpen && (
        <Modal show={invoiceOpen} size="lg" onClose={() => setInvoiceOpen(false)}>
          <ModalBody>
            <Invoice order={currentOrder} />
          </ModalBody>
        </Modal>
      )}

      {confirmDelete && (
        <Modal show={confirmDelete} size="sm" onClose={() => setConfirmDelete(false)}>
          <ModalBody className="text-center space-y-4">
            <p className="font-semibold">Delete this order?</p>
            <p className="text-sm text-gray-500">This action cannot be undone.</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setOrdersData(prev =>
                    prev.filter(o => o.orderId !== deleteId)
                  )
                  setConfirmDelete(false)
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </ModalBody>
        </Modal>
      )}

      {/* Orders Table */}
      <div className="overflow-x-auto rounded shadow">
        <Table>
          <TableHead className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHeadCell>Sr.</TableHeadCell>
              <TableHeadCell>Customer</TableHeadCell>
              <TableHeadCell>Subtotal</TableHeadCell>
              <TableHeadCell>Total</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {ordersData.length > 0 ? (
              ordersData.map((order, index) => (
                <TableRow
                  key={order._id}
                  className={`transition hover:bg-blue-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>${order.shippingPrice}</TableCell>
                  <TableCell>${order.totalPrice}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}</TableCell>
                  <TableCell className="flex gap-2">
                    <EyeIcon
                      title="View Order"
                      className="p-2 w-9 h-9 rounded hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setOpenOrderDetailModal(true)
                        setCurrentOrder(order)
                      }}
                    />
                    <Trash
                      title="Delete Order"
                      className="p-2 w-9 h-9 rounded hover:bg-red-100 text-red-500 cursor-pointer"
                      onClick={() => {
                        setConfirmDelete(true)
                        setDeleteId(order.orderId)
                      }}
                    />
                    {(order.status === 'Completed' || order.status === 'Delivered') && (
                      <FileText
                        title="Generate Invoice"
                        className="p-2 w-9 h-9 rounded hover:bg-green-100 text-green-600 cursor-pointer"
                        onClick={() => {
                          setInvoiceOpen(true)
                          setCurrentOrder(order)
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                  😔 No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : ''}`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

    </section>
  )
}

export default Orders
