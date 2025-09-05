import React from 'react'

const OrgDetails = ({ orgData, loading, error }: { orgData: any, loading: boolean, error: string | null }) => {
    return (
        <div className='bg-white w-full lg:col-span-2 flex flex-col gap-4 rounded-lg p4'>
            <div>
                <h3 className='font-semibold lg'>Organisation details</h3>
                <h3 className='text-black/60 sm'>View and edit organisation information</h3>
            </div>
            {loading ? (
                <div className='animate-pulse flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <span className='h-3 w-1/5 bg-black/15 rounded-sm'></span>
                        <span className='h-6 w-2/5 bg-black/15 rounded-sm'></span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='h-3 w-1/5 bg-black/15 rounded-sm'></span>
                        <span className='h-6 w-2/5 bg-black/15 rounded-sm'></span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='h-3 w-1/5 bg-black/15 rounded-sm'></span>
                        <span className='h-6 w-2/5 bg-black/15 rounded-sm'></span>
                    </div>
                </div>
            ) : error ? (
                <div className='base text-red-500'>{error}</div>
            ) : orgData ? (
                <>
                    <div className='flex flex-col'>
                        <span className='xs font-medium text-black/60'>Organisation Name</span>
                        <span className='base'>{orgData.organisationName}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='xs font-medium text-black/60'>Organisation Country</span>
                        <span className='base'>{orgData.organisationCountry}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='xs font-medium text-black/60'>Organisation Size</span>
                        <span className='base'>{orgData.organisationSize}</span>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default OrgDetails