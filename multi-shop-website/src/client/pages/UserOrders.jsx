import React, { useEffect, useState } from "react";
import {
    Package,
    Calendar,
    CreditCard,
    Truck,
    Eye,
    Search,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../../admin/context/AuthContext";

const UserOrders = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState([])
    const { userToken } = useAuth()
    const API_URL = import.meta.env.VITE_API_URL

    const tabs = ["All", "Pending", "Processing", "Shipped", "Delivered", "Completed", "Cancelled"];

    const getStatusColor = (status) => {
        if (status === "Delivered") return "bg-green-100 text-green-700 border-green-200";
        if (status === "Pending") return "bg-yellow-100 text-yellow-700 border-yellow-200";
        if (status === "Shipped") return "bg-blue-100 text-blue-700 border-blue-200";
        if (status === "Cancelled") return "bg-red-100 text-red-700 border-red-200";
        return "bg-gray-100 text-gray-700 border-gray-200";
    };

    useEffect(() => {
        if (activeTab === "All") {
            getAllOrders()
        } else {
            getOrdersByStatus()
        }
    }, [activeTab])

    const getAllOrders = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/orders/user-orders`, { headers: { Authorization: `Bearer ${userToken}` } })
            setOrders(res.data.orders)
        } catch (error) {
            console.log(error)
        }
    }

    const getOrdersByStatus = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/orders/user-orders?status=${activeTab}`, { headers: { Authorization: `Bearer ${userToken}` } })

            setOrders(res.data.orders)
        } catch (error) {
            console.log(error)
        }
    }

    // Filter Orders by Tab
    const filteredOrders = orders.filter((order) => {
        const matchesTab = activeTab === "All" ? true : order.status === activeTab;
        const matchesSearch = order._id.toLowerCase().includes(search.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-10">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="bg-white border shadow-sm rounded-2xl p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <Package className="text-yellow-500" />
                                My Orders
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Track your orders, view details, and manage your purchases.
                            </p>
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-[320px]">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Search by Order ID..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-xl text-sm font-medium transition duration-300 whitespace-nowrap
                  ${activeTab === tab
                                        ? "bg-yellow-500 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders Section */}
                <div className="grid gap-5">
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <div
                                key={index}
                                className="bg-white border shadow-sm rounded-2xl p-6 hover:shadow-md transition duration-300"
                            >
                                {/* Order Top */}
                                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">
                                    {/* Left Side */}
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            Order ID:{" "}
                                            <span className="text-yellow-600">{order.orderId}</span>
                                        </h2>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-gray-600 text-sm">
                                            <p className="flex items-center gap-2">
                                                <Calendar size={16} className="text-gray-500" />
                                                {new Date(order.updatedAt).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <Truck size={16} className="text-gray-500" />
                                                {order.products.length} Items
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <CreditCard size={16} className="text-gray-500" />
                                                {order.payment}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Side */}
                                    <div className="flex flex-col items-start lg:items-end gap-3">
                                        <span
                                            className={`px-4 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                                                order.orderStatus
                                            )}`}
                                        >
                                            {order.orderStatus}
                                        </span>

                                        <p className="text-gray-900 font-bold text-xl">
                                            Rs. {order.totalPrice}
                                        </p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t mt-5 pt-5 flex flex-col sm:flex-row gap-3">
                                    <button className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl flex items-center justify-center gap-2 transition duration-300 font-medium">
                                        <Eye size={18} />
                                        View Details
                                    </button>

                                    <button className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-xl transition duration-300 font-medium">
                                        Track Order
                                    </button>

                                    <button className="w-full sm:w-auto border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-xl transition duration-300 font-medium">
                                        Download Invoice
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white border shadow-sm rounded-2xl p-12 text-center">
                            <h2 className="text-xl font-bold text-gray-700">
                                No Orders Found
                            </h2>
                            <p className="text-gray-500 text-sm mt-2">
                                No orders available in this category.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserOrders;
