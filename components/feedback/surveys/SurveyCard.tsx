"use client"
import { useAlertStore } from '@/stores/alertStore'
import { apiFetch } from '@/utils/apiFetch'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { RiDeleteBinLine, RiEditLine, RiSurveyLine } from 'react-icons/ri'

const SurveyCard: React.FC<{ survey: any }> = ({ survey }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const { setMessage, clearMessage } = useAlertStore((state) => state);
    const router = useRouter();

    const handleConfirm = () => {
        const deleteSurvey = async () => {
            const response = await apiFetch(`http://localhost:5000/api/surveys/${survey._id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMessage('Survey deleted successfully.');
                router.refresh();
                setTimeout(() => {
                    clearMessage();
                }, 3000);
            } else {
                console.log('Failed to delete survey.');
            }
        };

        deleteSurvey();
    };

    return (
        <div className='border p4 flex flex-col gap-4 justify-between rounded-x2l border-stroke relative'>
            <div className='flex items-center gap-2'>
                <div className='bg-primary p-2 rounded-gl w-max text-white'>
                    <RiSurveyLine />
                </div>
                <div className='font-semibold'>{survey.title}</div>
            </div>
            <p className='base text-black/80 line-clamp-3'>
                {survey.description}
            </p>
            <div className='flex gap-2 justify-end text-white'>
                <Link href="" className='flex items-center gap-2 base bg-primary p-2 rounded-gl'>
                    <RiEditLine />
                    <span>Edit</span>
                </Link>
                <div
                    className='flex relative items-center gap-2 base cursor-pointer bg-red-800 p-2 rounded-gl'
                    onClick={() => setShowConfirm(!showConfirm)}
                >
                    <RiDeleteBinLine />
                    <span>Delete</span>
                    {showConfirm && (
                        <div className="absolute cursor-default right-0 top-full mt-1 bg-white items-center border border-stroke rounded shadow-lg p3 z-10 w-max flex gap-2">
                            <span className="text-black sm w-30">Are you sure you want to delete?</span>
                            <div className='flex items-center gap-2 justify-end'>
                                <button
                                    className="flex items-center gap-2 p-2 base cursor-pointer rounded-gl bg-red-800"
                                    onClick={handleConfirm}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="flex items-center gap-2 p-2 base cursor-pointer text-black rounded-gl bg-gray-200 hover:bg-gray-300"
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