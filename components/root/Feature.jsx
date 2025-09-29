import React from 'react'

const Feature = ({ feature, index }) => {
    return (
        <div className={`flex flex-col items-center w-full`} key={feature.name}>
            <div className='bg-primary/7  w-full flex items-center justify-center min-h-80 border border-primary/20 gap-5 rounded-2xl'>
                <feature.icon className='text-primary w-8 h-8' />
            </div>
            <div className='p-5 flex flex-col items-center text-center'>
                <span className='font-bold xl'>{feature.name}</span>
                <div className='flex gap-2 items-start'>
                    <p className='text-black/70 font-light base inter mt-1 flex gap-2'>{feature.points[0]}.</p>
                </div>
            </div>
        </div>
    )
}

export default Feature