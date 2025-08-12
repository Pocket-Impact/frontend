"use client"
import React, { useState } from 'react'
import { IoIosAdd, IoIosRemove } from 'react-icons/io'

const ResponsesGrid = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className='mt-5'>
            <div className={`border rounded-xl ${open ? 'h-max' : 'h-[74px]'} transition-all duration-300 overflow-hidden border-stroke p3`}>
                <div className='flex items-center justify-between gap-2'>
                    <div className='flex items-center gap-2'>
                        <span className='p-2 w-12 h-12 rounded-md flex items-center justify-center bg-black text-white'>A</span>
                        <div className='flex flex-col'>
                            <span className='font-semibold'>Anonymous</span>
                            <span className='text-black/60'>Submitted 2 hours ago</span>
                        </div>
                    </div>
                    <div onClick={() => setOpen(!open)} className='hover:bg-stroke/80 transition duration-300 cursor-pointer p3 rounded-md'>
                        {!open ? <IoIosAdd className='w-6 h-6' /> : <IoIosRemove className='w-6 h-6' />}
                    </div>
                </div>
                <div className='mt-4 ml-2'>
                    <p className='font-semibold base'>
                        What are you doing on our site ?
                    </p>
                    <p className='text-black/60 base'>
                        I just wanted to get some feedback on my experience.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ResponsesGrid