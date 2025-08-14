import React from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import { tools } from '@/lib/tools'
import Tool from '@/components/root/Tool'

const ToolsSection = () => {
    return (
        <div className='py-16 px-28 max-lg:px-20 max-md:px-12 max-sm:px-4 flex flex-col gap-10 inter'>
            {tools.map((tool, index) => (
                <Tool tool={tool} index={index} key={tool.name} />
            ))}
        </div>
    )
}

export default ToolsSection