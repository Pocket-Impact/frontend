import React from 'react'
import { VscFeedback } from 'react-icons/vsc'

const FeedbackCard: React.FC<{ feedback: any }> = ({ feedback }) => {
    return (
        <div className='bg-white inter cursor-pointer border flex flex-col gap-4 border-stroke p4 rounded-lg'>
            <div className='flex justify-between items-start'>
                <div className='flex gap-2 items-center'>
                    <div className='bg-primary p-2 rounded-sm w-max text-white'>
                        <VscFeedback className='w-4 h-auto max-lg:w-3.5 max-md:w-3 max-sm:w-2.5' />
                    </div>
                    <div className='font-semibold base'>{feedback.category}</div>
                </div>
                <div className={`bg-lime-200/70 text-lime-500 xs px-1.5 p-1 rounded-sm font-semibold flex items-center gap-1`}>
                    <span>Positive</span>
                </div>
            </div>
            <div className='h-full flex flex-col justify-between gap-4'>
                <p className='base text-black/80 line-clamp-3'>
                    {feedback.content}
                </p>
                <div className='flex gap-2 justify-end sm font-semibold text-black/60'>
                    Click to view details
                </div>
            </div>
        </div>
    )
}

export default FeedbackCard