import React from 'react'
import SecondaryButton from '@/components/ui/SecondaryButton'

const CTASection = () => {
    return (
        <div className='p-20 max-lg:p-16 max-md:p-12 max-sm:p-8 flex flex-col items-center rounded-2xl'>
            <div className='flex flex-col items-center text-primary bricolage'>
                <h1 className='x7l font-bold text-center'>Ready to Do More Good, Faster ?</h1>
                <p className='mt-4 text-black/70 text-center base'>Join hundreds of nonprofits already using Pocket Impact to do more good, faster.</p>
            </div>
            <SecondaryButton
                text="Start Free Trial"
                styles="text-sm w-max rounded-xl py-3 px-6 mt-8"
            />
        </div>
    )
}

export default CTASection