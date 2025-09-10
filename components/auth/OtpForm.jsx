"use client"
import React, { useEffect, useRef, useState } from 'react'
import mail from '@/public/img/mail.png'
import Image from 'next/image'
import PrimaryButton from '@/components/ui/PrimaryButton'
import useOTP from '@/hooks/auth/useOTP'
import { useAuthStore } from '@/stores/authStores'
import { useRouter } from 'next/navigation'

const OtpForm = () => {
  // No props used, so no PropTypes needed
  const { handleChange, otp, handleKeyDown, isLoading, handlePaste, resendOTP, inputsRef, error, onSubmit } = useOTP();
  const { email, hasHydrated } = useAuthStore((state) => (state));
  const router = useRouter()

  useEffect(() => {
    if (!email && hasHydrated) {
      router.replace('/auth/signin');
    }
  }, [hasHydrated, email, router])

  return (
    <div onSubmit={onSubmit} className='flex items-center inter justify-center h-full -mt-8 w-full max-w-sm mx-auto'>
      <div className='flex flex-col items-center'>
        <Image src={mail} height={mail.height} width={mail.height} alt="Mail" className='w-32 h-32' />
        <div className='text-center'>
          <h1 className='bricolage x4l font-semibold'>Verify Email</h1>
          <p className='text-black/70 xl mt-2'>Please enter the 6 digit code sent to <span className='font-medium'>{email}</span></p>
        </div>
        <form className='mt-5'>
          {error &&
            <div className='mb-4 bg-orange-100 border-orange-400 border p-3 op-2 base rounded-lg text-red-500 font-medium'>
              {error}
            </div>
          }
          <div className='grid grid-cols-6 gap-2'>
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                ref={el => { inputsRef.current[index] = el ?? undefined; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className={`${error ? 'border-orange-500' : 'border-stroke'} w-full h-auto base outline-0 p-4 border focus:border-primary rounded-lg text-center`}
                value={otp[index]}
                onChange={e => handleChange(e, index)}
                onKeyDown={e => handleKeyDown(e, index)}
                onPaste={e => handlePaste(e, index)}
                autoFocus={index === 0}
              />
            ))}
          </div>
          <PrimaryButton isLoading={isLoading} type="submit" text='Verify' styles='w-full p-3 rounded-lg mt-4' />
          <button type='button' onClick={resendOTP} className='font-semibold text-primary/80 mt-3 cursor-pointer'>Resend OTP</button>
        </form>
      </div>
    </div>
  )
}

export default OtpForm