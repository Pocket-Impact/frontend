'use client'

import React, { useState } from 'react'
import PrimaryButton from '../ui/PrimaryButton'
import Link from 'next/link'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { Country } from '@/lib/countries'
import FormSidebar from './FormSidebar'

import { SignupFormErrors } from '@/lib/errors'
import SectionOne from './sections/SectionOne'
import SectionTwo from './sections/SectionTwo'
import { signUp } from '@/utils/signUp'

const SignupForm: React.FC<{ countries: Country[] }> = ({ countries }) => {
  const [step, setStep] = useState(1)
  const handleBack = () => setStep(1)
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState<string>("")

  const handleNext = () => {
    if (step == 1) {
      if (formData.fullName.length == 0) {
        setErrors({ ...errors, fullName: "required" })
      } else if (!formData.fullName.includes(" ")) {
        setErrors({ ...errors, fullName: "Full names required" })
      } else if (formData.phoneNumber.length == 0) {
        setErrors({ ...errors, phoneNumber: "required" })
      } else if ((!/^\+\d{10,15}$/.test(formData.phoneNumber.trim()))) {
        setErrors({ ...errors, phoneNumber: "e.g +1234567890" })
      } else if (formData.email.length == 0) {
        setErrors({ ...errors, email: "required" })
      } else if (!formData.email.includes("@") && !formData.email.includes(".")) {
        setErrors({ ...errors, email: "Email must include '@' and '.'" })
      } else if (formData.password.length == 0) {
        setErrors({ ...errors, password: "required" })
      } else if (formData.password.length < 6) {
        setErrors({ ...errors, password: "Minimum 6 characters" })
      }
      else {
        setStep(2)
      }
    }
  }

  const [errors, setErrors] = useState<SignupFormErrors>({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    organisationName: "",
    organisationCountry: "",
    organisationSize: "",
  })

  const [formData, setFormData] = useState({
    fullName: ("").trim(),
    phoneNumber: ("").trim(),
    email: ("").trim(),
    password: ("").trim(),
    organisationName: ("").trim(),
    organisationCountry: ("").trim(),
    organisationSize: ("").trim(),
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.organisationName.length == 0) {
      setErrors({ ...errors, organisationName: "required" })
    } else if (formData.organisationName.length < 5) {
      setErrors({ ...errors, organisationName: "Should be atleast 5 characters" })
    } else if (!formData.organisationCountry) {
      setErrors({ ...errors, organisationCountry: "required" })
    } else if (!formData.organisationSize) {
      setErrors({ ...errors, organisationSize: "required" })
    } else {
      await signUp(formData)
      // console.log("Sent!", sign)
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
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
            <span>Already have an account?</span> <Link href="/auth/signin" className='font-bold text-primary hover:underline underline-offset-2'><span>Log in</span></Link>
          </div>
        </form>
      </div >
    </div>
  )
}

export default SignupForm
