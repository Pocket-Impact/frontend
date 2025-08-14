"use client"
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'

const SendSurvey: React.FC<{ open: boolean, close: Function, link: string }> = ({ open, close, link }) => {
    const [email, setEmail] = useState('')
    const [emails, setEmails] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)

    const addEmail = () => {
        let newError = ""

        if (email.length == 0) {
            newError = 'Required'
        } else if (!email.trim().includes('@') && !email.trim().includes('.')) {
            newError = 'Email should include "@" and "."'
        } else {
            setEmails([...emails, email])
            setEmail('')
        }

        setError(newError)

    }

    return (
        <div className={` ${open ? 'absolute' : 'hidden'} bg-black/10 h-full top-0 p-3 flex flex-col items-center justify-center left-0 w-full backdrop-blur-sm z-10`}>
            <div className='absolute top-3 bg-secondary rounded-2xl border p-2 right-3 cursor-pointer' onClick={() => { setEmails([]); close(false); setEmail(''); setError(null) }}>
                <IoClose className='w-10 h-auto' />
            </div>
            <div className='flex flex-col w-full max-w-3xl'>
                <h1 className='x2l mb-2 font-bold'>Enter emails to send the survey</h1>
                <span className='text-orange-600 mb-1 mr-2 self-end sm'>{error}</span>
                <form action="" onSubmit={(e) => { e.preventDefault(); addEmail(); }} className={`w-full border ${error ? 'border-orange-400' : 'border-primary'} p-2 flex items-center bg-white rounded-2xl`}>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='p-3 w-full outline-0 pl-2' placeholder='e.g. john@example.com' />
                    <button type="button" onClick={addEmail} className='p-3 bg-primary text-white min-w-max rounded-lg base cursor-pointer'>Add email</button>
                </form>
                <div className='flex flex-wrap gap-2 mt-2'>
                    {emails.map((email, index) => (<span key={index} className='bg-green-100 cursor-default flex items-center gap-2 border-2 text-green-600 p-1 rounded-full pl-2 border-green-300'>
                        {email}
                        <IoClose className='cursor-pointer text-white bg-green-600 hover:bg-green-700 transition duration-300 h-full w-auto rounded-full px-1' onClick={() => setEmails(emails.filter((_, i) => i !== index))} />
                    </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SendSurvey