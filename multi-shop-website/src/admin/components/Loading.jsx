import React from 'react'

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
    )
}

export default Loading