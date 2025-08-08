import React, { useState } from 'react'

const useSignin = () => {
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    })

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let newErrors = { email: "", password: "" };

        // Some email validations
        if (formData.email.length === 0) {
            newErrors.email = "Required";
        } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
            newErrors.email = "Email must include '@' and '.'";
        }

        // Some password validations
        if (formData.password.length === 0) {
            newErrors.password = "Required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Minimum 6 characters";
        }

        setErrors(newErrors);

        // Sign in logic
        if (newErrors.email === "" && newErrors.password === "") {
            console.log(formData);
            setFormData({ email: "", password: "" });
        }

        
    }

    return {
        errors,
        formData,
        setErrors,
        onSubmit,
        setFormData
    }
}

export default useSignin