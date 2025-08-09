import React from 'react'
import { FcSurvey } from 'react-icons/fc'
import { RiSurveyLine } from 'react-icons/ri'
import { SiReacthookform } from 'react-icons/si'
import { VscFeedback } from 'react-icons/vsc';


const overviewCards = [
    {
        value: "0100",
        title: "Surveys",
        subtitle: "All surveys",
        icon: RiSurveyLine,
    },
    {
        value: "0245",
        title: "Feedback",
        subtitle: "All feedbacks",
        icon: VscFeedback,
    },
    {
        value: "0032",
        title: "Responses",
        subtitle: "All responses",
        icon: RiSurveyLine,
    },
    {
        value: "0005",
        title: "Reviews",
        subtitle: "All reviews",
        icon: RiSurveyLine,
    },
];

const OverviewGrid = () => {
    return (
        <div className='grid gap-3 max-lg:gap-2.5 max-md:gap-2 grid-cols-4 max-lg:grid-cols-2 mt-8'>
            {overviewCards.map((card, idx) => (
                <div key={idx} className='p-3 max-lg:p-2.5 max-md:p-2 max-sm:p-1.5 h-max rounded-x2l border border-stroke flex justify-between'>
                    <div className='bg-primary rounded-gl flex items-center justify-center px-6 max-lg:px-4 max-md:px-2.5 base text-white font-semibold'>{(card.value).toString().padStart(4, '0')}</div>
                    <div className='lg:gap-4 flex flex-col items-end'>
                        <div className='flex flex-col items-end'>
                            <span className='font-semibold base'>{card.title}</span>
                            <span className='text-black/50 sm'>{card.subtitle}</span>
                        </div>
                        <div className='text-black p-2 bg-secondary rounded-md'>
                            <card.icon className='w-4 max-lg:w-3.5 max-md:w-3 h-auto' />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OverviewGrid