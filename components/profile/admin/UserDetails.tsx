import { apiFetch } from '@/utils/apiFetch';
import React from 'react'
import { MdOutlineManageAccounts } from 'react-icons/md'

const UserDetails = () => {
    const [users, setUsers] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await apiFetch('/api/users/all-users')
                const data = await res.json();
                console.log(data);
                if (!res.ok || data.status !== 'success') {
                    setError(data.message || 'Could not fetch users.');
                } else {
                    setUsers(data.data.users.slice(0, 7));
                }
            } catch (err: any) {
                setError('Server error. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

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
                    <tbody>
                        {loading ? (
                            <tr className='animate-pulse'>
                                <td className='font-light base text-start sm px-3 py-2 border-b border-stroke'><div className='bg-black/20 rounded-sm'><span className='opacity-0'>test</span></div></td>
                                <td className='font-light base text-start sm px-3 py-2 border-b border-stroke'><div className='bg-black/20 rounded-sm'><span className='opacity-0'>test</span></div></td>
                                <td className='font-light base text-start sm px-3 py-2 border-b border-stroke'><div className='bg-black/20 rounded-sm'><span className='opacity-0'>test</span></div></td>
                            </tr>
                        ) : error ? (
                            <tr><td colSpan={3} className='base text-red-500 px-3 py-2'>{error}</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan={3} className='base text-black/60 px-3 py-2'>No users yet.</td></tr>
                        ) : (
                            users.map((user, idx) => (
                                <tr key={user._id || idx}>
                                    <td className='font-light base text-start sm px-3 py-2 border-b border-stroke'>{user.fullname}</td>
                                    <td className='font-light base text-start sm px-3 py-2 border-b border-stroke'>{user.email}</td>
                                    <td className='font-light base text-start sm px-3 py-2 border-b border-stroke'>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserDetails