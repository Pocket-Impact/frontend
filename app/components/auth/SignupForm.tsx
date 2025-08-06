import React from 'react'
import PrimaryButton from '../ui/PrimaryButton'
import Link from 'next/link'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import logo from '@/public/img/white.svg'
import Image from 'next/image'
import { FiUser } from 'react-icons/fi'
import { GoOrganization } from 'react-icons/go'

const SignupForm = () => {
  const step = 1;

  return (
    <div className='w-full rounded-3xl inter overflow-hidden max-w-5xl lg:grid max-md:bg-background lg:grid-cols-7 gap-10 lg:border border-black/20 bg-white justify-center items-center'>
      <div className='bg-primary col-span-3 p-5 h-full'>
        <div className='flex items-center gap-4'>
          <Image src={logo} alt="Pocket Impact Logo" width={logo.width} height={logo.height} className='w-8 h-8' />
          <span className='bricolage lg text-white'>
            Pocket Impact
          </span>
        </div>
        <div className='mt-20 ml-4'>
          <div className='flex items-center gap-4'>
            <div className='bg-white rounded-lg w-max p-2'>
              <FiUser className={`${step == 1 ? "text-primary" : ""} w-6 h-6`} />
            </div>
            <div>
              <p className='text-white sm'>Your personal details</p>
              <p className='text-white/50 sm'>Personal details of user</p>
            </div>
          </div>
          <div className='h-14 w-5 border-r-2 border-dashed border-white'></div>
          <div className='flex items-center gap-4'>
            <div className={`${step != 1 ? "bg-white" : "bg-white/30"} rounded-lg w-max p-2`}>
              <GoOrganization className={`${step != 1 ? "text-primary" : "text-white"} w-6 h-6`} />
            </div>
            <div>
              <p className='text-white sm'>Your organisation's details</p>
              <p className='text-white/50 sm'>Details of the organisation</p>
            </div>
          </div>
        </div>
      </div>
      <form className="inter flex flex-col w-full col-span-4 p-10">
        <section className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2 my-4'>
            <h6 className='text-black/50'>Step 1/2</h6>
            <h1 className='bricolage x2l font-bold'>Personal information</h1>
            <p className='base font-light text-black/70'>Tell us a bit about yourself to get started your pocket impact account.</p>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="fullName" className='w-max min-w-28 base'>Full names</label>
            <input className='input' type="text" id="fullName" name="fullName" placeholder='e.g. John Doe' required />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='w-max min-w-28'>Email</label>
            <input type="email" className='input' id="email" name="email" placeholder='e.g. john@example.com' required />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="password" className='w-max min-w-28'>Password</label>
            <input type="password" className='input' id="password" name="password" placeholder='••••••••••' required />
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center w-max gap-2'>
              <PrimaryButton icon={<MdOutlineKeyboardBackspace className='w-6 h-auto text-primary' />} styles="w-max rounded-lg bg-primary/20 p-2.5" />
              <PrimaryButton text="Next" styles="text-sm effect w-max h-full font-medium rounded-lg py-3 px-10" />
            </div>
            <div className='mt-2'>
              <span>Already have an account?</span> <Link href="/auth/signin" className='font-bold text-primary hover:underline underline-offset-2'><span>Log in</span></Link>
            </div>
          </div>
        </section>
      </form>
    </div >
  )
}

export default SignupForm