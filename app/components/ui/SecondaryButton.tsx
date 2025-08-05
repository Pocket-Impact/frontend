import React from 'react'

const SecondaryButton: React.FC<{ text: string, styles: string }> = ({ text, styles }) => {
    return (
        <div className={`bg-secondary cursor-pointer h-max rounded-full inter ${styles}`}>
            <span className='text'>{text}</span>
        </div>
    )
}

export default SecondaryButton