import React from 'react'

const OrgDetails = () => {
    return (
            <div className='bg-white w-full lg:col-span-2 flex flex-col gap-4 border rounded-lg p4 border-stroke'>
                <div>
                    <h3 className='font-semibold lg'>Organisation details</h3>
                    <h3 className='text-black/60 sm'>View and edit organisation information</h3>
                </div>
                <div className='flex flex-col'>
                    <span className='xs font-medium text-black/60'>Organisation Name</span>
                    <span className='base'>Org XYZ</span>
                </div>
                <div className='flex flex-col'>
                    <span className='xs font-medium text-black/60'>Organisation Country</span>
                    <span className='base'>USA</span>
                </div>
                <div className='flex flex-col'>
                    <span className='xs font-medium text-black/60'>Organisation Size</span>
                    <span className='base'>Medium (20 - 100)</span>
                </div>
            </div>
    )
}

export default OrgDetails