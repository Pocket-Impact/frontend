import React from 'react'
import { features, tools } from '@/app/lib/tools'
import { CiCircleCheck } from "react-icons/ci";

const FeaturesSection = () => {
    return (
        <div id='features' className='h-screen scroll-mt-16 mt-16 max-lg:h-max max-md:pt-16 p-10 max-lg:p-8 max-md:p-6 max-sm:p-4 flex flex-col items-center text-black'>
            <div className='text-center'>
                <h1 className='font-bold bricolage x5l mb-4'>Our features and one <br /> more word to put here</h1>
                <p className='text-black/70 inter base'>These are the tools we are going to that we have i.e I need better content.</p>
            </div>
            <div className='grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4   mt-16 w-full max-w-7xl'>
                {features.map((feature, index) => (
                    <div className={`bg-primary/7 ${index == 0 || index == 3 ? "lg:col-span-2" : ""} border border-primary/20 gap-5 rounded-2xl flex flex-col justify-between overflow-hidden backdrop-blur-sm inter`} key={feature.name}>
                        <div className='flex items-center gap-2 mb-2 bg-primary/30 border-r border-b border-primary/10 w-max p-4 rounded-br-2xl'>
                            <feature.icon className='text-primary w-8 h-8' />
                        </div>
                        <div className='p-5'>
                            <span className='font-bold xl'>{feature.name}</span>
                            <div className='flex gap-2 items-start'>
                                <p className='text-black/70 font-light base inter mt-1 flex gap-2'>{feature.points[0]}.</p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default FeaturesSection