"use client"
import React from 'react'
import { RiSurveyLine } from 'react-icons/ri'
import { VscFeedback } from 'react-icons/vsc';
import OverviewCard from './surveys/OverviewCard';
import { CgAdd } from 'react-icons/cg';
import { IoAdd } from 'react-icons/io5';
import { HiOutlineEye } from 'react-icons/hi';

const OverviewGrid = ({ dashboard }: { dashboard: any }) => {
    const overviewCards = [
        {
            value: dashboard?.totals?.surveys?.toString().padStart(2, '0'),
            increase: 40,
            title: "Total Surveys",
            subtitle: "All surveys",
            desc: "Create a new survey",
            link: "/feedback/surveys/new",
            secondaryIcon: <IoAdd />,
            icon: RiSurveyLine,
        },
        {
            value: dashboard?.totals?.feedbacks?.toString().padStart(2, '0'),
            increase: 50,
            title: "Total Feedback",
            subtitle: "All feedbacks",
            link: "/feedback/feedbacks",
            desc: "View feedbacks",
            secondaryIcon: <HiOutlineEye />,
            icon: VscFeedback,
        },
        {
            value: dashboard?.totals?.responses?.toString().padStart(2, '0'),
            increase: 23.8,
            title: "Responses",
            subtitle: "All responses",
            desc: "View surveys",
            link: "/feedback/surveys",
            secondaryIcon: <HiOutlineEye />,
            icon: RiSurveyLine,
        },
    ];
    return (
        <div className='grid gap-6 max-lg:gap-5 max-md:gap-4 grid-cols-2 grid-rows-2 max-lg:grid-cols-1'>
            <OverviewCard card={overviewCards[0]} index={0} />
            <OverviewCard card={overviewCards[1]} index={1} />
            <OverviewCard card={overviewCards[2]} index={2} />
        </div>
    );
}

export default OverviewGrid