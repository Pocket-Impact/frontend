import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'

const SecondaryButton = ({ text, styles, type, textStyles, icon, onClick, isLoading }) => {
    return (
        <button type={type} disabled={isLoading} className={`bg-secondary ${isLoading ? `${icon ? "" : ""} opacity-80 text-center cursor-not-allowed` : `${icon ? "" : ""} cursor-pointer`} transition duration-300 h-max text-black rounded-full inter ${styles}`} onClick={onClick}>
            {!isLoading ?
                (
                    <div className='flex items-center gap-2 max-md:gap-1.5'>
                        {icon && <span className='w-4 h-auto max-lg:w-3.5 max-md:w-3'>{icon}</span>}
                        {text && <span className={`text ${textStyles}`}>{text}</span>}
                    </div>
                )
                :
                (<div className='flex items-center'>
                    <span className={`text ${textStyles}`}>{text}</span>
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

export default SecondaryButton