import FormBuilder from '@/components/surveys/FormBuilder'
import Link from 'next/link'
import React from 'react'
import { RxCaretLeft } from 'react-icons/rx'

const page = () => {
    return (
        <div>
            <Link href="/feedback/surveys" className='flex items-center gap-2 hover:gap-3 transition-all cursor-pointer mb-4 duration-300'>
                <div className='bg-primary/80 hover:bg-primary transition duration-300 text-white rounded-lg w-max p-1'>
                    <RxCaretLeft className='w-6 h-auto' />
                </div>
                <span className='text-black/70 font-medium'>Back to Surveys</span>
            </Link>
            <FormBuilder />
        </div>
    )
}

export default page