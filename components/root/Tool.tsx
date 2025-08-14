import React from 'react'
import { IoMdCheckmark } from 'react-icons/io'

const Tool = ({ tool, index }: any) => {
    return (
        <div key={tool.name} className='flex gap-20 max-lg:gap-10 max-w-6xl max-md:flex-col w-full items-center justify-center'>
            <div className={`bg-primary/7 ${index % 2 == 0 ? "bg-primary/20" : "order-1 bg-secondary/20"}  min-h-[400px] min-w-[400px] w-full rounded-3xl`}>
                <span className='opacity-0'>a</span>
            </div>
            <div className='w-full'>
                <div className='w-full'>
                    <h2 className='font-bold x2l'>{tool.name}</h2>
                    <p className='base text-black/60'>{tool.description}</p>
                </div>
                <div className='mt-3'>
                    <h2 className='font-semibold xl'>Features</h2>
                    {tool.points.map((point: string, idx: number) => (
                        <div key={idx} className='flex flex-col mt-2'>
                            <div className='flex items-center gap-2'>
                                <IoMdCheckmark className='text-primary w-6 border border-stroke h-auto sm bg-white rounded-lg p-1' />
                                <span>{point}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tool