import React from 'react'
import { MdOutlineManageAccounts } from 'react-icons/md'

const UserDetails = () => {
    return (
        <div className='bg-white lg:col-span-3 flex flex-col gap-4 p4 rounded-lg border border-stroke'>
            <div className='flex justify-between items-start'>
                <div>
                    <h3 className='font-semibold lg'>Users</h3>
                    <h3 className='text-black/60 sm'>View and edit organisation users</h3>
                </div>
                <button className='flex hover:border-stroke border border-white transition duration-300 cursor-pointer p-1 rounded-[3px] pr-2 items-center gap-2'>
                    <MdOutlineManageAccounts />
                    <span className='sm'>Manage users</span>
                </button>
            </div>
            <div>
                <table className='w-full'>
                    <thead className='bg-black/10'>
                        <tr>
                            <th className='font-medium px-3 py-2 sm text-start'>Full name</th>
                            <th className='font-medium px-3 py-2 sm text-start'>Email</th>
                            <th className='font-medium px-3 py-2 sm text-start'>Role</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        <tr>
                            <td className='font-light base text-start sm px-3 py-2 border-b border-stroke'>Gutabarwa Chlomi Justifié</td>
                            <td className='font-light base text-start sm px-3 py-2 border-b border-stroke'>gutabarwaa@gmail.com</td>
                            <td className='font-light base text-start sm px-3 py-2 border-b border-stroke'>Admin</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserDetails