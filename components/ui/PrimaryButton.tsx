import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'

const PrimaryButton: React.FC<{ text?: string, styles?: string, isLoading?: boolean, type?: "button" | "submit" | "reset", icon?: any, onClick?: () => void }> = ({ text, styles, type, icon, onClick, isLoading }) => {
    return (
        <button type={type} disabled={isLoading} className={`bg-primary ${isLoading ? `px-2 ${icon ? "" : ""} opacity-80 text-center cursor-not-allowed` : `${icon ? "px-3" : "px-4"} cursor-pointer`} transition duration-300 h-max text-white rounded-full inter ${styles}`} onClick={onClick}>
            {!isLoading ?
                (
                    <div className='flex items-center gap-2 max-md:gap-1.5'>
                        {icon && <span className=''>{icon}</span>}
                        <span className='text'>{text}</span>
                    </div>
                )
                :
                (<div className='flex items-center'>
                    {isLoading &&
                        <DotLottieReact
                            src="/animations/loading.lottie"
                            loop
                            autoplay
                            className="w-10"
                            style={{ height: "auto" }}
                        />
                    }
                </div>)
            }
        </button>
    )
}

export default PrimaryButton