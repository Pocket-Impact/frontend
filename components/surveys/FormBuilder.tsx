"use client";
import React, { useState } from "react";
import { useAlertStore } from "@/stores/alertStore";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import QuestionCard, { Question, QuestionType } from "@/components/surveys/QuestionCard";
import PreviewPane from "@/components/surveys/PreviewPane";
import PrimaryButton from "../ui/PrimaryButton";
import { apiFetch } from "@/utils/apiFetch";
import { FaRegSave } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RxCaretLeft } from "react-icons/rx";
import Link from "next/link";

type FormBuilderProps = {
    initialTitle?: string;
    initialDescription?: string;
    initialQuestions?: Question[];
    onSave?: (data: { title: string; description: string; questions: Question[] }) => Promise<void> | void;
    loading?: boolean;
    error?: string | null;
    success?: boolean;
};

export default function FormBuilder({
    initialTitle = "",
    initialDescription = "",
    initialQuestions = [],
    onSave,
    loading: externalLoading,
    error: externalError,
    success: externalSuccess,
}: FormBuilderProps) {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [active, setActive] = useState(false);
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    const [nextId, setNextId] = useState(
        initialQuestions.length > 0 ? Math.max(...initialQuestions.map(q => q.id)) + 1 : 1
    );
    const router = useRouter();
    const { setMessage, clearMessage } = useAlertStore(state => state);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                id: nextId,
                type: "text",
                label: "",
                options: [""],
            },
        ]);
        setNextId(nextId + 1);
    };

    const updateQuestion = (id: number, updated: Partial<Question>) => {
        setQuestions(questions.map(q => (q.id === id ? { ...q, ...updated } : q)));
    };

    const removeQuestion = (id: number) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const reorderQuestions = (result: DropResult) => {
        if (!result.destination) return;
        const reordered = Array.from(questions);
        const [removed] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, removed);
        setQuestions(reordered);
    };

    const prepareSurveyPayload = () => ({
        title,
        description,
        questions: questions.map(q => ({
            questionText: q.label,
            type: q.type === "multiple" ? "choice" : q.type,
            ...(q.type === "multiple" ? { options: q.options?.filter(opt => opt.trim() !== "") } : {})
        }))
    });


    // Only used for standalone create mode
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);


    const handleSubmit = async () => {
        if (onSave) {
            await onSave({ title, description, questions });
            setMessage("Changes saved successfully!");
            setTimeout(() => {
                clearMessage();
            }, 3000);
        } else {
            setLoading(true);
            setError(null);
            setSuccess(false);
            try {
                const payload = prepareSurveyPayload();
                const response = await apiFetch("/api/surveys", {
                    method: "POST",
                    body: JSON.stringify(payload),
                });
                setSuccess(true);
                setMessage("Survey created successfully!");
                setTimeout(() => {
                    clearMessage();
                }, 3000);
            } catch (err: any) {
                setError(err?.response?.data?.message || "Failed to create survey.");
            } finally {
                setLoading(false);
                router.push('/feedback/surveys');
            }
        }
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <Link href="/feedback/surveys" className='flex items-center gap-2 hover:gap-3 transition-all cursor-pointer mb-4 duration-300'>
                    <div className='bg-primary/80 hover:bg-primary transition duration-300 text-white rounded-lg w-max p-1'>
                        <RxCaretLeft className='w-6 h-auto' />
                    </div>
                    <span className='text-black/70 font-medium'>Back to Surveys</span>
                </Link>
                <PrimaryButton
                    text={(externalLoading ?? loading) ? "Saving..." : "Save"}
                    styles="text-white p-3 base rounded-xl bg-green-600 hover:bg-green-700 transition mb-4"
                    onClick={handleSubmit}
                    icon={<FaRegSave />}
                    isLoading={externalLoading ?? loading}
                />
            </div>
            <div className="grid grid-cols-5 max-lg:grid-cols-1 gap-4 flex-2">
                {/* Builder Section */}
                <div className="flex-1 lg:col-span-2 p-6 bg-white border border-stroke h-[560px] overflow-y-scroll scrolly">
                    <h2 className="text-xl font-medium mb-4 text-primary">Survey Editor</h2>
                    <input
                        className="w-full p-2 mb-2 border outline-0 bg-white border-stroke focus:border-primary rounded"
                        placeholder="Survey Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        className="w-full p-2 mb-2 h-max outline-0 bg-white focus:border-primary border border-gray-300 rounded"
                        placeholder="Survey Description"
                        rows={5}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    {/* Survey activity if needed */}
                    {/* <label className="flex items-center gap-2 mb-4">
                    <input
                    type="checkbox"
                    checked={active}
                        onChange={e => setActive(e.target.checked)}
                    />
                    <span>Survey Activation</span>
                </label> */}
                    <DragDropContext onDragEnd={reorderQuestions}>
                        <Droppable droppableId="questions">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {questions.map((q, idx) => (
                                        <Draggable key={q.id} draggableId={q.id.toString()} index={idx}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className="mb-4"
                                                >
                                                    <QuestionCard
                                                        question={q}
                                                        onUpdate={updateQuestion}
                                                        onRemove={removeQuestion}
                                                        dragHandleProps={provided.dragHandleProps}
                                                        index={idx}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <PrimaryButton
                        text="Add Question"
                        styles="text-white p-3 px-5 base rounded-xl hover:bg-primary-dark transition mb-4"
                        onClick={addQuestion}
                    />
                    {(externalError ?? error) && <div className="text-red-500 mb-2">{externalError ?? error}</div>}
                </div>
                <div className="lg:col-span-3 text-end">
                    <PreviewPane
                        title={title}
                        description={description}
                        active={active}
                        questions={questions}
                    />
                </div>
            </div>
        </>
    );
}