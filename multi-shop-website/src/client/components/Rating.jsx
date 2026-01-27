import { Star } from 'lucide-react'
import React from 'react'

const Rating = ({ rating }) => {

    return (
        <div className='flex gap-1'>
            {
                [1, 2, 3, 4, 5].map((num, index) => {


                    let filledPercent = 0
                    if (rating >= num) {
                        filledPercent = 100
                    }
                    else if (rating > num - 1) {
                        filledPercent = (rating - (num-1)) * 100
                    }

                    return (
                        <div key={num} className="relative w-5 h-5">

                            {/* EMPTY STAR */}
                            <Star className="text-gray-300 w-5 h-5" />

                            {/* FILLED PART */}
                            <div
                                className="absolute top-0 left-0 overflow-hidden"
                                style={{ width: `${filledPercent}%` }}
                            >
                                <Star className="fill-amber-400 text-amber-400 w-5 h-5" />
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default Rating