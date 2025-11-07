"use client"
import PrimaryButton from '@/components/ui/PrimaryButton'
import React from 'react'
import { IoAdd } from 'react-icons/io5'
import { RxCaretDown } from 'react-icons/rx'
import { apiFetch } from '@/utils/apiFetch'
import useFetch from '@/hooks/useFetch'
import { useAlertStore } from '@/stores/alertStore'

const UsersPage = () => {
    const [showForm, setShowForm] = React.useState(false);
    const [form, setForm] = React.useState({ fullname: '', email: '', phonenumber: '', role: '' });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const { setMessage, clearMessage } = useAlertStore((state) => state)

    const [roleDropdownOpen, setRoleDropdownOpen] = React.useState(false);
    const roles = [
        { value: 'admin', label: 'Admin' },
        { value: 'analyst', label: 'Analyst' },
        { value: 'researcher', label: 'Researcher' },
    ];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await apiFetch('/api/users/add-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok || data.status !== 'success') {
                setError(data.message || 'Could not add user.');
            } else {
                setMessage("Sent login details to " + form.email);
                setTimeout(() => clearMessage(), 3000);
                setForm({ fullname: '', email: '', phonenumber: '', role: '' });
                setShowForm(false);
                refetch(); // Refresh users list
            }
        } catch (err) {
            setError('Server error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const { data: usersResponse, loading: isLoading, error: userError, refetch } = useFetch('/api/users/all-users');

    const users = usersResponse?.status === 'success' ? usersResponse.data.users : [];

    return (
        <div className='inter flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='x2l font-semibold'>Users</h1>
                    <p className='text-black/60 base'>Manage users and their access permissions</p>
                </div>
                <PrimaryButton
                    text={showForm ? 'Close' : 'Add user'}
                    textStyles='line-clamp-1'
                    styles='p-3 effect base rounded-lg w-max'
                    icon={<IoAdd className={`${showForm ? 'rotate-45' : ''} duration-300 transition w-5 max-lg:w-4 h-auto`} />}
                    onClick={() => setShowForm(!showForm)}
                />
            </div>
            {showForm && (
                <form className='flex p4 op-2 bg-white rounded-lg flex-col gap-4' onSubmit={handleSubmit}>
                    <div>
                        <h1 className='xl font-semibold'>Add a new user</h1>
                        <p className='text-black/60 sm'>Enter user details below</p>
                    </div>
                    {error &&
                        <div className='bg-orange-100 border-orange-400 border p-3 op-2 base rounded-lg text-red-500 font-medium'>
                            {error}
                        </div>
                    }
                    <input name='fullname' className='p-2 border border-stroke outline-0 focus:border-primary rounded-sm' value={form.fullname} onChange={handleChange} placeholder='Full name' required />
                    <input name='email' className='p-2 border border-stroke outline-0 focus:border-primary rounded-sm' value={form.email} onChange={handleChange} placeholder='Email' type='email' required />
                    <input name='phonenumber' className='p-2 border border-stroke outline-0 focus:border-primary rounded-sm' value={form.phonenumber} onChange={handleChange} placeholder='Phone number' required />
                    <div className='relative'>
                        <div
                            className={`flex items-center justify-between cursor-pointer p-2 border rounded-sm ${roleDropdownOpen ? 'border-primary' : 'border-stroke'} ${form.role ? 'text-black' : 'text-black/60'}`}
                            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                        >
                            <span>{form.role ? roles.find(r => r.value === form.role)?.label : 'Select role'}</span>
                            <div className='rounded-sm hover:bg-gray-200 cursor-pointer' onClick={(e) => { e.stopPropagation(); setRoleDropdownOpen(!roleDropdownOpen) }}>
                                <RxCaretDown className={`${roleDropdownOpen ? "rotate-180" : ""} transition-all duration-300 w-6 text-black/80 h-6`} />
                            </div>
                        </div>
                        <div className={`${!roleDropdownOpen ? 'hidden' : ''} absolute top-full mt-2 rounded-sm z-50 border border-gray-300 bg-white overflow-y-scroll clean max-h-52 w-full left-0`}>
                            {roles.map((role) => (
                                <div
                                    key={role.value}
                                    onClick={() => { setForm({ ...form, role: role.value }); setRoleDropdownOpen(false); }}
                                    className={`hover:bg-gray-200 cursor-pointer h-10 flex items-center border-gray-300 border-b px-2`}
                                >
                                    <span>{role.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <PrimaryButton text='Submit' isLoading={loading} styles='p-2.5 rounded-sm  flex justify-center' />
                </form>
            )}
            <div className='bg-white p4 rounded-lg'>
                <h1 className='xl font-medium mb-4'>Users</h1>
                <table className='w-full'>
                    <thead className='bg-black/10'>
                        <tr>
                            <th className='font-medium px-3 py-2 sm text-start'>Full name</th>
                            <th className='font-medium px-3 py-2 sm text-start'>Email</th>
                            <th className='font-medium px-3 py-2 sm text-start'>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr className='animate-pulse'>
                                <td className='font-light base text-start sm px-3 py-2 border-b border-stroke'><div className='bg-black/20 rounded-sm'><span className='opacity-0'>test</span></div></td>
                                <td className='font-light base text-start sm px-3 py-2 border-b border-stroke'><div className='bg-black/20 rounded-sm'><span className='opacity-0'>test</span></div></td>
                                <td className='font-light base text-start sm px-3 py-2 border-b border-stroke'><div className='bg-black/20 rounded-sm'><span className='opacity-0'>test</span></div></td>
                            </tr>
                        ) : userError ? (
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

export default UsersPage;   