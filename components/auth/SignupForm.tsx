'use client'

import React from 'react'
import PrimaryButton from '../ui/PrimaryButton'
import Link from 'next/link'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { Country } from '@/lib/countries'
import FormSidebar from './SignupSide'

import SectionOne from './sections/SectionOne'
import SectionTwo from './sections/SectionTwo'
import useSignup from '@/hooks/auth/useSignup'

const SignupForm: React.FC<{ countries: Country[] }> = ({ countries }) => {
  const { step, setStep, handleBack, handleNext, open, setOpen, size, setSize, errors, formData, setErrors, onSubmit, setFormData } = useSignup();

  return (
    <div className='flex items-center justify-center h-full'>
      <div className='w-full lg:rounded-3xl max-lg:h-full inter overflow-hidden max-w-5xl lg:grid lg:grid-cols-7 max-lg:grid-cols-1 lg:border border-black/20 bg-white justify-center items-center'>
        <FormSidebar step={step} />
        <form onSubmit={(e) => onSubmit(e)} className="inter flex-col w-full lg:col-span-4 p-10 max-lg:p-8 max-md:p-6">
          <h6 className='text-black/50'>Step {step}/2</h6>
          <SectionOne step={step} setStep={setStep} errors={errors} setErrors={setErrors} formData={formData} setFormData={setFormData} />
          <SectionTwo countries={countries} step={step} errors={errors} setErrors={setErrors} formData={formData} setFormData={setFormData} />
          <div className='flex items-center mt-4 w-max gap-2'>
            <PrimaryButton onClick={handleBack} type='button' icon={<MdOutlineKeyboardBackspace className='w-6 h-auto text-primary' />} styles={`w-max z-10 ${step == 1 ? "hidden" : ""} rounded-lg op bg-primary/20 hover:bg-primary/30 p-2.5`} />
            <PrimaryButton onClick={handleNext} type="button" text="Next" styles={`${step != 1 ? "hidden" : ""} text-sm w-max h-full font-medium rounded-lg py-3 px-10`} />
            <PrimaryButton onClick={handleNext} type="submit" text="Signup" styles={`${step == 1 ? "hidden" : ""} text-sm w-max h-full op font-medium rounded-lg py-3 px-10`} />
          </div>
          <div className='mt-2'>
            <span>Already have an account?</span> <Link href="/auth/signin" className='font-bold text-primary hover:underline underline-offset-2'><span>Sign in</span></Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupForm
