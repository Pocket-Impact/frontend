import React from 'react'
import { IoClose } from 'react-icons/io5';
import { VscFeedback } from 'react-icons/vsc'

const FeedbackDetails: React.FC<{ feedback: any, open: boolean, close: Function }> = ({ feedback, open, close }) => {
    return (
        <div className={`fixed bg-black/0 backdrop-blur-sm px-4 op flex items-center justify-center w-full cursor-default h-full top-0 left-0 ${open ? "block" : "hidden"}`}>
            <div className="w-full flex flex-col gap-4 max-w-3xl">
                <div className='bg-white mr-3 w-max rounded-lg self-end hover:bg-orange-300 transition duration-300 border p-1 right-3 cursor-pointer' onClick={() => { close(true); }}>
                    <IoClose className='w-5 h-auto max-lg:w-4' />
                </div>
                <div className='bg-white flex flex-col gap-4 border border-stroke p4 rounded-lg'>
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
                                        xs px-1.5 p-1 rounded-sm font-semibold flex items-center gap-1
                                        `}
                        >
                            <span className='capitalize'>{feedback.sentiment || 'Not analyzed'}</span>
                        </div>
                    </div>
                    <div className='h-full flex flex-col justify-between gap-4'>
                        <p className='base text-black/80'>
                            {feedback.message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedbackDetails