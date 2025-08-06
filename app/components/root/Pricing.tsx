import React from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import SecondaryButton from '../ui/SecondaryButton'
import { PricingPlan } from '@/app/lib/plans'

const Pricing :React.FC<{ plan: PricingPlan }> = ({ plan }) => {
    return (
        <div key={plan.name} className='text-white bg-cblack inter border max-lg:rounded-2xl border-white/20 rounded-t-2xl'>
            <div className='border-b border-white/20 p-5'>
                <h4 className='inter'>{plan.name} Plan</h4>
                <div className='flex items-end gap-2 my-3'>
                    <span className='x5l font-semibold'>${plan.price}</span>
                    <p className='sm text-white/80 font-light'>per user <br /> per month</p>
                </div>
                <p className='base text-white/80'>This is the {plan.name.toLowerCase()} pricing plan.</p>
                <SecondaryButton text="Choose plan" styles="mt-6 p-2 font-medium text-black rounded-xl text-center w-full" />
            </div>
            <div className='p-5'>
                <div>
                    <h5 className='sm font-semibold'>FEATURES</h5>
                    <p className='text-white/80'>Everything in our basic plan plus...</p>
                </div>
                <div className='mt-4 flex flex-col gap-2'>
                    {plan.features.map((feature, idx) => (
                        <div key={feature} className='flex items-center gap-2'>
                            <div className='bg-background rounded-lg p-1'>
                                <IoMdCheckmark className='text-primary sm' />
                            </div>
                            <span className='base'>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Pricing