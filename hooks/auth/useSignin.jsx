import { useAlertStore } from '@/stores/alertStore';
import { useAuthStore } from '@/stores/authStores';
import { apiFetch } from '@/utils/apiFetch';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


const useSignin = () => {
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { setUser } = useAuthStore();
    const { setMessage, clearMessage } = useAlertStore();

    const validate = (data) => {
        let newErrors = { email: "", password: "" };
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

    const signIn = async (data) => {
        setIsLoading(true);
        try {
            const response = await apiFetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            const json = await response.json();

            if (!response.ok) {
                setErrors({ email: "Invalid Email or Password", password: "Invalid Email or Password" });
                setIsLoading(false);
                console.log(json);
                return;
            }

            setUser(json.data.user);
            setMessage("Successfully signed in");
            setTimeout(() => {
                clearMessage();
            }, 3000);

            setIsLoading(false);
            console.log(json);
            if (json.data.user.isVerified) {
                setErrors({ email: "", password: "" });
                router.push('/feedback/dashboard');
            } else {
                router.push('/auth/verify-otp');
            }
        } catch (error) {
            console.log(error)
            setErrors({ email: "Network error", password: "" });
            setIsLoading(false);
        }
    };

    const onSubmit = (e) => {
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