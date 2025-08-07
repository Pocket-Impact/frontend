import { SignupFormErrors } from '@/lib/errors';
import React, { useState } from 'react'

const SectionOne: React.FC<{ step: number, setStep: Function, errors: SignupFormErrors, setErrors: Function, setFormData: Function, formData: any }> = ({ step, setStep, formData, setFormData, errors, setErrors }) => {
  return (
    <section className={`${step === 1 ? 'flex' : 'hidden'} flex-col gap-4`}>
      <div className='flex flex-col gap-2 my-4'>
        <h1 className='bricolage x2l font-bold'>Personal details</h1>
        <p className='base font-light text-black/70'>Tell us a bit about yourself to get started with your pocket impact account.</p>
      </div>
      <div className='grid max-lg:grid-cols-1 grid-cols-2 gap-4'>
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
          <input className={`input ${errors.phoneNumber ? "outline-error focus:outline-error" : "outline-white focus:outline-primary/20"}`} onChange={(e) => { setErrors({ ...errors, phoneNumber: "" }); setFormData({ ...formData, phoneNumber: e.target.value }) }} type="phonenumber" id="phonenumber" name="phonenumber" placeholder='e.g +2507xxxxxxxx' />
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
  )
}

export default SectionOne