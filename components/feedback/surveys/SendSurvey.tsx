"use client"
import PrimaryButton from '@/components/ui/PrimaryButton'
import { useAlertStore } from '@/stores/alertStore'
import { apiFetch } from '@/utils/apiFetch'
import React, { useState } from 'react'
import Papa from 'papaparse';
import { FiUpload } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5'
import { BiCopy } from 'react-icons/bi'

const SendSurvey: React.FC<{ open: boolean, close: Function, link?: string, uniqueLink?: string }> = ({ open, close, link, uniqueLink }) => {
    const [email, setEmail] = useState('')
    const [emails, setEmails] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const { setMessage, clearMessage } = useAlertStore((state) => state);
    const [loading, setLoading] = useState<boolean>(false);
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [copied, setCopied] = useState(false);

    const addEmail = () => {
        let newError = ""

        if (email.length == 0) {
            newError = 'Required'
        } else if (!email.trim().includes('@') || !email.trim().includes('.')) {
            newError = 'Email should include "@" and "."'
        } else {
            setEmails([...emails, email])
            setEmail('')
        }

        setError(newError)
    }

    const sendSurvey = async () => {
        setError(null);

        if (!error) {
            setLoading(true)
            try {
                const response = await apiFetch('/api/surveys/send-survey-link', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ surveyId: link, emails }),
                });

                if (response.ok) {
                    setEmails([]);
                    setEmail('');
                    setError(null);
                    close(false);
                    setMessage("Successfully sent the surveys");
                    setTimeout(() => {
                        clearMessage();
                    }, 3000);
                } else {
                    const data = await response.json();
                    setError(data.message || 'Failed to send survey');
                    console.log(data)
                }
            } catch (err) {
                setError('Network error');
            }
            setLoading(false);
        }
    }

    const handleCopy = () => {
        if (link) {

            navigator.clipboard.writeText(`${window.location.origin}/surveys/unique/${uniqueLink}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        }
    };

    return (
        <div className={` ${open ? 'absolute' : 'hidden'} bg-black/30 op-2 h-full top-0 p-3 flex flex-col items-center justify-center left-0 w-full backdrop-blur-sm z-10`}>
            <div className='w-full max-w-3xl flex flex-col gap-4'>
                <div className='bg-white mr-3 w-max rounded-lg self-end hover:bg-orange-300 transition duration-300 border p-2 right-3 cursor-pointer' onClick={() => { setEmails([]); close(false); setEmail(''); setError(null) }}>
                    <IoClose className='w-6 h-auto max-lg:w-5 max-md:w-4' />
                </div>
                <div className='flex flex-col gap-2 border border-stroke bg-white rounded-lg p4 text-black w-full max-w-3xl'>
                    <div className='flex items-center justify-between'>
                        <h1 className='xl mb-2 font-bold'>Enter emails to send the survey</h1>
                        <button
                            className='flex bg-primary/10 items-center gap-2 hover:bg-primary/20 p-2 rounded-sm hover:text-black transition duration-300 cursor-pointer base'
                            onClick={handleCopy}
                            type="button"
                        >
                            <BiCopy className='' />
                            <span className='sm'>{copied ? 'Copied' : 'Link'}</span>
                        </button>
                    </div>
                    <span className='text-orange-600 mb-1 mr-2 self-end sm'>{error}</span>
                    <form action="" onSubmit={(e) => { e.preventDefault(); addEmail(); }} className={`w-full border ${error ? 'border-orange-400' : 'border-primary'} p-1 flex items-center bg-white rounded-sm`}>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='p2 w-full base outline-0 pl-1' placeholder='e.g. john@example.com' />
                        <button type="button" onClick={addEmail} className='p-3 bg-primary effect text-white min-w-max base h-full cursor-pointer'><span className='text'>Add email</span></button>
                    </form>
                    <div className='mt-2'>
                        <label htmlFor='csv-upload' className='block mb-1 base font-medium'>Or upload CSV file:</label>
                        <div className='relative w-full'>
                            <input
                                id='csv-upload'
                                type='file'
                                accept='.csv'
                                style={{ display: 'none' }}
                                onChange={e => {
                                    const file = e.target.files?.[0];
                                    setCsvFile(file || null);
                                    if (!file) return;
                                    Papa.parse(file, {
                                        header: false,
                                        skipEmptyLines: true,
                                        complete: (results: any) => {
                                            const allEmails = results.data.flat().filter((val: string) => val.includes('@') && val.includes('.'));
                                            setEmails(prev => Array.from(new Set([...prev, ...allEmails])));
                                        },
                                    });
                                }}
                            />
                            <label htmlFor='csv-upload' className='flex items-center gap-2 cursor-pointer border rounded-sm p-2 border-primary w-full bg-white hover:bg-primary/2 transition'>
                                <FiUpload className='w-5 h-5 text-primary' />
                                <span className='base text-black/70'>
                                    {csvFile ? csvFile.name : 'Upload file'}
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-2 mt-2'>
                        {emails.map((email, index) => (
                            <span key={index} className='bg-green-100 cursor-default flex items-center gap-2 border-2 text-green-600 p-1 base rounded-full pl-2 border-green-300'>
                                {email}
                                <IoClose className='cursor-pointer text-white bg-green-600 hover:bg-green-700 transition duration-300 h-full w-auto rounded-full px-1' onClick={() => setEmails(emails.filter((_, i) => i !== index))} />
                            </span>
                        ))}
                    </div>
                    {emails.length != 0 &&
                        <PrimaryButton
                            isLoading={loading}
                            onClick={sendSurvey}
                            text='Send Survey'
                            styles={`mt-4 w-max p-3 ${loading ? "pl-4" : "px-4"} rounded-xl base`}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default SendSurvey