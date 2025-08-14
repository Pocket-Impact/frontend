import React from 'react'


const impact = [
    {
        value: "80%",
        text: "Less time spent on donor reporting",

    },
    {
        value: "2x",
        text: "Increase in donor retention",
    },
    {
        value: "95% ",
        text: "Faster beneficiary onboarding",
    },
    {
        value: "10+",
        text: "Countries with non profits trust us"
    }
]

const ImpactSection = () => {
    return (
        <div id='impact' className='bg-primary/10 scroll-mt-20 p-16 max-md:p-12 max-sm:p-8 rounded-3xl inter'>
            <h2 className='bricolage x5l w-full max-w-6xl'>
                Drive change faster. Simplify your <span className='bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 bg-clip-text text-transparent font-bold'> nonprofit operations</span> with Pocket Impact.
            </h2>
            <div className='grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-8 max-lg:gap-7 max-md:gap-6 max-sm:gap-5 mt-20 max-lg:mt-16 max-md:mt-12 max-sm:mt-8'>
                {impact.map((item, index) => (
                    <div key={index} className='bg-white/75 p-6 flex flex-col justify-between gap-36 max-sm:gap-20 rounded-xl'>
                        <span className='x5l font-bold'>{item.value}</span>
                        <span className='base text-primary'>{item.text}.</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImpactSection