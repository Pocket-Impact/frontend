import React from 'react'
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md'
import Testimonial from '../root/Testimonial'

const testimonials = [
  {
    rating: 5,
    comment: "Pocket Impact made our reporting seamless and transparent. Highly recommended for any NGO!",
    author: "Hope Foundation",
    authorPosition: "Program Manager"
  },
  {
    rating: 4,
    comment: "The analytics dashboard helped us visualize our progress and engage more donors.",
    author: "GreenEarth Initiative",
    authorPosition: "Director"
  },
  {
    rating: 5,
    comment: "We love the collaboration tools. Our team is more connected than ever.",
    author: "Bright Future",
    authorPosition: "Volunteer Coordinator"
  },
  {
    rating: 4,
    comment: "Pocket Impact has transformed the way we manage our projects. The impact tracking feature is a game-changer!",
    author: "TechWise",
    authorPosition: "CEO"
  },
  {
    rating: 5,
    comment: "Easy to use and very effective for monitoring our field activities.",
    author: "WaterWorks",
    authorPosition: "Field Officer"
  }
]

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