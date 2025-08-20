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
        <div className='grid gap-6 max-lg:gap-2.5 max-md:gap-2 grid-cols-3 max-lg:grid-cols-2'>
            <OverviewCard card={overviewCards[0]} index={0} />
            <OverviewCard card={overviewCards[1]} index={1} />
            <OverviewCard card={overviewCards[2]} index={2} />
        </div >
    )
}

export default OverviewGrid