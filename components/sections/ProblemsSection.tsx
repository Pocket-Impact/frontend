import React from 'react'
import { problems } from '@/lib/problems'

const ProblemsSection = () => {
    return (
        <div className='py-32 max-lg:py-28 max-md:py-24 max-sm:py-20 px-28 max-lg:px-20 max-md:px-12 max-sm:px-4 grid grid-cols-7 max-lg:grid-cols-1 items-start max-lg:items-center inter'>
            <div className='flex flex-col max-lg:text-center max-lg:items-center max-lg:gap-5 lg:col-span-3 gap-10'>
                <h4 className='p-2 px-4 rounded-2xl bg-white border-stroke text-black/70 sm border w-max uppercase'>Problems</h4>
                <h2 className='bricolage x3l font-bold'>Why Pocket Impact ?</h2>
                <p className='text-black/80 w-full max-w-[300px]'>Running a mission-driven organization is tough — too much admin, not enough time for impact.</p>
            </div>
            <div className='grid grid-cols-2 gap-3 lg:col-span-4 max-sm:grid-cols-1 max-lg:mt-5'>
                {problems.map((problem, index) => (
                    <div key={index} className={`${index == 2? 'md:col-span-2' : ''} bg-primary/7 rounded-x3l p-8 max-lg:p-6 max-md:p-4 flex flex-col gap-4`}>
                        <div className='flex items-center gap-4'>
                            <problem.icon  className="w-8 h-auto max-lg:w-7 max-md:w-6 max-sm:w-5" />
                        </div>
                        <div>
                            <h3 className='font-semibold lg'>{problem.title}</h3>
                            <p className='text-black/70 base'>{problem.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProblemsSection