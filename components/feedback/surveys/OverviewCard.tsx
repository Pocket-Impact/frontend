<<<<<<< HEAD
import Link from 'next/link';
import React from 'react'
=======
import React, { useState } from 'react'
>>>>>>> 7b86845a8b1cf13899b4bd13c272958ddb02b008

const OverviewCard: React.FC<{ card: any, index: number, user?: boolean }> = ({ card, user }) => {
    // const [showTooltip, setShowTooltip] = useState(false);

    return (
<<<<<<< HEAD
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
                    <Link href={`${card.link ? card.link : ''}`} className='flex items-center sm text-primary gap-2' prefetch>
                        {card.secondaryIcon}
                        {card.desc}
                    </Link>
                </div>
            </div>
=======
        <div className='bg-white p4 flex flex-col justify-between gap-2 rounded-xl'>
            <div className='flex items-center justify-between gap-2'>
                <span className='font-medium sm'>{card.title}</span>
                <div className='rounded-full h-max bg-[#f8f4f9] text-[#9457ca] p-2'>
                    <card.icon className='w-4 max-lg:w-3.5  max-md:w-3 h-auto' />
                </div>
            </div>
            <div className={`flex flex-col gap-1`}>
                <span className={`text-black font-medium lg`}>
                    {(card.value || "0").toString().padStart(2, '0')}{card.percent && "%"} {card.title.split(" ")[1].toLowerCase()}
                </span>
                <span>
                    {card.increase ? (
                        <span className={`xs ${card.increase >= 0 ? 'text-green-600' : 'text-red-600'} font-medium flex items-center gap-1`}>
                            {card.increase >= 0 ? '+' : ''}{card.increase}% <span className='text-[#bbbec1]'>from last month</span>
                        </span>
                    ) : (
                        <span className='text-sm text-black/60 font-medium'>No change</span>
                    )}
                </span>
            </div>
>>>>>>> 7b86845a8b1cf13899b4bd13c272958ddb02b008
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