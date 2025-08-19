'use client'
import { useAuthStore } from '@/stores/authStores'
import React from 'react'

const ProfileTab = () => {
    const { fullname, role, hasHydrated } = useAuthStore((state) => state)

    if (hasHydrated) {
        console.log(fullname)
    }
    return (
        <div className="h-full max-md:hidden cursor-pointer flex items-center gap-2">
            <div className="flex items-center justify-center text-white rounded bg-primary w-max min-w-8 px-2 h-full">
                {fullname[0]}
            </div>
            <div className="flex flex-col xs text-black/80">
                <span className="font-bold">{fullname}</span>
                <span className="capitalize">{role}</span>
            </div>
        </div>
    )
}

export default ProfileTab