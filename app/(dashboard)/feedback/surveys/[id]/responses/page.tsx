"use client"
import { apiFetch } from '@/utils/apiFetch'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import { RxCaretLeft } from 'react-icons/rx'

const Page = () => {
    const { id } = useParams();
    const [open, setOpen] = useState<{ [key: string]: boolean }>({});
    const [responses, setResponses] = useState<Array<{
        _id?: string;
        user?: { fullname?: string };
        createdAt?: string;
        responses?: Array<{
            questionText?: string;
            questionId?: string;
            answer?: string;
            sentiment?: string;
        }>;
    }>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResponses = async () => {
            setLoading(true);
            const res = await apiFetch(`/api/responses/survey/${id}`);
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                setResponses(data.data);
                setLoading(false);
            } else {
                setLoading(false);
                const data = await res.json();
            }
        };
        fetchResponses();
    }, [id]);

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
                <span className='bg-stroke p-1 ml-2 font-normal rounded-md px-2'>{responses.length.toString().padStart(2, "0")}</span>
            </h2>
            <div className='mt-5'>
                {loading &&
                    <div className="flex items-center animate-pulse gap-2 bg-white border border-stroke p3 rounded-x2l text-black/60">
                        <span className='p-2 w-12 h-12 rounded-md bg-black/20'></span>
                        <div className='flex flex-col gap-2'>
                            <span className='p-2 w-20 h-full rounded-md bg-black/20'></span>
                            <span className='p-2 w-48 h-full rounded-md bg-black/20'></span>
                        </div>
                    </div>
                }
                {responses.length == 0 && !loading && (
                    <div className="border bg-white rounded-xl h-[74px] flex items-center justify-center border-stroke p3 text-black/60">
                        No responses yet.
                    </div>
                )}
                {responses.map((response, idx) => (
                    <div
                        key={response._id || idx}
                        className={`border rounded-xl bg-white ${open[response._id ?? ""] ? 'h-max' : 'h-[74px] max-sm:h-[66px] max-md:h-[70px] max-lg:h-[72px]'} transition-all duration-300 overflow-hidden border-stroke p3 mb-4`}
                    >
                        <div className='flex items-center justify-between gap-2'>
                            <div className='flex items-center gap-2'>
                                <span className='p-2 w-12 h-12 rounded-md flex items-center justify-center bg-black text-white'>
                                    {response.user?.fullname ? response.user.fullname[0] : 'A'}
                                </span>
                                <div className='flex flex-col'>
                                    <span className='font-semibold base'>
                                        {response.user?.fullname || 'Anonymous'}
                                    </span>
                                    <span className='text-black/70 base'>
                                        {response.createdAt
                                            ? `Submitted ${formatDistanceToNow(new Date(response.createdAt), { addSuffix: true })}`
                                            : ''}
                                    </span>
                                </div>
                            </div>
                            <div
                                onClick={() =>
                                    setOpen((prev) => ({
                                        ...prev,
                                        [response._id ?? ""]: !prev[response._id ?? ""],
                                    }))
                                }
                                className='hover:bg-stroke/80 transition duration-300 cursor-pointer p3 rounded-md'
                            >
                                {!open[response._id ?? ""] ? (
                                    <IoIosAdd className='w-6 h-6' />
                                ) : (
                                    <IoIosRemove className='w-6 h-6' />
                                )}
                            </div>
                        </div>
                        <div className='mt-4 ml-2'>
                            {response.responses?.map((ans, qidx) => (
                                <div key={qidx} className="mb-2">
                                    <p className='font-semibold base'>
                                        {ans.questionText || ans.questionId}
                                    </p>
                                    <div className='flex gap-2 items-center'>
                                        <p className='text-black/60 base'>
                                            {ans.answer}
                                        </p>
                                        <p className={`text-black/60 base ${ans.sentiment === "positive" ? "text-lime-600" : ans.sentiment === "negative" ? "text-red-500" : "text-yellow-500"}`}>
                                            {ans.sentiment}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page