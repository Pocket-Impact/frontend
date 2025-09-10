"use client"
import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import { apiFetch } from '@/utils/apiFetch'
import { useParams } from 'next/navigation'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

import PropTypes from 'prop-types';

const ResponsesGrid = () => {
    const { id } = useParams();
    const [open, setOpen] = useState({});
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResponses = async () => {
            setLoading(true);
            const res = await apiFetch(`http://localhost:5000/api/feedback/${id}`);
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                setResponses(data.data);
            } else {
                const data = await res.json();
                console.log(data.message);
            }
            setLoading(false);
        };
        fetchResponses();
    }, [id]);

    if (loading) return <div className="mt-36 mx-auto bg-primary/70 py-5 rounded-x2l w-max">
        <DotLottieReact
            src="/animations/loading.lottie"
            loop
            autoplay
            className="w-20"
            style={{ height: "auto" }}
        />
    </div>;

    return (
        <div className='mt-5'>
            {!responses && (
                <div className="border rounded-xl h-[74px] flex items-center justify-center border-stroke p3 text-black/60">
                    No responses yet.
                </div>
            )}
            {responses.map((response, idx) => (
                <div
                    key={response._id || idx}
                    className={`border rounded-xl ${open[response._id] ? 'h-max' : 'h-[74px] max-sm:h-[66px] max-md:h-[70px] max-lg:h-[72px]'} transition-all duration-300 overflow-hidden border-stroke p3 mb-4`}
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
                                    [response._id]: !prev[response._id],
                                }))
                            }
                            className='hover:bg-stroke/80 transition duration-300 cursor-pointer p3 rounded-md'
                        >
                            {!open[response._id] ? (
                                <IoIosAdd className='w-6 h-6' />
                            ) : (
                                <IoIosRemove className='w-6 h-6' />
                            )}
                        </div>
                    </div>
                    <div className='mt-4 ml-2'>
                        {response.feedbacks?.map((fb, qidx) => (
                            <div key={qidx} className="mb-2">
                                <p className='font-semibold base'>
                                    {fb.questionText || fb.questionId}
                                </p>
                                <p className='text-black/60 base'>
                                    {fb.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

ResponsesGrid.propTypes = {};

export default ResponsesGrid