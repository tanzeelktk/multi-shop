import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
  TableCell,
  Modal,
  ModalBody
} from 'flowbite-react'
import { EyeIcon, Search, ArrowDown, ArrowUp } from 'lucide-react'

// Dummy summary card component
const SummaryCard = ({ title, value, color }) => (
  <div className={`p-4 rounded-lg shadow flex flex-col justify-between border ${color}`}>
    <p className="text-sm text-gray-500">{title}</p>
    <p className="font-bold text-lg">{value}</p>
  </div>
)

const Payments = () => {
  const [payments, setPayments] = useState([])
  const [filteredPayments, setFilteredPayments] = useState([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [methodFilter, setMethodFilter] = useState('All')
  const [viewModal, setViewModal] = useState(false)
  const [currentPayment, setCurrentPayment] = useState(null)

  useEffect(() => {
    fetchPayments()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [search, statusFilter, methodFilter, payments])

  async function fetchPayments() {
    try {
      const res = await fetch('/jsondata/payments.json')
      if (!res.ok) throw new Error('Failed to fetch payments')
      const data = await res.json()
      setPayments(data)
    } catch (error) {
      console.log('Error fetching payments:', error)
    }
  }

  const applyFilters = () => {
    let temp = payments.filter(payment =>
      payment.customer.name.toLowerCase().includes(search.toLowerCase())
    )

    if (statusFilter !== 'All') {
      temp = temp.filter(payment => payment.status === statusFilter)
    }

    if (methodFilter !== 'All') {
      temp = temp.filter(payment => payment.method === methodFilter)
    }

    setFilteredPayments(temp)
  }

  const statusBadge = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-600'
      case 'Pending': return 'bg-yellow-100 text-yellow-600'
      case 'Failed': return 'bg-red-100 text-red-600'
      case 'Refunded': return 'bg-blue-100 text-blue-600'
      default: return ''
    }
  }

  return (
    <section className="flex flex-col gap-5">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard title="Total Revenue" value="$12,500" color="border-green-300" />
        <SummaryCard title="Pending Amount" value="$1,200" color="border-yellow-300" />
        <SummaryCard title="Failed Payments" value="$320" color="border-red-300" />
        <SummaryCard title="Refunds" value="$540" color="border-blue-300" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div className="flex gap-3 items-center">

          <div className="flex items-center border px-2 rounded focus-within:border-blue-400">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer..."
              className="p-2 text-sm focus:outline-none"
            />
            <Search size={18} className="text-gray-500" />
          </div>

          <select
            className="border px-3 py-2 rounded text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
            <option>Refunded</option>
          </select>

          <select
            className="border px-3 py-2 rounded text-sm"
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
          >
            <option>All</option>
            <option>COD</option>
            <option>Stripe</option>
            <option>JazzCash</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto rounded shadow">
        <Table>
          <TableHead className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHeadCell>Transaction ID</TableHeadCell>
              <TableHeadCell>Order ID</TableHeadCell>
              <TableHeadCell>Customer</TableHeadCell>
              <TableHeadCell>Amount</TableHeadCell>
              <TableHeadCell>Method</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody className="divide-y">
            {filteredPayments.length > 0 ? (
              filteredPayments.map((p, index) => (
                <TableRow
                  key={index}
                  className={`transition hover:bg-blue-50 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <TableCell>{p.txnId}</TableCell>
                  <TableCell>{p.orderId}</TableCell>
                  <TableCell>{p.customer.name}</TableCell>
                  <TableCell>${p.amount}</TableCell>
                  <TableCell>{p.method}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusBadge(p.status)}`}>
                      {p.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <EyeIcon
                      title="View Payment"
                      className="p-2 w-9 h-9 rounded hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setCurrentPayment(p)
                        setViewModal(true)
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                  😔 No payments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Payment Modal */}
      {viewModal && currentPayment && (
        <Modal show={viewModal} size="md" onClose={() => setViewModal(false)}>
          <ModalBody className="space-y-3">
            <h2 className="font-bold text-lg">Payment Details</h2>
            <p><strong>Transaction ID:</strong> {currentPayment.txnId}</p>
            <p><strong>Order ID:</strong> {currentPayment.orderId}</p>
            <p><strong>Customer:</strong> {currentPayment.customer.name}</p>
            <p><strong>Amount:</strong> ${currentPayment.amount}</p>
            <p><strong>Method:</strong> {currentPayment.method}</p>
            <p><strong>Status:</strong> {currentPayment.status}</p>
            <p><strong>Date:</strong> {new Date(currentPayment.date).toLocaleString()}</p>
          </ModalBody>
        </Modal>
      )}

    </section>
  )
}

export default Payments
