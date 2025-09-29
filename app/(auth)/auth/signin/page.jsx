import SigninForm from '@/components/auth/SigninForm'
import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const page = async () => {
    const cookieStore = await cookies()
    const cookie = cookieStore.get('accessToken')

    if (cookie) {
        redirect('/feedback/dashboard')
    }
    
    return (
        <div className='flex flex-col h-screen'>
            <SigninForm />
        </div>
    )
}

export default page