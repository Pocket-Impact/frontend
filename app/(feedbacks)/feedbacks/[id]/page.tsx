"use client"
import PrimaryButton from '@/components/ui/PrimaryButton';
import { useAlertStore } from '@/stores/alertStore';
import { apiFetch } from '@/utils/apiFetch';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { RxCaretDown } from 'react-icons/rx';

const categories = [
  "product",
  "ux",
  "support",
  "pricing",
  "features",
  "performance",
  "other"
];

const Page = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setMessage, clearMessage } = useAlertStore((state) => state);
  const [message, setMessageState] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Frontend validation for required fields
    if (!id) {
      setError('Organisation is required.');
      setLoading(false);
      return;
    }
    if (!selectedCategory) {
      setError('Category is required.');
      setLoading(false);
      return;
    }
    if (!message || message.trim() === '') {
      setError('Message is required.');
      setLoading(false);
      return;
    }

    try {
      const organisationId = id;
      const res = await apiFetch(`/api/feedbacks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          organisationId,
          message,
          category: selectedCategory,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        // Backend returns status and message
        if (data.status === 'fail' && data.message) {
          setError(data.message);
        } else {
          setError('Could not submit feedback. Please try again later.');
        }
      } else {
        setMessage('Feedback submitted successfully!');
        setMessageState('');
        setSelectedCategory(null);
      }
    } catch (err: any) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full bg-white max-md:h-full flex-1 min-h-0 h-max border-stroke border p-6 inter flex flex-col items-start">
      <div className="flex justify-between">
        <h3 className="x2l font-bold mb-4 text-primary">Feedback Form</h3>
      </div>
      {error && <div className="text-red-500 mb-4 bg-red-100 w-full p-2 border-2 border-red-400">{error}</div>}
      <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="block base font-semibold mb-2 base">Category</label>
        <div className={`relative bg-white p-3 border rounded-sm border-stroke flex items-center justify-between`} onClick={() => setOpen(!open)}>
          <span>{selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 'Select category'}</span>
          <div className='rounded-sm hover:bg-gray-200 cursor-pointer' onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
            <RxCaretDown className={`${open ? "rotate-180" : ""} transition-all duration-300 w-6 text-black/80 h-6`} />
          </div>
          <div className={`${!open ? "hidden" : ""} absolute bg-white top-full mt-2 rounded-lg z-50 border border-gray-300 overflow-y-scroll clean max-h-52 w-full left-0`}>
            {categories.map((category: string) => (
              <div key={category} onClick={() => { setSelectedCategory(category); setOpen(false); }} className='hover:bg-gray-200 pl-2 cursor-pointer h-10 flex items-center border-gray-300 border-b'>
                <span className='capitalize'>{category}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <label className="block base font-semibold mb-2">Content</label>
          <textarea
            className="w-full base p-2 border bg-white border-gray-300 outline-0 focus:border-primary rounded"
            rows={5}
            value={message || ''}
            onChange={(e) => setMessageState(e.target.value)}
          />
          <PrimaryButton
            text={loading ? "Submitting..." : "Submit answer"}
            styles="p-3 px-4 base rounded-sm mt-2 bg-primary text-white hover:bg-primary-dark transition"
            type="submit"
            isLoading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default Page;