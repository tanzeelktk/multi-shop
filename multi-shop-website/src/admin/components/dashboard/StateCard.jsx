import React from 'react'


const StateCard = ({ title, value, subtitle, icon: Icon, gradient }) => {
    return (
        <div className={`flex flex-col gap-5 p-5 rounded-xl ${gradient} text-white shadow-md  hover:scale-105 transition-all duration-300 `}>
            <div className='flex items-center justify-between'><p className='text-xl font-semibold'>{title}</p><Icon color='white' strokeWidth={2} size={30} /></div>
            <div className='flex flex-col items-start gap-2'>
                <div className='text-3xl font-bold'>{value}</div>
                <div>{subtitle}</div>
            </div>
        </div>
    )
}

export default StateCard