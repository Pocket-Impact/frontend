import React from 'react'
import PrimaryButton from '../ui/PrimaryButton'

const SignupForm = () => {
  return (
    <div className='w-full'>
      {/* SignupForm */}
      {/* Add your signup form fields here */}
      <form className="inter flex flex-col gap-4 w-1/3">
        <section className='flex flex-col gap-4'>
          <h1 className='bricolage x2l font-bold'>About you</h1>
          <div className='flex items-center gap-2'>
            <label htmlFor="fullName" className='max-w-6'>Names:</label>
            <input className='input' type="text" id="fullName" name="fullName" placeholder='e.g. John Doe' required />
          </div>
          <div className='flex items-center gap-2'>
            <label htmlFor="email" className='max-w-6'>Email:</label>
            <input type="email" className='input' id="email" name="email" placeholder='e.g. john@example.com' required />
          </div>
          <div className='flex items-center gap-2'>
            <label htmlFor="password" className='max-w-6'>Password:</label>
            <input type="password" className='input' id="password" name="password" placeholder='Enter your password' required />
          </div>
          <PrimaryButton text="Next" styles="text-sm w-max rounded-lg py-3 px-6 mt-4" />
        </section>
      </form>
    </div >
  )
}

export default SignupForm