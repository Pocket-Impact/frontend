import React from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import { plans } from '@/app/lib/plans'
import PrimaryButton from '../ui/PrimaryButton'
import SecondaryButton from '../ui/SecondaryButton'

const PricingSection = () => {
    return (
        <div id='pricing' className='bg-cblack pt-18 px-18 h-screen flex flex-col items-center justify-end relative rounded-2xl'>
            <div className="absolute bottom-0 h-3/4 left-0 right-0 top-0 bg-[linear-gradient(to_right,#FFFFFF15_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF15_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]">
            </div>
            <div className='flex flex-col items-center gap-3'>
                <h3 className='font-bold x5l bricolage text-white'>Plans and Pricing</h3>
                <p className='text-white inter'>Choose what plan that you want to use hehe.</p>
            </div>
            <div className='grid grid-cols-3 gap-10 mt-16 w-full max-w-5xl'>
                {plans.map((plan, index) => (
                    <div key={plan.name} className='text-white inter border border-white/20 rounded-t-2xl'>
                        <div className='border-b border-white/20 p-5'>
                            <h4 className='inter'>{plan.name} Plan</h4>
                            <div className='flex items-end gap-2 my-3'>
                                <span className='x5l font-semibold'>${plan.price}</span>
                                <p className='sm text-white/80 font-light'>per user <br /> per month</p>
                            </div>
                            <p className='base text-white/80'>This is the basic pricing plan.</p>
                            <SecondaryButton text="Choose plan" styles="mt-6 p-2 font-medium text-black rounded-xl text-center w-full" />
                        </div>
                        <div className='p-5'>
                            <div>
                                <h5 className='sm font-semibold'>FEATURES</h5>
                                <p className='text-white/80'>Everything in our basic plan plus...</p>
                            </div>
                            <div className='mt-4 flex flex-col gap-2'>
                                <div className='flex items-center gap-2'>
                                    <div className='bg-background rounded-lg p-1'>
                                        <IoMdCheckmark className='text-primary' />
                                    </div>
                                    <span>Just the basic feature</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='bg-background rounded-lg p-1'>
                                        <IoMdCheckmark className='text-primary' />
                                    </div>
                                    <span>The best feature</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='bg-background rounded-lg p-1'>
                                        <IoMdCheckmark className='text-primary' />
                                    </div>
                                    <span>The worst feature</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='bg-background rounded-lg p-1'>
                                        <IoMdCheckmark className='text-primary' />
                                    </div>
                                    <span>The worst feature</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PricingSection