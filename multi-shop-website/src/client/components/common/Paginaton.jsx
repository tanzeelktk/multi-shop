import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({ products, setCurrentPage, currentPage, itemsPerPage }) => {
  const totalPages = Math.ceil(products / itemsPerPage)

  if (totalPages === 0) return null

  return (
    <div className="flex gap-2 justify-center items-center mt-4 flex-wrap">

      {/* Previous Button */}
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`flex items-center px-3 py-1 rounded-md border border-gray-300 
          ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} transition`}
      >
        <ChevronLeft size={16} /> Prev
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`px-3 py-1 rounded-md border transition
            ${currentPage === index + 1 
              ? 'bg-blue-600 text-white border-blue-600 shadow' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'} `}
        >
          {index + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`flex items-center px-3 py-1 rounded-md border border-gray-300 
          ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} transition`}
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  )
}

export default Pagination
