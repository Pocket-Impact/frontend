import React, { useRef, useState } from 'react'

const useOTP = () => {
    const [otp, setOtp] = useState(Array(6).fill(''));
    const inputsRef = useRef<(HTMLInputElement | undefined)[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        let newOtp = [...otp];
        if (value.length > 1) {
            // Handle paste or fast typing
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

    return {
        handleChange,
        handleKeyDown,
        handlePaste,
        inputsRef,
        otp
    };
}

export default useOTP