"use client"
import { useAlertStore } from '@/stores/alertStore';
import React from 'react'
import { IoCheckmarkSharp } from 'react-icons/io5'

const AlertComponent = () => {
    const { message } = useAlertStore((state) => state);

    return (
        <div className={`inter absolute z-10 border-b border-x border-green-600 max-sm:w-full w-max min-w-lg ${message ? "translate-y-0" : "-translate-y-15"} transition duration-300 flex items-center gap-3 top-0 rounded-b-2xl p-3 left-1/2 -translate-x-1/2 bg-green-200 text-green-600 font-semibold`}>
            <div className='bg-white base p-2 border border-green-600 rounded-lg'>
                <IoCheckmarkSharp />
            </div>
            <span>{message}</span>
        </div>
    )
}

export default AlertComponent