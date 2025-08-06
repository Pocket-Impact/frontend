import React from 'react'
import PrimaryButton from '../ui/PrimaryButton'
import SecondaryButton from '../ui/SecondaryButton'

const CTASection = () => {
    return (
        <div className='p-20 max-lg:p-16 max-md:p-12 max-sm:p-8 flex flex-col items-center rounded-2xl'>
            <div className='flex flex-col items-center text-secondary bricolage'>
                <h1 className='x7l font-bold text-center'>Ready to scale your impact ?</h1>
                <p className='mt-4 text-black/70 text-center base'>Join hundreds of nonprofits already using Pocket Impact to do more good, faster.</p>
            </div>
            <PrimaryButton
                text="Get Started"
                styles="text-sm w-max effect rounded-xl py-3 px-6 mt-8"
            />
        </div>
    )
}

export default CTASection