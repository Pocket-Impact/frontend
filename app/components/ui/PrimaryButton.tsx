import React from 'react'

const PrimaryButton: React.FC<{ text?: string, styles?: string, type?: "button" | "submit" | "reset", icon?: any, onClick?: () => void }> = ({ text, styles, type, icon, onClick }) => {
    return (
        <button type={type} className={`bg-primary cursor-pointer transition duration-300 h-max text-white rounded-full inter ${styles}`} onClick={onClick}>
            <span className='text'>{text}{icon}</span>
        </button>
    )
}

export default PrimaryButton