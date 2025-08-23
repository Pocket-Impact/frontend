"use client"
import { useAlertStore } from '@/stores/alertStore'
import { apiFetch } from '@/utils/apiFetch'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { RiDeleteBinLine, RiEditLine, RiSurveyLine } from 'react-icons/ri'
import { VscFeedback } from 'react-icons/vsc'
import SendSurvey from './SendSurvey'

const SurveyCard: React.FC<{ survey: any }> = ({ survey }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const { setMessage, clearMessage } = useAlertStore((state) => state);
    const router = useRouter();
    const [sendSurvey, setSendSurvey] = useState(false);

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
        <>
            <div className='flex flex-col bg-white border border-stroke p-4 rounded-lg justify-between relative'>
                <div className='flex items-center justify-between gap-2 pb-4'>
                    <div className='flex gap-2 items-center'>
                        <div className='bg-primary p-2 rounded-sm w-max text-white'>
                            <RiSurveyLine className='w-4 h-auto max-lg:w-3.5 max-md:w-3 max-sm:w-2.5' />
                        </div>
                        <div className='font-semibold base'>{survey.title}</div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div
                            className='flex text-white relative items-center gap-2 base cursor-pointer bg-orange-700 hover:bg-orange-800 transition duration-300 p-2 rounded-sm'
                            onClick={() => setShowConfirm(!showConfirm)}
                        >
                            <RiDeleteBinLine className='w-4 h-auto max-lg:w-3.5 max-md:w-3 max-sm:w-2.5' />
                            {showConfirm && (
                                <div className="absolute cursor-default right-0 top-full mt-1 bg-white items-center border border-stroke rounded shadow-lg p3 z-10 w-max flex gap-2">
                                    <span className="text-black sm w-30">Are you sure you want to delete?</span>
                                    <div className='flex items-center gap-2 justify-end'>
                                        <button
                                            className="flex items-center gap-2 p-2 sm cursor-pointer rounded-gl bg-orange-700"
                                            onClick={handleConfirm}
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            className="flex items-center gap-2 p-2 sm transition duration-300 cursor-pointer text-black rounded-gl bg-gray-200 hover:bg-gray-300"
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
                <Link className='h-full' href={`/feedback/surveys/${survey.uniqueLinkId}`} prefetch>
                    <div className='h-full flex flex-col justify-between gap-4'>
                        <p className='base text-black/80 line-clamp-3'>
                            {survey.description}
                        </p>
                        <div className='flex gap-2 justify-end sm font-semibold text-black/60'>
                            Click to manage survey
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default SurveyCard