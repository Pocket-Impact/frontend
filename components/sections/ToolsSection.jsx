import React from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import { tools } from '@/lib/tools'
import Tool from '@/components/root/Tool'

const ToolsSection = () => {
    return (
        <div className='py-16 max-w-6xl m-auto flex flex-col gap-10 inter'>
            {tools.map((tool, index) => (
                <Tool tool={tool} index={index} key={tool.name} />
            ))}
        </div>
    )
}

export default ToolsSection