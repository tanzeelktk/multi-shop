import { Modal, Table, TableHead, TableBody, TableHeadCell, TableCell, TableRow, ModalBody } from 'flowbite-react'
import { X } from 'lucide-react'
import React, { useState } from 'react'
import Invoice from './Invoice'

const OrderDetail = ({ openModal, setOpenModal, order }) => {

    const [openInvoice, setOpenInvoice] = useState(false)

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
                            Order ID: #{order?.orderId}
                        </p>
                    </div>

                    <X
                        className="cursor-pointer text-gray-500 hover:text-red-500"
                        onClick={onCloseModal}
                    />
                </div>

                {/* Status */}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold
          ${order?.status === "Pending" && "bg-yellow-100 text-yellow-600"}
          ${order?.status === "Completed" && "bg-green-100 text-green-600"}
          ${order?.status === "Cancelled" && "bg-red-100 text-red-600"}
        `}>
                    {order?.status}
                </span>

                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-4 mt-5 bg-gray-50 p-4 rounded-lg">
                    <div>
                        <p className="text-xs text-gray-500">Customer Name</p>
                        <p className="font-medium">{order?.customer.name}</p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-medium">{order?.customer.email}</p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="font-medium">{order?.customer.phone}</p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="font-medium">{order?.customer.address}</p>
                    </div>
                </div>

                {
                    openInvoice && (
                        <Modal show={openInvoice} size='md' onClose={()=>setOpenInvoice(false)} popup>
                            <ModalBody>
                                <Invoice order={order}/>
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
                                {order?.items?.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">
                                            {item.title}
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
                            <span>${order?.subtotal}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>$10</span>
                        </div>

                        <div className="flex justify-between font-bold text-base border-t pt-2">
                            <span>Total</span>
                            <span>${order?.total}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-6 border-t pt-4">
                    <button className="px-4 py-2 text-sm border rounded-lg" onClick={()=>setOpenInvoice(true)}>
                        Print Invoice
                    </button>

                    <button className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg">
                        Cancel Order
                    </button>

                    <button className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg">
                        Mark Completed
                    </button>
                </div>

            </ModalBody>
        </Modal>
    )
}

export default OrderDetail
