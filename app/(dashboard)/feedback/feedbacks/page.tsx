"use client"
import FeedbackCard from '@/components/feedback/feedbacks/FeedbackCard'
import { useAuthStore } from '@/stores/authStores'
import React, { useState } from 'react'
import { BiCopy } from 'react-icons/bi'
import { apiFetch } from '@/utils/apiFetch';
import LoadingCard from '@/components/feedback/feedbacks/LoadingCard'

const page = () => {
  const [copied, setCopied] = useState(false);
  const { organisationId, hasHydrated } = useAuthStore((state) => state);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!organisationId) {
          setError('Organisation ID is required.');
          setLoading(false);
          return;
        }
        const res = await apiFetch(`/api/feedbacks?organisationId=${organisationId}`);
        const data = await res.json();
        if (!res.ok || data.status === 'fail') {
          setError(data.message || 'Could not fetch feedbacks.');
        } else {
          setFeedbacks(data.data || []);
        }
      } catch (err: any) {
        setError('Server error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [organisationId]);

  const handleCopy = () => {
    if (hasHydrated) {
      navigator.clipboard.writeText(`${window.location.origin}/feedbacks/${organisationId}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className='inter flex flex-col gap-6'>
      <div className='flex justify-between'>
        <div>
          <h1 className='x2l font-semibold'>Feedbacks</h1>
          <p className='text-black/60 base'>Review and manage feedbacks submitted to your organisation</p>
        </div>
        <div>
          <button
            className='flex bg-primary/10 items-center gap-2 hover:bg-primary/20 p-2 rounded-sm hover:text-black transition duration-300 cursor-pointer base'
            onClick={handleCopy}
            type="button"
          >
            <BiCopy className='' />
            <span className='sm'>{copied ? 'Copied' : 'Organisation link'}</span>
          </button>
        </div>
      </div>
      {loading ? (
        <div className='grid grid-cols-3 max-lg:grid-cols-1 gap-6 max-md:gap-4'>
          <LoadingCard />
        </div>
      ) : (
        <div className='grid grid-cols-3 max-lg:grid-cols-1 gap-6 max-md:gap-4'>
          {feedbacks.length === 0 ? (
            <div className='col-span-3 text-black/60 base'>No feedback found for this organisation.</div>
          ) : (
            feedbacks.map((feedback) => (
              <FeedbackCard key={feedback._id} feedback={feedback} />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default page