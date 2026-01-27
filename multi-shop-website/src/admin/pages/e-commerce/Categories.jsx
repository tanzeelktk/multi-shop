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
import { Edit, Trash, Search, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Categories = () => {

  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState("")

  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const res = await fetch('/jsondata/categories.json')
      if (!res.ok) throw new Error('Failed to fetch categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.log("Error fetching categories:", error)
    }
  }

  const filteredCategories = categories.filter(cat =>
    cat.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className="flex flex-col gap-5">

      {/* Header */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <h1 className="font-bold text-lg">Categories</h1>

        <div className="flex gap-3">

          {/* Search */}
          <div className="flex items-center border px-2 rounded focus-within:border-blue-400">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search category..."
              className="p-2 text-sm focus:outline-none"
            />
            <Search size={18} className="text-gray-500" />
          </div>

          {/* Add Button */}
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
            <Plus size={16} /> Add Category
          </button>

        </div>
      </div>

      {/* Delete Modal */}
      {confirmDelete && (
        <Modal show={confirmDelete} size="sm" onClose={() => setConfirmDelete(false)}>
          <ModalBody className="text-center space-y-4">
            <p className="font-semibold">Delete this category?</p>
            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setCategories(prev =>
                    prev.filter(c => c.id !== deleteId)
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

      {/* Table */}
      <div className="overflow-x-auto rounded shadow">

        <Table>

          <TableHead className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody className="divide-y">

            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <TableRow
                  key={index}
                  className={`transition hover:bg-blue-50
                  ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >

                  <TableCell>{category.id}</TableCell>
                  <TableCell className="font-medium">
                    {category.title}
                  </TableCell>

                  <TableCell className="flex gap-2">

                    <Edit
                      title="Edit"
                      className="p-2 w-9 h-9 rounded hover:bg-gray-200 cursor-pointer"
                    />

                    <Trash
                      title="Delete"
                      className="p-2 w-9 h-9 rounded hover:bg-red-100 text-red-500 cursor-pointer"
                      onClick={() => {
                        setConfirmDelete(true)
                        setDeleteId(category.id)
                      }}
                    />

                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-10 text-gray-500"
                >
                  😔 No categories found
                </TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>

      </div>
    </section>
  )
}

export default Categories
