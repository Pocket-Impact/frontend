"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import QuestionCard, { Question, QuestionType } from "@/components/surveys/QuestionCard";
import PreviewPane from "@/components/surveys/PreviewPane";
import PrimaryButton from "../ui/PrimaryButton";

export default function FormBuilder() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [active, setActive] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [nextId, setNextId] = useState(1);

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

    return (
        <div className="grid grid-cols-5 max-lg:grid-cols-1 gap-4 flex-2">
            {/* ===== Builder Section ===== */}
            <div className="flex-1 lg:col-span-2">
                <h2 className="font-bold mb-4 x3l text-primary">Survey Builder</h2>
                <input
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                    placeholder="Survey Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    className="w-full p-2 mb-2 h-max outline-0 focus:border-primary border border-gray-300 rounded"
                    placeholder="Survey Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <label className="flex items-center gap-2 mb-4">
                    <input
                        type="checkbox"
                        checked={active}
                        onChange={e => setActive(e.target.checked)}
                    />
                    <span>Survey Activation</span>
                </label>
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
            </div>
            {/* ===== Preview Section ===== */}
            <PreviewPane
                title={title}
                description={description}
                active={active}
                questions={questions}
            />
        </div>
    );
}