'use client'

import React, { useState } from 'react'
import PrimaryButton from '../ui/PrimaryButton'
import Link from 'next/link'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import logo from '@/public/img/white.svg'
import Image from 'next/image'
import { FiUser } from 'react-icons/fi'
import { GoOrganization } from 'react-icons/go'
import { RxCaretDown } from 'react-icons/rx'
import { Country, getCountries } from '@/app/lib/countries'
import FormSidebar from './FormSidebar'
import { sizes } from '@/app/lib/sizes'

const SignupForm: React.FC<{ countries: Country[] }> = ({ countries }) => {
  const [step, setStep] = useState(1)
  const handleNext = () => {
    if (step == 1) {
      if (formData.fullName.length == 0) {
        setErrors({ ...errors, fullName: "required" })
      } else if (!formData.fullName.includes(" ")) {
        setErrors({ ...errors, fullName: "Full names required" })
      } else if (formData.phoneNumber.length == 0) {
        setErrors({ ...errors, phoneNumber: "required" })
      } else if (formData.email.length == 0) {
        setErrors({ ...errors, email: "required" })
      } else if (!formData.email.includes("@") && !formData.email.includes(".")) {
        setErrors({ ...errors, email: "Email must include '@' and '.'" })
      } else if (formData.password.length == 0) {
        setErrors({ ...errors, password: "required" })
      } else {
        setStep(2)
      }
    }
  }

  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    organisationName: "",
    organisationCountry: "",
    organisationSize: "",
  })

  const handleBack = () => setStep(1)
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState<string>("")

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    organisationName: "",
    organisationCountry: "",
    organisationSize: "",
  })

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full lg:rounded-3xl max-lg:h-full inter overflow-hidden max-w-5xl lg:grid lg:grid-cols-7 max-lg:grid-cols-1 lg:border border-black/20 bg-white justify-center items-center'>
        <FormSidebar step={step} />
        <form className="inter flex-col w-full lg:col-span-4 p-10 max-lg:p-8 max-md:p-6">
          <h6 className='text-black/50'>Step {step}/2</h6>
          <section className={`${step === 1 ? 'flex' : 'hidden'} flex-col gap-4`}>
            <div className='flex flex-col gap-2 my-4'>
              <h1 className='bricolage x2l font-bold'>Personal details</h1>
              <p className='base font-light text-black/70'>Tell us a bit about yourself to get started with your pocket impact account.</p>
            </div>
            <div className='grid grid-cols-1 gap-4'>
              <div className='flex flex-col gap-2'>
                <div className='flex items-end max-sm:flex-col max-sm:items-start justify-between w-full'>
                  <label htmlFor="fullName" className='base w-max min-w-28'>Full names</label>
                  <span className='text-orange-400 sm'>{errors.fullName}</span>
                </div>
                <input className={`input ${errors.fullName ? "outline-error focus:outline-error" : "outline-white focus:outline-primary/20"}`} onChange={(e) => { setErrors({ ...errors, fullName: "" }); setFormData({ ...formData, fullName: e.target.value }) }} type="text" id="fullName" name="fullName" placeholder='e.g. John Doe' />
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex items-end justify-between w-full'>
                  <label htmlFor="phonenumber" className='base w-max min-w-28'>Phone</label>
                  <span className='text-orange-400 sm'>{errors.phoneNumber}</span>
                </div>
                <input className={`input ${errors.phoneNumber ? "outline-error focus:outline-error" : "outline-white focus:outline-primary/20"}`} onChange={(e) => { setErrors({ ...errors, phoneNumber: "" }); setFormData({ ...formData, phoneNumber: e.target.value }) }} type="phonenumber" id="phonenumber" name="phonenumber" placeholder='07888888' />
              </div>
            </div>
            <div className='flex flex-col w-full gap-2'>
              <div className='flex items-end justify-between w-full'>
                <label htmlFor="email" className='base w-max min-w-28'>Email</label>
                <span className='text-orange-400 sm'>{errors.email}</span>
              </div>
              <input className={`input ${errors.email ? "outline-error focus:outline-error" : "outline-white focus:outline-primary/20"}`} onChange={(e) => { setErrors({ ...errors, email: "" }); setFormData({ ...formData, email: e.target.value }) }} type="email" id="email" name="email" placeholder='e.g. john@example.com' />
            </div>
            <div className='flex flex-col w-full gap-2'>
              <div className='flex items-end justify-between w-full'>
                <label htmlFor="password" className='base w-max min-w-28'>Password</label>
                <span className='text-orange-400 sm'>{errors.password}</span>
              </div>
              <input className={`input ${errors.password ? "outline-error focus:outline-error" : "outline-white focus:outline-primary/20"}`} onChange={(e) => { setErrors({ ...errors, password: "" }); setFormData({ ...formData, password: e.target.value }) }} type="password" id="password" name="password" placeholder='••••••••••' />
            </div>
          </section>
          <section className={`${step === 2 ? 'flex' : 'hidden'} op flex-col gap-4`}>
            <div className='flex flex-col gap-2 my-4'>
              <h1 className='bricolage x2l font-bold'>Organisation details</h1>
              <p className='base font-light text-black/70'>Tell us a bit about your organisation to set up your new Pocket Impact account.</p>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="organisationName" className='base w-max min-w-28'>Name</label>
              <input className='input' onChange={(e) => { setErrors({ ...errors, organisationName: "" }); setFormData({ ...formData, organisationName: e.target.value }) }} type="text" id="organisationName" name="organisationName" placeholder='e.g. Org XYZ' />
            </div>
            <div className='flex relative flex-col gap-2'>
              <label htmlFor="organisationCountry" className='base w-max min-w-28'>Country</label>
              <div className='input text-black/60 p-1 flex items-center justify-between' onClick={() => setOpen(!open)}>
                <span>Select country</span>
                <div className='rounded-sm hover:bg-gray-200 cursor-pointer' onClick={() => setOpen(!open)}>
                  <RxCaretDown className={`${open ? "rotate-180" : ""} transition-all duration-300 w-6 text-black/80 h-6`} />
                </div>
                <div className={`${!open ? "hidden" : ""} absolute top-full mt-2 rounded-lg z-50 border border-gray-300 bg-white overflow-y-scroll clean max-h-52 w-full left-0`}>
                  {countries.map((country) => (
                    <div key={country.code} onClick={() => { setErrors({ ...errors, organisationCountry: "" }); setFormData({ ...formData, organisationCountry: country.name }) }} className='hover:bg-gray-200 cursor-pointer h-10 flex items-center border-gray-300 border-b'>
                      <div className=' h-full justify-center flex px-2 items-center border-gray-300'>
                        <img src={country.pic} alt={country.name} className='w-8 rounded-sm' />
                      </div>
                      <span className=''>{country.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex flex-col w-full gap-2'>
              <label htmlFor="email" className='base w-max min-w-28'>Size</label>
              <div className='grid grid-cols-3 gap-4'>
                {sizes.map((organisationSize) => (
                  <div
                    key={organisationSize.name}
                    onClick={() => setSize(organisationSize.name)}
                    className={`p-2 pl-3 rounded-lg text-center border-gray-300 border cursor-pointer ${size === organisationSize.name ? 'bg-primary/20 border-primary' : 'bg-white'}`}
                  >
                    {organisationSize.name}
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div className='flex items-center mt-4 w-max gap-2'>
            <PrimaryButton onClick={handleBack} icon={<MdOutlineKeyboardBackspace className='w-6 h-auto text-primary' />} styles={`w-max z-10 ${step == 1 ? "hidden" : ""} rounded-lg op bg-primary/20 hover:bg-primary/30 p-2.5`} />
            <PrimaryButton onClick={handleNext} type="button" text="Next" styles="text-sm w-max h-full font-medium rounded-lg py-3 px-10" />
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
