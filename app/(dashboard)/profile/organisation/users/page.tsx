"use client"
import PrimaryButton from '@/components/ui/PrimaryButton'
import React from 'react'
import { IoAdd } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'
import { RxCaretDown } from 'react-icons/rx'
import { apiFetch } from '@/utils/apiFetch'
import { useAlertStore } from '@/stores/alertStore'
import { clear } from 'console'

const page = () => {
    const [showForm, setShowForm] = React.useState(false);
    const [form, setForm] = React.useState({ fullname: '', email: '', phonenumber: '', role: '' });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const { setMessage, clearMessage } = useAlertStore((state) => state)

    const [roleDropdownOpen, setRoleDropdownOpen] = React.useState(false);
    const roles = [
        { value: 'admin', label: 'Admin' },
        { value: 'analyst', label: 'Analyst' },
        { value: 'researcher', label: 'Researcher' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
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
            }
        } catch (err: any) {
            setError('Server error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='inter flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='x2l font-semibold'>Users</h1>
                    <p className='text-black/60 base'>Manage users and their access permissions</p>
                </div>
                <PrimaryButton
                    text={showForm ? 'Close' : 'Add user'}
                    styles='p-3 effect base rounded-lg w-max'
                    icon={<IoAdd className={`${showForm ? 'rotate-45' : ''} duration-300 transition w-5 h-auto`} />}
                    onClick={() => setShowForm(!showForm)}
                />
            </div>
            {showForm && (
                <form className='flex p4 op-2 border border-stroke rounded-lg flex-col gap-4' onSubmit={handleSubmit}>
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
        </div>
    )
}

export default page