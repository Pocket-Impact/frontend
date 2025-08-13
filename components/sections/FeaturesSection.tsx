import React from 'react'
import { features, tools } from '@/lib/tools'
import Feature from '@/components/root/Feature';

const FeaturesSection = () => {
    return (
        <div id='features' className='h-screen scroll-mt-32 mt-16 max-lg:h-max max-md:pt-16 px-24 max-lg:p-8 max-md:p-6 max-sm:p-4 flex flex-col items-center text-black'>
            <div className='text-center'>
                <h1 className='font-bold bricolage x5l mb-4'>Everything You Need in <br /> One Pocket</h1>
                <p className='text-black/70 inter base'>These are the tools we are going to that we have i.e I need better content.</p>
            </div>
            <div className='grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4 mt-16 w-full max-w-5xl'>
                {features.map((feature, index) => (
                    <Feature key={feature.name} feature={feature} index={index} />
                ))}
            </div>
        </div>
    )
}

export default FeaturesSection