import { plans } from '@/lib/plans'
import Pricing from '@/components/root/Pricing'

const PricingSection = () => {
    return (
        <section id='pricing' className='bg-cblack max-lg:pb-10 mt-16 pt-28 px-18 max-lg:px-14 max-md:px-10 h-max flex flex-col items-center justify-end relative rounded-2xl' aria-labelledby="pricing-heading">
            <div className="absolute bottom-0 h-3/4 left-0 right-0 top-0 bg-[linear-gradient(to_right,#FFFFFF15_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF15_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]">
            </div>
            <div className='flex flex-col items-center gap-3'>
                <h3 id="pricing-heading" className='font-bold x5l bricolage text-white'>Plans and Pricing</h3>
                <p className='text-white inter'>Choose what plan that you want to use hehe.</p>
            </div>
            <div className='grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-10 max-lg:gap-8 max-md:gap-6 max-sm:gap-4 mt-16 w-full max-w-5xl'>
                {plans.map((plan, index) => (
                    <Pricing key={index} plan={plan} />
                ))}
            </div>
        </section>
    )
}

export default PricingSection

import PropTypes from 'prop-types';
PricingSection.propTypes = {};