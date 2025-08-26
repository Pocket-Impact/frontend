import React from 'react'
import { AiOutlineRise } from 'react-icons/ai'
import { GoLightBulb } from 'react-icons/go'

const TopicOverview = () => {

    const topics = [
        { name: 'Product Quality', feedbacks: 50 },
        { name: 'Customer Service', feedbacks: 32 },
        { name: 'Pricing', feedbacks: 21 },
        { name: 'Features', feedbacks: 18 },
        { name: 'Feature', feedbacks: 18 },
        { name: 'Performance', feedbacks: 12 },
    ];

    return (
        <div className='bg-white border flex flex-col gap-3 border-stroke p4 rounded-lg'>
            <div className='flex items-center gap-2'>
                <div className='bg-black/10 p-2 rounded-sm'>
                    <AiOutlineRise className='w-3.5 h-auto' />
                </div>
                <div className='flex flex-col'>
                    <h2 className='sm font-medium'>
                        Trending Topics
                    </h2>
                    <h2 className='xs'>
                        Most mentioned topics in feedback
                    </h2>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                {topics.map((topic, idx) => (
                    <div key={topic.name} className='flex items-center gap-2'>
                        <div className='bg-black flex items-center justify-center text-white p-2 w-max rounded-sm'>
                            <GoLightBulb className='' />
                        </div>
                        <div>
                            <h3 className='xs font-bold'>{topic.name}</h3>
                            <p className='xs text-black/60'>{topic.feedbacks} feedbacks</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopicOverview