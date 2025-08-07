import SigninForm from '@/components/auth/SigninForm'
import React from 'react'
import logo from '@/public/img/icon.svg'
import Image from 'next/image'

const page = () => {
    return (
        <div className='flex flex-col h-screen'>
            <SigninForm />
        </div>
    )
}

export default page