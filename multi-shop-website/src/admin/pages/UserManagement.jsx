import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal, ModalBody, Button } from 'flowbite-react'
import { EyeIcon, Edit, Trash } from 'lucide-react'
import Pagination from '../../client/components/common/Paginaton'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [viewUser, setViewUser] = useState(null)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState(null)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

  // Fetch users (mock API / JSON)
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/jsondata/users.json')
        if (!res.ok) throw new Error('Failed to fetch users')
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchUsers()
  }, [])

  // Apply search & filters
  useEffect(() => {
    let temp = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase())
    )

    if (roleFilter !== 'All') temp = temp.filter(u => u.role === roleFilter)
    if (statusFilter !== 'All') temp = temp.filter(u => u.status === statusFilter)

    setFilteredUsers(temp)
    setCurrentPage(1)
  }, [users, search, roleFilter, statusFilter])

  // Delete user
  const handleDelete = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id))
    setConfirmDelete(false)
  }

  return (
    <section className='flex flex-col gap-5'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-3'>
        <h1 className='text-xl font-bold'>User Management</h1>

        <div className='flex flex-wrap gap-3 items-center'>
          {/* Search */}
          <input
            type='text'
            placeholder='Search users...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='border p-2 rounded focus:outline-none focus:border-blue-500 transition'
          />

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className='border p-2 rounded focus:outline-none focus:border-blue-500 transition'
          >
            <option>All</option>
            <option>Admin</option>
            <option>Editor</option>
            <option>User</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='border p-2 rounded focus:outline-none focus:border-blue-500 transition'
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Banned</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto rounded shadow'>
        <Table>
          <TableHead className='bg-gray-100 sticky top-0 z-10'>
            <TableRow>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Role</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody className='divide-y'>
            {currentItems.length > 0 ? (
              currentItems.map((user, idx) => (
                <TableRow
                  key={user.id}
                  className={`transition hover:bg-blue-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full font-semibold
                      ${user.status === 'Active' ? 'bg-green-100 text-green-600' : ''}
                      ${user.status === 'Inactive' ? 'bg-gray-100 text-gray-600' : ''}
                      ${user.status === 'Banned' ? 'bg-red-100 text-red-600' : ''}`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className='flex gap-2'>
                    <EyeIcon className='p-2 w-9 h-9 rounded hover:bg-gray-200 cursor-pointer'
                      onClick={() => { setViewUser(user); setOpenViewModal(true) }} />
                    <Edit className='p-2 w-9 h-9 rounded hover:bg-gray-200 cursor-pointer' />
                    <Trash className='p-2 w-9 h-9 rounded hover:bg-red-100 text-red-500 cursor-pointer'
                      onClick={() => { setConfirmDelete(true); setDeleteUserId(user.id) }} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className='text-center py-5 text-gray-500'>
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination
        products={filteredUsers.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />

      {/* View User Modal */}
      {openViewModal && viewUser && (
        <Modal show={openViewModal} size='md' onClose={() => setOpenViewModal(false)} popup>
          <ModalBody>
            <h2 className='text-xl font-bold mb-3'>User Details</h2>
            <div className='flex flex-col gap-2'>
              <p><span className='font-semibold'>Name:</span> {viewUser.name}</p>
              <p><span className='font-semibold'>Email:</span> {viewUser.email}</p>
              <p><span className='font-semibold'>Role:</span> {viewUser.role}</p>
              <p><span className='font-semibold'>Status:</span> {viewUser.status}</p>
            </div>
            <div className='flex justify-end mt-4'>
              <Button color='gray' onClick={() => setOpenViewModal(false)}>Close</Button>
            </div>
          </ModalBody>
        </Modal>
      )}

      {/* Delete Confirmation */}
      {confirmDelete && (
        <Modal show={confirmDelete} size="sm" onClose={() => setConfirmDelete(false)} popup>
          <ModalBody className="text-center space-y-4">
            <p className="font-semibold">Delete this user?</p>
            <p className="text-sm text-gray-500">This action cannot be undone.</p>
            <div className="flex justify-center gap-3">
              <Button color="gray" onClick={() => setConfirmDelete(false)}>Cancel</Button>
              <Button color="red" onClick={() => handleDelete(deleteUserId)}>Delete</Button>
            </div>
          </ModalBody>
        </Modal>
      )}
    </section>
  )
}

export default UserManagement
