import React from 'react'
import PrimaryButton from '../ui/PrimaryButton'
import SecondaryButton from '../ui/SecondaryButton'

const CTASection = () => {
    return (
        <div className='bg-primary p-24 rounded-2xl'>
            <div className='flex flex-col items-center bricolage'>
                <h1 className='x7l font-bold text-white'>Ready to scale your impact ?</h1>
                <p className='text-white'>Join hundreds of nonprofits already using Pocket Impact to do more good, faster.</p>
            </div>
            <SecondaryButton
                text="Get Started"
                styles="text-sm w-max rounded-lg py-3 px-6 mt-8"
            />
        </div>
    )
}

export default CTASection