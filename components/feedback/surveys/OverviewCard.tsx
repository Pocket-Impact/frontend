import React from 'react'

const OverviewCard: React.FC<{ card: any }> = ({ card }) => {
    return (
        <div className='p-3 max-lg:p-2.5 max-md:p-2 max-sm:p-1.5 h-max rounded-x2l border border-stroke flex justify-between'>
            <div className='bg-primary rounded-gl flex items-center justify-center px-6 max-lg:px-4 max-md:px-2.5 base text-white font-semibold'>
                {card.value}
            </div>
            <div className='lg:gap-4 flex flex-col items-end'>
                <div className='flex flex-col items-end'>
                    <span className='font-semibold base'>{card.title}</span>
                    <span className='text-black/50 sm'>{card.subtitle}</span>
                </div>
                <div className='text-black p-2 bg-secondary rounded-md'>
                    <card.icon className='w-4 max-lg:w-3.5 max-md:w-3 h-auto' />
                </div>
            </div>
        </div>
    )
}

export default OverviewCard