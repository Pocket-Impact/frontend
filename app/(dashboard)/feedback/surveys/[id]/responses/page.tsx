import ResponsesGrid from '@/components/feedback/surveys/ResponsesGrid'
import Link from 'next/link'
import React from 'react'
import { RxCaretLeft } from 'react-icons/rx'

const page = () => {
    return (
        <div className='inter'>
            <Link href="/feedback/surveys" className='flex items-center gap-2 hover:gap-3 transition-all cursor-pointer mb-4 duration-300'>
                <div className='bg-primary/80 hover:bg-primary transition duration-300 text-white rounded-lg w-max p-1'>
                    <RxCaretLeft className='w-6 h-auto' />
                </div>
                <span className='text-black/70 font-medium'>Back to Surveys</span>
            </Link>
            <div className=''>
                <h1 className='x2l font-bold'>Survey Name</h1>
                <p className='text-black/60 base'>View all responses from this survey</p>
            </div>
            <h2 className='lg font-bold mt-3'>
                <span>All responses</span>
                <span className='bg-stroke p-1 ml-2 font-normal rounded-md px-2'>0</span>
            </h2>
            <ResponsesGrid />
        </div>
    )
}

export default page