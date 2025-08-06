import React from 'react'
import SecondaryButton from '../ui/SecondaryButton'

const HeroSection = () => {
    return (
        <div className='h-screen max-lg:h-max max-md:pt-16 max-lg:pt-32 mt-[65px] relative bg-cblack overflow-hidden rounded-2xl'>
            <div className="absolute inset-0">
                <div className="absolute inset-0 z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,transparent_40%,#386641_100%)]"></div>
            </div>
            <div className="relative z-10 flex h-full flex-col items-center justify-end px-4">
                <div className="max-w-3xl fade-down text-center">
                    <h1 className="x5l font-bold flex text-white bricolage flex-col mb-4">
                        <span>One Platform. Infinite <span className='text-secondary underline decoration-wavy'>Good.</span></span>
                        <span>All-in-One Tools for the World’s Changemakers.</span>
                    </h1>
                    <p className="base inter mb-8 max-md:mb-6 text-white/80">
                        Crafted for mission-first teams — perfect for dashboards, reports, and real-world results.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <SecondaryButton text="Get Started" styles="rounded-xl effect font-semibold py-4 max-md:py-2 px-8 max-md:px-4" />
                    </div>
                </div>
                <div className='w-full max-w-7xl fade-up mt-8 px-3 pt-3 border-x border-t bg-white/20 backdrop-blur-2xl border-white h-64 rounded-t-3xl'>
                    <div className='w-full h-full bg-white/30 rounded-t-2xl'></div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection