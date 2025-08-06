import React from 'react'

const PrimaryButton: React.FC<{ text?: string, styles?: string, icon?: any, onClick?: () => void }> = ({ text, styles, icon, onClick }) => {
    return (
        <div className={`bg-primary cursor-pointer transition duration-300 h-max text-white rounded-full inter ${styles}`} onClick={onClick}>
            <span className='text'>{text}{icon}</span>
        </div>
    )
}

export default PrimaryButton