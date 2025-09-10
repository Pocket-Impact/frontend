import React from 'react'

const PrimaryButton = ({ text, styles, type, textStyles, icon, onClick, isLoading }) => {
    return (
        <button type={type} disabled={isLoading} className={`bg-primary ${isLoading ? `${icon ? "" : ""} opacity-80 text-center cursor-not-allowed` : `${icon ? "" : ""} cursor-pointer`} transition duration-300 h-max text-white rounded-full inter ${styles}`} onClick={onClick}>
            {!isLoading ?
                (
                    <div className='flex items-center gap-2 max-md:gap-1.5'>
                        {icon && <span className='text'>{icon}</span>}
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

export default PrimaryButton

import PropTypes from 'prop-types';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

PrimaryButton.propTypes = {
    text: PropTypes.string,
    styles: PropTypes.string,
    type: PropTypes.string,
    textStyles: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func,
    isLoading: PropTypes.bool,
};
