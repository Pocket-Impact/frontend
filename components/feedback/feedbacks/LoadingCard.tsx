import React from 'react'
import { VscFeedback } from 'react-icons/vsc'

const LoadingCard = () => {
    return (
        <div className='bg-white inter animate-pulse cursor-pointer border flex flex-col gap-4 border-stroke p4 rounded-lg'>
            <div className='flex justify-between items-start'>
                <div className='flex gap-2 items-center'>
                    <div className='bg-black/10 p-2 rounded-sm w-max text-white'>
                        <VscFeedback className='w-4 opacity-0 h-auto max-lg:w-3.5 max-md:w-3 max-sm:w-2.5' />
                    </div>
                    <div className='w-40 h-6 rounded-sm bg-black/10'></div>
                </div>
                <div className='bg-black/20'></div>
            </div>
            <div className='h-full flex flex-col justify-between gap-1'>
                <p className='base bg-black/10 rounded-sm w-full h-6'></p>
                <p className='base bg-black/10 rounded-sm w-11/12 h-6'></p>
                <div className='bg-black/10 rounded-sm w-8/12 h-5 self-end mt-5 sm'></div>
            </div>
        </div>
    )
}

export default LoadingCard