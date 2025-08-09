import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'

const PrimaryButton: React.FC<{ text?: string, styles?: string, isLoading?: boolean, type?: "button" | "submit" | "reset", icon?: any, onClick?: () => void }> = ({ text, styles, type, icon, onClick, isLoading }) => {
    return (
        <button type={type} disabled={isLoading} className={`bg-primary ${isLoading ? "px-2 opacity-80 text-center cursor-not-allowed" : "px-6 cursor-pointer"} transition duration-300 h-max text-white rounded-full inter ${styles}`} onClick={onClick}>
            {!isLoading ?
                (<span className='text'>{text}{icon}</span>)
                :
                (<div className='flex items-center'>
                    {isLoading &&
                        <DotLottieReact
                            src="/animations/loading.lottie"
                            loop
                            autoplay
                            className="w-10" // only set width, remove height
                            style={{ height: "auto" }} // ensures proportions stay correct
                        />
                    }
                </div>)
            }
        </button>
    )
}

export default PrimaryButton