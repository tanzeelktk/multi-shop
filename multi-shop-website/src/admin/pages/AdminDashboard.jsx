import React from 'react';
import StateCard from '../components/dashboard/StateCard';
import { ClipboardList, DollarSign, Wallet, UserPlus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import Calendar from 'react-calendar';

const AdminDashboard = () => {

  // Sample recent orders
  const recentOrders = [
    { id: 1, name: 'John Doe', product: 'Laptop', amount: '$1000', status: 'Pending', date: '2023-10-15' },
    { id: 2, name: 'Jane Smith', product: 'Smartphone', amount: '$700', status: 'Completed', date: '2023-10-14' },
    { id: 3, name: 'Michael Johnson', product: 'Headphones', amount: '$150', status: 'Shipped', date: '2023-10-13' },
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-600';
      case 'Pending': return 'bg-yellow-100 text-yellow-600';
      case 'Shipped': return 'bg-blue-100 text-blue-600';
      case 'Cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <section className='flex flex-col gap-5'>
      {/* State Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        <StateCard 
          title="Total Sales" 
          value="$25,000" 
          subtitle="Sales in the last month" 
          icon={DollarSign} 
          gradient="bg-gradient-to-r from-green-400 to-blue-500" 
        />
        <StateCard 
          title="Total Orders" 
          value="1,200" 
          subtitle="Orders in the last month" 
          icon={ClipboardList} 
          gradient="bg-gradient-to-r from-purple-400 to-pink-500" 
        />
        <StateCard 
          title="Total Revenue" 
          value="$75,000" 
          subtitle="Revenue in the last month" 
          icon={Wallet} 
          gradient="bg-gradient-to-r from-yellow-400 to-red-500" 
        />
        <StateCard 
          title="New Customers" 
          value="350" 
          subtitle="Customers in the last month" 
          icon={UserPlus} 
          gradient="bg-gradient-to-r from-indigo-400 to-purple-500" 
        />
      </div>

      {/* Charts Placeholder */}
      <div className='bg-white rounded-xl shadow-md p-5'>
        <h2 className='text-xl font-semibold mb-3'>Sales Trend</h2>
        <div className='h-64 flex items-center justify-center text-gray-400'>
          {/* Replace with chart library like Recharts or Chart.js */}
          Chart Placeholder
        </div>
      </div>

      {/* Recent Orders + Calendar */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
        {/* Recent Orders Table */}
        <div className='col-span-2 bg-white p-5 rounded-xl shadow-md text-gray-700 overflow-x-auto'>
          <h1 className='text-xl font-semibold mb-3'>Recent Orders</h1>
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>ID</TableHeadCell>
                <TableHeadCell>Customer</TableHeadCell>
                <TableHeadCell>Product</TableHeadCell>
                <TableHeadCell>Amount</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Date</TableHeadCell>
                <TableHeadCell>Action</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentOrders.map(order => (
                <TableRow key={order.id} className='hover:bg-gray-50 transition'>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <button className="text-blue-500 hover:underline">View Details</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Calendar */}
        <div className='bg-white p-5 rounded-xl shadow-md'>
          <h2 className='text-xl font-semibold mb-3'>Calendar</h2>
          <Calendar />
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
