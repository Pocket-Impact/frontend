    export const signUp = async (formData: any) => {
        const body = {
            fullname: formData.fullName,
            email: formData.email,
            phonenumber: formData.phoneNumber,
            organisationName: formData.organisationName,
            organisationCountry: formData.organisationCountry,
            organisationSize: (`${formData.organisationSize}`).toLowerCase(),
            password: formData.password
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const json = await response.json()

            if (!response.ok) {
                console.log(json.message)
            }

            return json;
        } catch (error) {
            console.error('Sign up error:', error);
            throw error;
        }
    }