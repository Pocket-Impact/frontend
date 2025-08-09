import Link from 'next/link'
import React from 'react'
import { RiDeleteBinLine, RiEditLine, RiSurveyLine } from 'react-icons/ri'

const SurveyCard : React.FC<{ survey: any }> = ({ survey }) => {
    return (
        <div className='border p-4 flex flex-col gap-4 justify-between rounded-x2l border-stroke'>
            <div className='flex items-center gap-2'>
                <div className='bg-primary p-2 rounded-lg w-max text-white'>
                    <RiSurveyLine />
                </div>
                <div className='font-semibold'>{survey.title}</div>
            </div>
            <p className='base text-black/80 line-clamp-3'>
                {survey.description}
            </p>
            <div className='flex gap-2 justify-end text-white'>
                <Link href="" className='flex items-center gap-2 bg-primary p-2 rounded-lg'>
                    <RiEditLine />
                    <span>Edit</span>
                </Link>
                <Link href="" className='flex items-center gap-2 bg-red-800 p-2 rounded-lg'>
                    <RiDeleteBinLine />
                    <span>Delete</span>
                </Link>
            </div>
        </div>
    )
}

export default SurveyCard