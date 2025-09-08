import React from 'react'
import { features, tools } from '@/lib/tools'
import Feature from '@/components/root/Feature';

const FeaturesSection = () => {
    return (
        <div id='features' className='scroll-mt-32 inter mb-16 max-lg:h-max max-md:pt-16 px-24 max-lg:p-8 max-md:p-6 max-sm:p-4 flex flex-col items-center text-black'>
            <div className='flex flex-col text-center items-center'>
                <h4 className='p-2 px-4 rounded-2xl bg-white border-stroke text-black/70 sm border w-max uppercase'>Our Solutions</h4>
                <h1 className='font-bold bricolage x5l mb-4 mt-3'>Everything You Need in <br /> One Pocket</h1>
                <p className='text-black/70 inter base'>Pocket Impact helps you do more good, faster. We've got tools for every step of your journey.</p>
            </div>
            <div className='grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4 mt-16 w-full max-w-6xl'>
                {features.map((feature, index) => (
                    <Feature key={feature.name} feature={feature} index={index} />
                ))}
            </div>
        </div>
    )
}

export default FeaturesSection