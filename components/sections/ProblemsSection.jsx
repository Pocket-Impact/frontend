import { problems } from '@/lib/problems'

const ProblemsSection = () => {
    return (
        <section className='py-32 max-lg:py-28 max-md:py-24 max-sm:py-20 max-w-6xl m-auto max-lg:px-20 max-md:px-12 max-sm:px-4 flex flex-col items-center max-lg:items-center inter' aria-labelledby="problems-heading">
            <div className='flex flex-col items-center max-lg:text-center max-lg:items-center gap-3 mb-10'>
                <h4 className='p-2 px-4 rounded-2xl bg-white border-stroke text-black/70 sm border w-max uppercase'>Problems</h4>
                <h2 id="problems-heading" className='bricolage x3l font-bold'>Why Pocket Impact ?</h2>
                <p className='text-black/80 w-full max-w-xl text-center'>Running a mission-driven organization is tough — too much admin, not enough time for impact.</p>
            </div>
            <div className='grid w-full grid-cols-2 gap-6 lg:col-span-4 max-sm:grid-cols-1 max-lg:mt-5'>
                {problems.map((problem, index) => (
                    <div key={index} className={`${index == 2 ? 'md:col-span-2' : ''} bg-primary/7 rounded-x3l p-8 max-lg:p-6 max-md:p-4 flex flex-col gap-8`}>
                        <div className='flex items-center gap-4'>
                            <problem.icon className="w-8 h-auto max-lg:w-7 max-md:w-6 max-sm:w-5" />
                        </div>
                        <div>
                            <h3 className='font-semibold lg'>{problem.title}</h3>
                            <p className='text-black/70 base'>{problem.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProblemsSection

import PropTypes from 'prop-types';
ProblemsSection.propTypes = {};