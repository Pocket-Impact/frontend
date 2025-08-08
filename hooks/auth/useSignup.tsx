import { SignupFormErrors } from '@/lib/errors'
import { signUp } from '@/utils/signUp'
import React, { useState } from 'react'

const useSignup = () => {
    const [step, setStep] = useState(1)
    const handleBack = () => setStep(1)
    const [open, setOpen] = useState(false)
    const [size, setSize] = useState<string>("")

    const handleNext = () => {
        if (step == 1) {
            let newErrors: SignupFormErrors = {
                fullName: "",
                phoneNumber: "",
                email: "",
                password: "",
                organisationName: "",
                organisationCountry: "",
                organisationSize: "",
            };

            if (formData.fullName.length === 0) {
                newErrors.fullName = "Required";
            } else if (!formData.fullName.includes(" ")) {
                newErrors.fullName = "Full names Required";
            }

            if (formData.phoneNumber.length === 0) {
                newErrors.phoneNumber = "Required";
            } else if (!/^\+\d{10,15}$/.test(formData.phoneNumber.trim())) {
                newErrors.phoneNumber = "e.g +1234567890";
            }

            if (formData.email.length === 0) {
                newErrors.email = "Required";
            } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
                newErrors.email = "Email must include '@' and '.'";
            }

            if (formData.password.length === 0) {
                newErrors.password = "Required";
            } else if (formData.password.length < 6) {
                newErrors.password = "Minimum 6 characters";
            }

            setErrors(newErrors);

            if (Object.values(newErrors).every((error) => error === "")) {
                setStep(2);
            }
        }
    }

    const [errors, setErrors] = useState<SignupFormErrors>({
        fullName: "",
        phoneNumber: "",
        email: "",
        password: "",
        organisationName: "",
        organisationCountry: "",
        organisationSize: "",
    })

    const [formData, setFormData] = useState({
        fullName: ("").trim(),
        phoneNumber: ("").trim(),
        email: ("").trim(),
        password: ("").trim(),
        organisationName: ("").trim(),
        organisationCountry: ("").trim(),
        organisationSize: ("").trim(),
    })

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let newErrors: SignupFormErrors = {
            fullName: "",
            phoneNumber: "",
            email: "",
            password: "",
            organisationName: "",
            organisationCountry: "",
            organisationSize: "",
        };

        if (formData.organisationName.length === 0) {
            newErrors.organisationName = "Required";
        } else if (formData.organisationName.length < 5) {
            newErrors.organisationName = "Should be atleast 5 characters";
        }

        if (!formData.organisationCountry) {
            newErrors.organisationCountry = "Required";
        }

        if (!formData.organisationSize) {
            newErrors.organisationSize = "Required";
        }

        setErrors(newErrors);

        if (Object.values(newErrors).every((error) => error === "")) {
            await signUp(formData);
        }
    }
    return {
        step,
        setStep,
        handleBack,
        handleNext,
        open,
        setOpen,
        size,
        setSize,
        errors,
        formData,
        setErrors,
        onSubmit,
        setFormData
    }
}

export default useSignup