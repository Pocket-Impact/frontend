import { useAuthStore } from '@/stores/authStores';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'

const AuthRedirect = () => {
    const { _id, hasHydrated } = useAuthStore((state) => (state));
    const router = useRouter();

    useEffect(() => {
        if(!_id && hasHydrated) {
            router.replace('/auth/signin');
        }
    }, [_id, hasHydrated, router]);

    return null;
}

export default AuthRedirect