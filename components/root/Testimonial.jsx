import React from 'react'
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md'

const Testimonial = ({ testimonial }) => {
    return (
        <div className='bg-white border flex flex-col justify-between border-stroke p-6'>
            <div>
                <div className='flex items-center gap-2'>
                    {Array.from({ length: testimonial.rating }, (_, index) => (
                        <MdOutlineStar key={index} className='w-5 h-auto text-amber-500' />
                    ))}
                    {Array.from({ length: 5 - testimonial.rating }, (_, index) => (
                        <MdOutlineStarBorder key={index} className='w-5 h-auto text-amber-500' />
                    ))}
                </div>
                <p className='base text-black/70 mt-4 w-full'>{testimonial.comment}</p>
            </div>
            <div className='mt-5'>
                <p className='font-bold base'>{testimonial.author}</p>
                <p className='base'>{testimonial.authorPosition}</p>
            </div>
        </div>
    )
}

export default Testimonial