"use client"
import React, { useRef, useState } from 'react'
import mail from '@/public/img/mail.png'
import Image from 'next/image'
import PrimaryButton from '@/components/ui/PrimaryButton'
import useOTP from '@/hooks/auth/useOTP'

const OtpForm = () => {
  const { handleChange, otp, handleKeyDown, handlePaste, inputsRef } = useOTP();

  return (
    <div className='flex items-center inter justify-center h-full -mt-8 w-full max-w-sm mx-auto'>
      <div className='flex flex-col items-center'>
        <Image src={mail} height={mail.height} width={mail.height} alt="Mail" className='w-32 h-32' />
        <div className='text-center'>
          <h1 className='bricolage x4l font-semibold'>Verify Email</h1>
          <p className='text-black/70 xl mt-2'>Please enter the 6 digit code sent to <span className='font-medium'>email@gmail.com</span></p>
        </div>
        <form className='mt-5'>
          <div className='grid grid-cols-6 gap-2'>
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                ref={el => { inputsRef.current[index] = el ?? undefined; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className='w-full h-auto base outline-0 p-4 border border-stroke focus:border-primary rounded-lg text-center mx-1'
                value={otp[index]}
                onChange={e => handleChange(e, index)}
                onKeyDown={e => handleKeyDown(e, index)}
                onPaste={e => handlePaste(e, index)}
                autoFocus={index === 0}
              />
            ))}
          </div>
          <PrimaryButton type="submit" text='Verify' styles='w-full p-3 rounded-lg mt-4' />
        </form>
      </div>
    </div>
  )
}

export default OtpForm