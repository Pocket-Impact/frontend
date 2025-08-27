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
                    <div key={topic.category || topic.name} className='flex items-center gap-2'>
                        <div className='bg-black flex items-center justify-center text-white p-2 w-max rounded-sm'>
                            <GoLightBulb className='' />
                        </div>
                        <div>
                            <h3 className='xs font-bold uppercase'>{topic.category || topic.name}</h3>
                            <p className='xs text-black/60'>{topic.count || topic.feedbacks} feedbacks</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopicOverview