"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { RiDeleteBinLine, RiEditLine, RiSurveyLine } from 'react-icons/ri'

const SurveyCard: React.FC<{ survey: any }> = ({ survey }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleConfirm = () => {
        // TODO: Replace with actual delete logic
        setShowConfirm(false);
        alert('Survey deleted!');
    };

    return (
        <div className='border p-4 flex flex-col gap-4 justify-between rounded-x2l border-stroke relative'>
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
                <Link href="" className='flex items-center gap-2 base bg-primary p-2 rounded-lg'>
                    <RiEditLine />
                    <span>Edit</span>
                </Link>
                <div
                    className='flex relative items-center gap-2 base cursor-pointer bg-red-800 p-2 rounded-lg'
                    onClick={() => setShowConfirm(!showConfirm)}
                >
                    <RiDeleteBinLine />
                    <span>Delete</span>
                    {showConfirm && (
                        <div className="absolute right-0 top-full mt-1 bg-white items-center border border-stroke rounded shadow-lg p-3 z-10 w-max flex gap-2">
                            <span className="text-black sm w-30">Are you sure you want to delete?</span>
                            <div className='flex items-center gap-2 justify-end'>
                                <button
                                    className="flex items-center gap-2 p-2 base rounded-lg bg-red-800"
                                    onClick={handleConfirm}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="flex items-center gap-2 p-2 base text-black rounded-lg bg-gray-200 hover:bg-gray-300"
                                    onClick={() => setShowConfirm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SurveyCard