import React from 'react'

const PrimaryButton: React.FC<{ text?: string, styles?: string, icon?: any }> = ({ text, styles, icon }) => {
    return (
        <div className={`bg-primary effect cursor-pointer h-max text-white rounded-full inter ${styles}`}>
            <span className='text'>{text}{icon}</span>
        </div>
    )
}

export default PrimaryButton