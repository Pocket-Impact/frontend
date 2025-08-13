import React from 'react'
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md'
import Testimonial from '../root/Testimonial'
import {testimonials} from '@/lib/testimonials'

const TestimonialsSection = () => {
  return (
    <div className='inter py-32 px-12'>
      <div>
        <h6 className='x5l bricolage'>From our <br /> <span className='font-bold'>community</span></h6>
        <p className='xl font-light'>Here's what other NGOs had to say about Pocket Impact</p>
      </div>
      <div className='grid-cols-3 gap-3 grid mt-5'>
        {testimonials.map((testimonial, index) => (
         <Testimonial key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  )
}

export default TestimonialsSection