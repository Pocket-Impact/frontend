import React from "react";
import { Question } from "./QuestionCard";
import PrimaryButton from "../ui/PrimaryButton";

type Props = {
    title: string;
    description: string;
    active: boolean;
    questions: Question[];
};

export default function PreviewPane({ title, description, active, questions }: Props) {
    return (
        <div className="bg-white scrolly h-[560px] overflow-y-scroll overflow-clip border border-stroke text-start p-6">
            <div className="flex justify-between">
            <h3 className="text-xl font-medium mb-2 text-primary">Preview</h3>
                {/* Survey status logic if needed */}
                {/* <div className="mb-2">
                    <span className={`px-2 py-1 rounded ${active ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                        {active ? "Active" : "Inactive"}
                    </span>
                </div> */}
            </div>
            {title && <h4 className="text-xl font-bold">{title}</h4>}
            {description && <p className="mb-4 text-gray-700">{description}</p>}
            <form className="space-y-6">
                {questions.map((q, index) => (
                    <div key={q.id} className="mb-4">
                        <label className="block font-semibold mb-2">{q.label}</label>
                        {q.type === "text" && (
                            <input type="text" className="w-full p-2 border bg-white border-gray-300 outline-0 focus:border-primary rounded" placeholder={`Answer ${(index + 1).toString().padStart(2, '0')}`} />
                        )}
                        {q.type === "multiple" && (
                            q.options?.map((opt, idx) => (
                                <div key={idx} className="flex items-center gap-2 mb-2">
                                    <input
                                        type="radio"
                                        id={`q${q.id}_option_${idx}`}
                                        name={`q${q.id}`}
                                        value={opt}
                                        className="hidden peer"
                                    />
                                    <label
                                        htmlFor={`q${q.id}_option_${idx}`}
                                        className="cursor-pointer p-2 px-3 rounded border border-gray-300 w-full bg-white transition-colors peer-checked:bg-primary/50 peer-checked:text-white peer-checked:border-primary/50"
                                    >
                                        {opt}
                                    </label>
                                </div>
                            ))
                        )}
                        {q.type === "rating" && (
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(num => (
                                    <div key={num} className="items-center">
                                        <input
                                            type="radio"
                                            id={`q${q.id}_rating_${num}`}
                                            name={`q${q.id}`}
                                            value={num}
                                            className="hidden peer"
                                        />
                                        <label
                                            htmlFor={`q${q.id}_rating_${num}`}
                                            className="cursor-pointer w-12 h-12 flex items-center justify-center rounded-lg border border-gray-300 bg-white transition-colors peer-checked:bg-primary/50 peer-checked:text-white peer-checked:border-primary"
                                        >
                                            {num}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {questions.length === 0 && (
                    <p className="text-gray-500">No questions available for preview.</p>
                )}
                {questions.length > 0 && (
                    <PrimaryButton text="Submit answer" styles="p-3 px-4 rounded-xl bg-primary text-white hover:bg-primary-dark transition" />
                )}
            </form>
        </div>
    );
}