import { useAlertStore } from '@/stores/alertStore';
import { useAuthStore } from '@/stores/authStores';
import { apiFetch } from '@/utils/apiFetch';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'

const useOTP = () => {
    const [otp, setOtp] = useState(Array(6).fill(''));
    const inputsRef = useRef<(HTMLInputElement | undefined)[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { email } = useAuthStore((state) => state);
    const router = useRouter();
    const { setMessage, clearMessage } = useAlertStore((state) => state);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setError(null);

        let newOtp = [...otp];
        if (value.length > 1) {
            value.split('').forEach((char, i) => {
                if (idx + i < 6) newOtp[idx + i] = char;
            });
            setOtp(newOtp);
            const nextIdx = Math.min(idx + value.length, 5);
            inputsRef.current[nextIdx]?.focus();
        } else {
            newOtp[idx] = value;
            setOtp(newOtp);
            if (value && idx < 5) {
                inputsRef.current[idx + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === 'Backspace') {
            if (!otp[idx] && idx > 0) {
                inputsRef.current[idx - 1]?.focus();
            }
        }
        if (e.key === 'ArrowLeft' && idx > 0) {
            inputsRef.current[idx - 1]?.focus();
        }
        if (e.key === 'ArrowRight' && idx < 5) {
            inputsRef.current[idx + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, idx: number) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
        let newOtp = [...otp];
        paste.split('').forEach((char, i) => {
            if (idx + i < 6) newOtp[idx + i] = char;
        });
        setOtp(newOtp);
        const nextIdx = Math.min(idx + paste.length, 5);
        inputsRef.current[nextIdx]?.focus();
    };
    
    const verify = async () => {
        setIsLoading(true);
        try {
            const response = await apiFetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: otp.join('') }),
                credentials: 'include'
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                console.log(json)
                setError(json.message);
            } else {
                setMessage("Successfully verified user");
            
                setTimeout(() => {
                    clearMessage();
                }, 3000);
                setIsLoading(false);
                router.push('/feedback/dashboard')
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (otp.some((digit) => digit === '')) {
            setError('Please enter all digits');
            return;
        }

        verify();
        inputsRef.current[0]?.focus();
        setOtp(Array(6).fill(''));
    };

    const resendOTP = async () => {
        const response = await apiFetch('/api/auth/resend-otp', {
            credentials: 'include'
        })

        if (response.ok) {
            setMessage("OTP resent successfully");

            setTimeout(() => {
                clearMessage();
            }, 3000);
        }

        return null;
    }

    return {
        handleChange,
        handleKeyDown,
        handlePaste,
        inputsRef,
        resendOTP,
        error,
        onSubmit,
        isLoading,
        otp
    };
}

export default useOTP