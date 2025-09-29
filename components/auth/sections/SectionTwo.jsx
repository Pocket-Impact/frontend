"use client"

import PropTypes from 'prop-types';
import { RxCaretDown } from 'react-icons/rx';
import { sizes } from '@/lib/sizes'
import { useState } from 'react';

const SectionTwo = ({ countries, step, formData, setFormData, errors, setErrors }) => {
    const [open, setOpen] = useState(false)

    return (
        <section className={`${step === 2 ? 'flex' : 'hidden'} op flex-col gap-4`}>
            <div className='flex flex-col gap-2 my-4'>
                <h1 className='bricolage x2l font-bold'>Organisation details</h1>
                <p className='base font-light text-black/70'>Tell us a bit about your organisation to set up your new Pocket Impact account.</p>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex items-end justify-between w-full'>
                    <label htmlFor="organisationName" className='base w-max min-w-28'>Name</label>
                    <span className='text-orange-400 sm'>{errors.organisationName}</span>
                </div>
                <input className={`input ${errors.organisationName ? "outline-error focus:outline-error" : "outline-white focus:outline-primary/20"}`} onChange={(e) => { setErrors({ ...errors, organisationName: "" }); setFormData({ ...formData, organisationName: e.target.value }) }} type="text" id="organisationName" name="organisationName" placeholder='e.g. Org XYZ' />
            </div>
            <div className='flex relative flex-col gap-2'>
                <div className='flex items-end justify-between w-full'>
                    <label htmlFor="organisationCountry" className='base w-max min-w-28'>Country</label>
                    <span className='text-orange-400 sm'>{errors.organisationCountry}</span>
                </div>
                <div className={`input flex items-center justify-between ${errors.organisationCountry ? "outline-error focus:outline-error" : "outline-white focus:outline-primary/20"}`} onClick={() => setOpen(!open)}>
                    <span className={`${formData.organisationCountry ? "text-black" : "text-black/60"}`}>{formData.organisationCountry || 'Select country'}</span>
                    <div className='rounded-sm hover:bg-gray-200 cursor-pointer' onClick={(e) => { e.stopPropagation(); setOpen(!open) }}>
                        <RxCaretDown className={`${open ? "rotate-180" : ""} transition-all duration-300 w-6 text-black/80 h-6`} />
                    </div>
                    <div className={`${!open ? "hidden" : ""} absolute top-full mt-2 rounded-lg z-50 border border-gray-300 bg-white overflow-y-scroll clean max-h-52 w-full left-0`}>
                        {countries.map((country) => (
                            <div key={country.code} onClick={() => { setErrors({ ...errors, organisationCountry: "" }); setFormData({ ...formData, organisationCountry: country.code }); setOpen(false); }} className='hover:bg-gray-200 cursor-pointer h-10 flex items-center border-gray-300 border-b'>
                                <div className='h-full justify-center flex px-2 items-center border-gray-300'>
                                    <img src={country.pic} alt={country.name} className='w-6 h-4 rounded-[3px]' />
                                </div>
                                <span className=''>{country.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full gap-2'>
                <div className='flex items-end justify-between w-full'>
                    <label htmlFor="email" className='base w-max min-w-28'>Size</label>
                    <span className='text-orange-400 sm'>{errors.organisationSize}</span>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    {sizes.map((organisationSize) => (
                        <div
                            key={organisationSize.name}
                            onClick={() => { setFormData({ ...formData, organisationSize: organisationSize.name }); setErrors({ ...errors, organisationSize: "" }); }}
                            className={`p-2 pl-3 rounded-lg text-center border-gray-300 border cursor-pointer ${organisationSize.name == formData.organisationSize ? 'bg-primary/20 border-primary' : 'bg-white'}`}
                        >
                            {organisationSize.name}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

SectionTwo.propTypes = {
    countries: PropTypes.array.isRequired,
    step: PropTypes.number.isRequired,
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    setErrors: PropTypes.func.isRequired,
};

export default SectionTwo