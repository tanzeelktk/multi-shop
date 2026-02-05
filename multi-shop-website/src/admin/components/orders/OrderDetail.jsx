import { Modal, Table, TableHead, TableBody, TableHeadCell, TableCell, TableRow, ModalBody } from 'flowbite-react'
import { X } from 'lucide-react'
import React, { useState } from 'react'
import Invoice from './Invoice'
import { useAuth } from '../../context/AuthContext'
import Swal from 'sweetalert2'
import axios from 'axios'

const OrderDetail = ({ openModal, setOpenModal, order, setOrder, fetchOrders }) => {

    const [openInvoice, setOpenInvoice] = useState(false)
    const API_URL = import.meta.env.VITE_API_URL
    const { adminToken } = useAuth()


    async function handleStatus(status) {
        console.log(status)
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: `Order will be marked as ${status}`,
            icon: "warning",
            showCancelButton: true
        })

        if (!confirm.isConfirmed) return

        try {
            const res = await axios.put(
                `${API_URL}/api/orders/update-status/${order._id}`,
                { status },
                { headers: { Authorization: `Bearer ${adminToken}` } }
            )

            Swal.fire("Updated!", "Order status updated", "success")
            fetchOrders()
            setOrder(res.data.order)
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.response?.data?.message || "Something went wrong",
                icon: "error"
            })

            console.log(error)
        }

    }

    const statusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-600'
            case 'Pending': return 'bg-yellow-100 text-yellow-600'
            case 'Shipped': return "bg-purple-100 text-purple-600"
            case 'Processing': return 'bg-blue-100 text-blue-600'
            case 'Cancelled': return 'bg-red-100 text-red-600'
            case 'Delivered': return 'bg-indigo-100 text-indigo-600'
            default: return ''
        }
    }

    function onCloseModal() {
        setOpenModal(false)
    }

    return (
        <Modal show={openModal} size="4xl" onClose={onCloseModal}>
            <ModalBody>

                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <div>
                        <h1 className="text-lg font-bold">Order Details</h1>
                        <p className="text-sm text-gray-500">
                            Order ID: #{order?._id}
                        </p>
                    </div>

                    <X
                        className="cursor-pointer text-gray-500 hover:text-red-500"
                        onClick={onCloseModal}
                    />
                </div>

                {/* Status */}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(order?.orderStatus)}`}>
                    {order?.orderStatus}
                </span>

                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-4 mt-5 bg-gray-50 p-4 rounded-lg">
                    <div>
                        <p className="text-xs text-gray-500">Customer Name</p>
                        <p className="font-medium">{order?.user.name}</p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-medium">{order?.user.email}</p>
                    </div>

                    {/* <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="font-medium">{order?.user.phone}</p>
                    </div> */}

                    <div>
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="font-medium">{order?.shippingAddress.address},{order?.shippingAddress.city},{order?.shippingAddress.country}</p>
                    </div>
                </div>

                {
                    openInvoice && (
                        <Modal show={openInvoice} size='md' onClose={() => setOpenInvoice(false)} popup>
                            <ModalBody>
                                <Invoice order={order} />
                            </ModalBody>
                        </Modal>
                    )
                }

                {/* Products - Flowbite Table */}
                <div className="mt-6">
                    <h2 className="font-semibold mb-3">Ordered Items</h2>

                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell>Product</TableHeadCell>
                                    <TableHeadCell className="text-center">Qty</TableHeadCell>
                                    <TableHeadCell className="text-right">Price</TableHeadCell>
                                </TableRow>
                            </TableHead>

                            <TableBody className="divide-y">
                                {order?.products?.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">
                                            {item.name}
                                        </TableCell>

                                        <TableCell className="text-center">
                                            {item.quantity}
                                        </TableCell>

                                        <TableCell className="text-right">
                                            ${item.price}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Summary */}
                <div className="mt-5 flex justify-end">
                    <div className="w-64 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${order?.totalPrice}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>$10</span>
                        </div>

                        <div className="flex justify-between font-bold text-base border-t pt-2">
                            <span>Total</span>
                            <span>${order?.totalPrice}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-6 border-t pt-4">
                    <button className="px-4 py-2 text-sm border rounded-lg" onClick={() => setOpenInvoice(true)}>
                        Print Invoice
                    </button>

                    {
                        ["Pending"].includes(order?.orderStatus) && (
                            <button
                            onClick={()=>handleStatus("Processing")}
                            className={`px-4 py-2 text-sm rounded-lg bg-blue-500 text-white`}>
                                Mark Processing
                            </button>
                        )
                    }
                    {
                        ["Pending", "Processing"].includes(order?.orderStatus) && (
                            <button
                            onClick={()=>handleStatus("Shipped")}
                            className={`px-4 py-2 text-sm rounded-lg bg-purple-500 text-white`}>
                                Mark Shipped
                            </button>
                        )
                    }
                    {
                        order?.orderStatus !== "Completed" && (
                            <button
                            onClick={()=>handleStatus("Delivered")}
                            className={`px-4 py-2 text-sm rounded-lg bg-indigo-500 text-white`}>
                                Mark Delivered
                            </button>
                        )
                    }
                    {
                        ["Pending", "Processing"].includes(order?.orderStatus) && (
                            <button
                            onClick={()=>handleStatus("Cancelled")}
                            className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg">
                                Cancel Order
                            </button>
                        )
                    }
                    {
                        order?.orderStatus === "Delivered" && (
                            <button
                            onClick={()=>handleStatus("Completed")}
                            className={`px-4 py-2 text-sm rounded-lg bg-green-500 text-white`}>
                                Mark Completed
                            </button>
                        )
                    }

                </div>

            </ModalBody>
        </Modal>
    )
}

export default OrderDetail
