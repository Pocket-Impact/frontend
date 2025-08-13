import React from 'react'
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md'
import Testimonial from '../root/Testimonial'
import {testimonials} from '@/lib/testimonials'

const TestimonialsSection = () => {
  return (
    <div className='inter pt-20 px-12 max-lg:px-8 max-md:px-4 max-sm:px-2'>
      <div>
        <h6 className='x5l bricolage'>From our <br /> <span className='font-bold'>community</span></h6>
        <p className='xl font-light'>Here's what other NGOs had to say about Pocket Impact</p>
      </div>
      <div className='grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-3 grid mt-5'>
        {testimonials.map((testimonial, index) => (
         <Testimonial key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  )
}

export default TestimonialsSection