"use client"
import React, { useState } from 'react'

import Link from 'next/link'
import PrimaryButton from '../ui/PrimaryButton'
import SigninSide from './SigninSide'
import useSignin from '@/hooks/useSignin'

const SigninForm = () => {
    const { errors, formData, setErrors, setFormData, onSubmit } = useSignin();

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='w-full lg:rounded-3xl max-lg:h-full inter overflow-hidden max-w-5xl lg:grid lg:grid-cols-7 max-lg:grid-cols-1 lg:border border-black/20 bg-white justify-center items-center'>
                <SigninSide />
                <form onSubmit={(e) => onSubmit(e)} className="inter flex-col w-full lg:col-span-4 p-10 max-lg:p-8 max-md:p-6">
                    <section className={`flex flex-col gap-4`}>
                        <div className='flex flex-col my-4'>
                            <h1 className='bricolage x2l font-bold'>Sign in</h1>
                            <p className='base font-light text-black/70'>Please provide your credentials</p>
                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <div className='flex items-end justify-between w-full'>
                                <label htmlFor="email" className='base w-max min-w-28'>Email</label>
                                <span className='text-orange-400 sm'>{errors.email}</span>
                            </div>
                            <input value={formData.email} className={`input ${errors.email ? "outline-error focus:outline-error" : "outline-white focus:outline-primary/20"}`} onChange={(e) => { setErrors({ ...errors, email: "" }); setFormData({ ...formData, email: e.target.value }) }} type="email" id="email" name="email" placeholder='e.g. john@example.com' />
                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <div className='flex items-end justify-between w-full'>
                                <label htmlFor="password" className='base w-max min-w-28'>Password</label>
                                <span className='text-orange-400 sm'>{errors.password}</span>
                            </div>
                            <input value={formData.password} className={`input ${errors.password ? "outline-error focus:outline-error" : "outline-white focus:outline-primary/20"}`} onChange={(e) => { setErrors({ ...errors, password: "" }); setFormData({ ...formData, password: e.target.value }) }} type="password" id="password" name="password" placeholder='••••••••••' />
                        </div>
                    </section>
                    <PrimaryButton type='submit' text='Sign in' styles='text-sm w-max mt-3 h-full op font-medium rounded-lg p-3 px-6' />
                    <div className='mt-2'>
                        <span>No account ?</span> <Link href="/auth/signup" className='font-bold text-primary hover:underline underline-offset-2'><span>Sign up</span></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SigninForm