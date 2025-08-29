import React from 'react'
import { AiOutlineRise } from 'react-icons/ai'
import { GoLightBulb } from 'react-icons/go'

const TopicOverview = ({ topTopics }: { topTopics: any[] }) => {
    return (
        <div className='bg-white border flex flex-col gap-3 border-stroke p4 rounded-lg'>
            <div className='flex flex-col'>
                <h2 className='lg font-semibold'>
                    Trending topics
                </h2>
                <p className='sm -mt-1 text-black/60'>Most mentioned topics in feedback</p>
            </div>
            <div className='flex flex-col gap-2'>
                {topTopics?.map((topic, idx) => (
                    <div key={topic.category || topic.name} className='flex items-center w-full gap-2'>
                        <div className='flex w-full gap-2 flex-col'>
                            <div className='flex w-full items-center justify-between'>
                                <h3 className='xs font-bold capitalize'>{topic.category || topic.name}</h3>
                                <p className='xs text-black/60'>{topic.percentage ?? 0} %</p>
                            </div>
                            <div className={`p-1 w-full rounded-full bg-black/10`}>
                                <div
                                    className={`h-1 my-auto rounded-full bg-primary`}
                                    style={{ width: `${topic.percentage ?? 0}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopicOverview