import React from "react";
import { IoMdRemove } from "react-icons/io";
import PrimaryButton from "../ui/PrimaryButton";
import { MdDragIndicator } from "react-icons/md";

export type QuestionType = "text" | "multiple" | "rating";
export type Question = {
    id: number;
    type: QuestionType;
    label: string;
    options?: string[];
};

type Props = {
    question: Question;
    onUpdate: (id: number, updated: Partial<Question>) => void;
    onRemove: (id: number) => void;
    dragHandleProps?: any;
    index: number
};

const typeOptions = [
    { value: "text", label: "Text Input" },
    { value: "multiple", label: "Multiple Choice" },
    { value: "rating", label: "Rating Scale (1-5)" },
];

export default function QuestionCard({ question, onUpdate, onRemove, dragHandleProps, index }: Props) {
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    return (
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 relative">
            <div className="flex items-center justify-between mb-4">
                <button
                    title="Remove question"
                    type="button"
                    className="flex items-center justify-center gap-2 bg-gray-400 hover:bg-gray-600 transition duration-300 cursor-pointer p-2.5 text-white rounded-sm"
                    onClick={() => onRemove(question.id)}
                >
                    <IoMdRemove />
                </button>
                <div title="Drag question" className="bg-primary p-2 text-lg rounded-lg text-white" {...dragHandleProps}><MdDragIndicator className="cursor-move" /></div>
            </div>
            <input
                type="text"
                className="w-full p-2 mb-2 outline-none border border-stroke focus:border-primary rounded"
                placeholder="Question label"
                value={question.label}
                onChange={e => onUpdate(question.id, { label: e.target.value })}
            />
            {/* Custom Dropdown for Question Type */}
            <div className="relative">
                <div
                    className="p-2 border border-gray-300 rounded cursor-pointer bg-white flex items-center justify-between"
                    onClick={() => setDropdownOpen((open) => !open)}
                >
                    <span>{typeOptions.find(opt => opt.value === question.type)?.label}</span>
                    <svg className={`w-4 h-4 ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </div>
                {dropdownOpen && (
                    <div className="absolute left-0 right-0 z-10 bg-white border rounded-md border-stroke overflow-hidden shadow mt-1">
                        {typeOptions.map(opt => (
                            <div
                                key={opt.value}
                                className={`p-2 cursor-pointer ${question.type === opt.value ? 'bg-primary/40' : 'hover:bg-gray-100'}`}
                                onClick={() => {
                                    setDropdownOpen(false);
                                    onUpdate(question.id, {
                                        type: opt.value as QuestionType,
                                        options: opt.value === "multiple" ? [""] : undefined,
                                    });
                                }}
                            >
                                {opt.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {question.type === "multiple" && (
                <div>
                    <h4 className="font-semibold my-2">Options</h4>
                    <div className="flex flex-col gap-2">
                        {question.options?.map((opt, idx) => (
                            <div key={idx} className="flex items-center h-10.5 gap-2">
                                <input
                                    type="text"
                                    className="p-2 h-full outline-none border border-stroke focus:border-primary rounded w-full"
                                    placeholder={`Option ${idx + 1}`}
                                    value={opt}
                                    onChange={e => {
                                        const newOptions = [...(question.options ?? [])];
                                        newOptions[idx] = e.target.value;
                                        onUpdate(question.id, { options: newOptions });
                                    }}
                                />
                                <button
                                    title="Remove option"
                                    type="button"
                                    className="text-white h-full px-3.5 bg-gray-400 cursor-pointer duration-300 transition hover:bg-gray-600 rounded"
                                    onClick={() => {
                                        const newOptions = (question.options ?? []).filter((_, i) => i !== idx);
                                        onUpdate(question.id, { options: newOptions });
                                    }}
                                >
                                    <IoMdRemove />
                                </button>
                            </div>
                        ))}
                    </div>
                    <PrimaryButton
                        text="Add Option"
                        type="button"
                        styles="bg-primary mt-2.5 rounded-sm flex justify-center text-white w-full p-2 rounded hover:bg-primary-dark transition"
                        onClick={() => onUpdate(question.id, { options: [...(question.options ?? []), ""] })}
                    />
                </div>
            )}
        </div>
    );
}