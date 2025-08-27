"use client"
import React from 'react'
import { RiSurveyLine } from 'react-icons/ri'
import { VscFeedback } from 'react-icons/vsc';
import OverviewCard from './surveys/OverviewCard';
import { CgAdd } from 'react-icons/cg';
import { IoAdd } from 'react-icons/io5';

const OverviewGrid = ({ dashboard }: { dashboard: any }) => {
    const overviewCards = [
        {
            value: dashboard?.totals?.surveys?.toString().padStart(2, '0'),
            title: "Total Surveys",
            subtitle: "All surveys",
            desc: "Create a new survey",
            link: "/feedbacks/surveys",
            secondaryIcon: <IoAdd />,
            icon: RiSurveyLine,
        },
        {
            value: dashboard?.totals?.feedbacks?.toString().padStart(2, '0'),
            title: "Total Feedback",
            subtitle: "All feedbacks",
            desc: "Add survey",
            secondaryIcon: <IoAdd />,
            icon: VscFeedback,
        },
        {
            value: dashboard?.totals?.responses?.toString().padStart(2, '0'),
            title: "Responses",
            subtitle: "All responses",
            desc: "Add survey",
            secondaryIcon: <IoAdd />,
            icon: RiSurveyLine,
        },
    ];
    return (
        <div className='grid gap-6 max-lg:gap-2.5 max-md:gap-2 grid-cols-3 max-lg:grid-cols-1'>
            <OverviewCard card={overviewCards[0]} index={0} />
            <OverviewCard card={overviewCards[1]} index={1} />
            <OverviewCard card={overviewCards[2]} index={2} />
        </div >
    );
}

export default OverviewGrid