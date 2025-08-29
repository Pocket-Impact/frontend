import Link from 'next/link';
import React, { useState } from 'react'
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { MdOutlineArrowOutward } from 'react-icons/md';

const OverviewCard: React.FC<{ card: any, index: number, user?: boolean }> = ({ card, user }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className='border bg-white border-stroke p-4 flex justify-between gap-5 rounded-lg'>
            <div className='flex w-full flex-col gap-3'>
                <div className='flex items-center gap-2'>
                    <div className='rounded-sm bg-gray-200 p-1.5'>
                        <card.icon className='w-4 max-lg:w-3.5  max-md:w-3 h-auto' />
                    </div>
                    <span className='font-medium base'>{card.title}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='text-black x3l'>
                        {(card.value || "0").toString().padStart(2, '0')}
                    </span>
                    <div className='flex items-center xs gap-1 bg-light-green text-green w-max p-1 rounded-lg px-2 pr-1'>
                        <span>23.4%</span>
                        <MdOutlineArrowOutward />
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