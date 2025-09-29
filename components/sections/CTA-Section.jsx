import SecondaryButton from '@/components/ui/SecondaryButton'

const CTASection = () => {
    return (
        <section className='p-20 max-lg:p-16 max-md:p-12 max-sm:p-8 flex flex-col items-center rounded-2xl' aria-labelledby="cta-heading">
            <div className='flex flex-col items-center text-primary bricolage'>
                <h1 id="cta-heading" className='x7l font-bold text-center'>Ready to Do More Good, Faster ?</h1>
                <p className='mt-4 text-black/70 text-center base'>Join hundreds of nonprofits already using Pocket Impact to do more good, faster.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
                <SecondaryButton text="Start Free Trial" styles="rounded-xl effect font-semibold py-4 max-md:py-2 px-8 max-md:px-4" />
                <button className="rounded-xl bg-black/5 text-black cursor-pointer hover:bg-black/10 transition duration-300 inter font-semibold py-4 max-md:py-2 px-8 max-md:px-4" aria-label="Book a demo">
                    Book a Demo
                </button>
            </div>
        </section>
    )
}

export default CTASection

import PropTypes from 'prop-types';
CTASection.propTypes = {};