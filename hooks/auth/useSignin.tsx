import { useAlertStore } from '@/stores/alertStore';
import { useAuthStore } from '@/stores/authStores';
import { apiFetch } from '@/utils/apiFetch';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type FormData = {
    email: string;
    password: string;
};

const useSignin = () => {
    const [errors, setErrors] = useState<FormData>({ email: "", password: "" });
    const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const { setUser } = useAuthStore();
    const { setMessage, clearMessage } = useAlertStore();

    const validate = (data: FormData) => {
        let newErrors: FormData = { email: "", password: "" };
        if (!data.email) {
            newErrors.email = "Required";
        } else if (!data.email.includes("@") || !data.email.includes(".")) {
            newErrors.email = "Email must include '@' and '.'";
        }
        if (!data.password) {
            newErrors.password = "Required";
        } else if (data.password.length < 6) {
            newErrors.password = "Minimum 6 characters";
        }
        return newErrors;
    };

    const signIn = async (data: FormData) => {
        setIsLoading(true);
        try {
            const response = await apiFetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            const json = await response.json();

            if (!response.ok) {
                setErrors({ email: "Invalid Email or Password", password: "Invalid Email or Password" });
                setIsLoading(false);
                return;
            }

            setUser(json.data.user);
            setMessage("Successfully signed in");
            setTimeout(() => {
                clearMessage();
            }, 3000);

            // Immediately refresh token after login
            try {
                const refreshRes = await apiFetch('/api/auth/refresh', {
                    method: 'POST',
                    credentials: 'include'
                });
                await refreshRes.json(); // Optionally handle response
            } catch (err) {
                // Optionally handle refresh error
            }

            setIsLoading(false);
            if (json.data.user.isVerified) {
                setErrors({ email: "", password: "" });
                router.push('/feedback/dashboard');
            } else {
                router.push('/auth/verify-otp');
            }
        } catch (error) {
            setErrors({ email: "Network error", password: "" });
            setIsLoading(false);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        setErrors(validationErrors);

        if (!validationErrors.email && !validationErrors.password) {
            signIn(formData);
        }
    };

    return {
        errors,
        formData,
        setErrors,
        onSubmit,
        isLoading,
        setFormData
    }
}

export default useSignin