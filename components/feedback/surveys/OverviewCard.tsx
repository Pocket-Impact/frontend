import React, { useState } from 'react'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { MdOutlineArrowOutward } from 'react-icons/md';

const OverviewCard: React.FC<{ card: any, index: number }> = ({ card }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className='border bg-white border-stroke p-4 flex justify-between gap-5 rounded-lg'>
            <div className='flex flex-col gap-5'>
                <div className='flex items-center gap-2'>
                    <div className='bg-black/10 p-2 rounded-sm'>
                        <card.icon className='w-4 max-lg:w-3.5  max-md:w-3 h-auto' />
                    </div>
                    <span className='font-medium base'>{card.title}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='text-black x3l'>
                        {(card.value || "0").toString().padStart(4, '0')}
                    </span>
                    <div className={`bg-lime-200/70 text-lime-500 xs px-1.5 p-1 rounded-md flex items-center gap-1`}>
                        <span>18.5 %</span>
                        <MdOutlineArrowOutward className='text-lime-600' />
                    </div>
                </div>
            </div>
            <div
                className='relative text-black/60 hover:bg-black/10 hover:text-black transition duration-300 cursor-pointer h-max p-1 rounded-lg'
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <IoMdInformationCircleOutline className='w-5 h-max ' />
                {showTooltip && (
                    <div className="absolute right-full mr-2 top-0 bg-black/10 p-1.5 rounded-lg text-black/80 xs inline text-nowrap">
                        Total {card.title.toLowerCase()}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OverviewCard