import React from 'react'
import { VscFeedback } from 'react-icons/vsc'
import FeedbackDetails from './FeedbackDetails'

const FeedbackCard: React.FC<{ feedback: any }> = ({ feedback }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <div onClick={() => setOpen(!open)} className='bg-white inter cursor-pointer border flex flex-col gap-4 border-stroke p4 rounded-lg'>
            <FeedbackDetails feedback={feedback} open={open} close={() => setOpen(false)} />
            <div className='flex justify-between items-start'>
                <div className='flex gap-2 items-center'>
                    <div className='bg-primary p-2 rounded-sm w-max text-white'>
                        <VscFeedback className='w-4 h-auto max-lg:w-3.5 max-md:w-3 max-sm:w-2.5' />
                    </div>
                    <div className='font-semibold base uppercase'>{feedback.category}</div>
                </div>
                <div
                    className={`
                        ${!feedback.sentiment ? "bg-gray-100" : ""}
                        ${feedback.sentiment && feedback.sentiment.toLowerCase() === 'positive' ? "bg-lime-200/70 text-lime-500" : ""}
                        ${feedback.sentiment && feedback.sentiment.toLowerCase() === 'negative' ? "bg-orange-200/70 text-orange-500" : ""}
                        ${feedback.sentiment && feedback.sentiment.toLowerCase() === 'neutral' ? "bg-yellow-200/70 text-yellow-500" : ""}
                        xs px-1.5 p-1 rounded-sm font-semibold flex items-center gap-1 capitalize
                    `}
                >
                    <span>{feedback.sentiment || 'Not analyzed'}</span>
                </div>
            </div>
            <div className='h-full flex flex-col justify-between gap-4'>
                <p className='base text-black/80 line-clamp-3'>
                    {feedback.message}
                </p>
                <div className='flex gap-2 justify-end sm font-semibold text-black/60'>
                    Click to view details
                </div>
            </div>
        </div>
    )
}

export default FeedbackCard