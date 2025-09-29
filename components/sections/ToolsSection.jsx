import { IoMdCheckmark } from 'react-icons/io'
import { tools } from '@/lib/tools'
import Tool from '@/components/root/Tool'

const ToolsSection = () => {
    return (
        <section className='py-16 max-w-6xl m-auto flex flex-col gap-10 inter' aria-label="Tools section">
            {tools.map((tool, index) => (
                <Tool tool={tool} index={index} key={tool.name} />
            ))}
        </section>
    )
}

export default ToolsSection

import PropTypes from 'prop-types';
ToolsSection.propTypes = {};