"use client"
import React, { useEffect, useState } from 'react'
import { RiSurveyLine } from 'react-icons/ri'
import { VscFeedback } from 'react-icons/vsc';
import OverviewCard from './surveys/OverviewCard';
import { apiFetch } from '@/utils/apiFetch';




const OverviewGrid = () => {
    const [surveys, setSurveys] = useState<any[]>([]);

    const overviewCards = [
        {
            value: surveys ? surveys.length.toString().padStart(4, '0') : "--",
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
    useEffect(() => {
        const fetchSurveys = async () => {
            const surveyRes = await apiFetch('/api/surveys');
            const surveyData = await surveyRes.json();
            setSurveys(surveyData.data.surveys);
        }
        fetchSurveys();
    }, []);
    
    return (
        <div className='grid gap-6 max-lg:gap-2.5 max-md:gap-2 grid-cols-4 max-lg:grid-cols-2 mt-8'>
            {/* Surveys Card */}
            <OverviewCard card={overviewCards[0]} />
            {/* Feedback Card */}
            <OverviewCard card={overviewCards[1]} />
            {/* Responses Card */}
            <OverviewCard card={overviewCards[2]} />
            {/* Reviews Card */}
            <OverviewCard card={overviewCards[3]} />
        </div >
    )
}

export default OverviewGrid