import React, { useState } from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md';

const OverviewCard: React.FC<{ card: any, index: number, user?: boolean }> = ({ card, user }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className='border bg-white border-stroke p-4 flex justify-between gap-5 rounded-lg'>
            <div className='flex w-full flex-col gap-5'>
                <div className='flex justify-between items-center gap-2'>
                    <span className='font-medium base'>{card.title}</span>
                    <div className='rounded-sm'>
                        <card.icon className='w-4 max-lg:w-3.5  max-md:w-3 h-auto' />
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='text-black x3l'>
                        {(card.value || "0").toString().padStart(2, '0')}
                    </span>
                    <div className='flex items-center gap-2'>
                        {card.secondaryIcon}
                        {card.desc}
                    </div>
                </div>
            </div>
            {/* <div
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
            </div> */}
        </div>
    )
}

export default OverviewCard