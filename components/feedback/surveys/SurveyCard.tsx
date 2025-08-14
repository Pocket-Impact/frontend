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
            <SendSurvey open={sendSurvey} close={setSendSurvey} link={survey.uniqueLinkId} />
            <div className='flex flex-col gap-1 justify-between relative'>
                <div className='flex items-center justify-between gap-2 p4 border border-stroke rounded-md rounded-t-2xl'>
                    <div className='flex gap-2 items-center'>
                        <div className='bg-primary p-2 rounded-gl w-max text-white'>
                            <RiSurveyLine className='w-4 h-auto max-lg:w-3.5 max-md:w-3 max-sm:w-2.5' />
                        </div>
                        <div className='font-semibold base'>{survey.title}</div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <button onClick={() => setSendSurvey(true)} className='bg-secondary rounded-gl hover:bg-orange-300 cursor-pointer transition duration-300 p-2'>
                            <FiSend className='w-4 h-auto max-lg:w-3.5 max-md:w-3 max-sm:w-2.5' />
                        </button>
                        <div
                            className='flex text-white relative items-center gap-2 base cursor-pointer bg-orange-700 hover:bg-orange-800 transition duration-300 p-2 rounded-gl'
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
                <Link href={`/feedback/surveys/${survey.uniqueLinkId}`}>
                    <div className='border border-stroke p4 rounded-md flex flex-col gap-4'>
                        <p className='base text-black/80 line-clamp-3'>
                            {survey.description}
                        </p>
                        <div className='flex gap-2 justify-end text-white'>
                        </div>
                    </div>
                </Link>
                <Link href={`/feedback/surveys/${survey._id}/responses`} className='border border-stroke group hover:bg-primary/80 hover:text-white p4 rounded-t-md transition duration-300 cursor-pointer rounded-b-2xl'>
                    <div className='flex items-center gap-2 '>
                        <div className='bg-primary group-hover:bg-white p-2 rounded-gl group-hover:text-primary transition duration-300 w-max text-white'>
                            <VscFeedback className='w-4 h-auto max-lg:w-3.5 max-md:w-3 max-sm:w-2.5' />
                        </div>
                        <div className='font-semibold base'>Responses</div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default SurveyCard