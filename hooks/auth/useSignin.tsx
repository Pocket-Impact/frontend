import React, { useEffect, useState } from 'react'

type FormData = {
    email: string;
    password: string;
};

const useSignin = () => {
    const [errors, setErrors] = useState<FormData>({ email: "", password: "" });
    const [formData, setFormData] = useState<FormData>({ email: "", password: "" });

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
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const json = await response.json();
            if (!response.ok) {
                setErrors({email: "Invalid Email or Password", password: "Invalid Email or Password"});
            } else {
                console.log("Signin successful", json);
                setFormData({ email: "", password: "" });
                setErrors({ email: "", password: "" });
            }
        } catch (error) {
            setErrors({ email: "Network error", password: "" });
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
        setFormData
    }
}

export default useSignin