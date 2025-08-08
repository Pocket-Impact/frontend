import { useAuthStore } from '@/stores/authStores'
import React from 'react'

const OrgTab = () => {
    const { organisationName, hasHydrated } = useAuthStore((state) => state)
    
    return (
        hasHydrated ? (
            <div className='flex cursor-pointer items-center gap-2.5 max-lg:gap-2 max-md:gap-1.5 w-[300px] max-md:w-max bg-white border border-[#DDDDDD] rounded-x2l max-lg:p-2 max-md:p-1.5 p-2.5'>
                <div className='max-lg:w-10 w-12 h-12 max-md:w-8 uppercase flex items-center justify-center xl font-bold text-white bg-red-400 rounded-gl max-lg:h-10 max-md:h-8'>
                    {organisationName.slice(0, 2)}
                </div>
                <div className='flex flex-col max-md:hidden'>
                    <span className='inter base font-semibold'>{organisationName}</span>
                    <span className='inter sm text-black/70'>Go to your profile</span>
                </div>
            </div>
        ) : (
            <div className='flex cursor-pointer items-center gap-2.5 max-lg:gap-2 max-md:gap-1.5 w-[300px] animate-pulse max-md:w-max bg-white border border-[#DDDDDD] rounded-x2l max-lg:p-2 max-md:p-1.5 p-2.5'>
                <div className='max-lg:w-10 w-12 h-12 max-md:w-8 uppercase flex items-center justify-center xl font-bold text-white bg-black/20 rounded-gl max-lg:h-10 max-md:h-8'>
                    {organisationName.slice(0, 2)}
                </div>
                <div className='flex flex-col gap-1 max-md:hidden'>
                    <span className='inter base font-semibold w-10 bg-black/10 h-4 rounded'></span>
                    <span className='inter sm text-black/70 w-20 bg-black/10 h-4 rounded'></span>
                </div>
            </div>
        )
    )
}

export default OrgTab