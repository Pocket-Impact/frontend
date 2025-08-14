import type { Feature } from '@/lib/tools';
import React from 'react'

const Feature: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
    return (
        <div className={`bg-primary/7 ${index == 0 || index == 3 ? "lg:col-span-2" : ""} border border-primary/20 gap-5 rounded-2xl flex flex-col justify-between overflow-hidden backdrop-blur-sm inter`} key={feature.name}>
            <div className='flex items-center gap-2 mb-2 bg-primary/30 border-r border-b border-primary/10 w-max p-4 rounded-br-2xl'>
                <feature.icon className='text-primary w-8 h-8' />
            </div>
            <div className='p-5'>
                <span className='font-bold xl'>{feature.name}</span>
                <div className='flex gap-2 items-start'>
                    <p className='text-black/70 font-light base inter mt-1 flex gap-2'>{feature.points.join(", ")}.</p>
                </div>
            </div>
        </div>
    )
}

export default Feature