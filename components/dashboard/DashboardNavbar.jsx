import React from 'react'
import { FiSearch } from 'react-icons/fi'
import ProfileTab from './ProfileTab'

const DashboardNavbar = () => {
    return (
        <header className="bg-white flex items-center justify-between p4 inter h-16 min-h-16 border-b border-stroke w-full" aria-label="Dashboard navigation bar">
            <form action="" className="border max-md:w-full md:max-w-[280px] flex items-center rounded-lg gap-1 border-stroke pl-2" aria-label="Search form">
                <FiSearch />
                <input
                    type="text"
                    className="pl-1 outline-0 py-1.5"
                    placeholder="Search tool"
                    aria-label="Search input"
                />
            </form>
            <ProfileTab />
        </header>
    )
}

export default DashboardNavbar