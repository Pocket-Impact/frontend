"use client";
import React, { useState } from "react";
import { useAlertStore } from "@/stores/alertStore";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import QuestionCard, {
  Question,
  QuestionType,
} from "@/components/surveys/QuestionCard";
import PreviewPane from "@/components/surveys/PreviewPane";
import PrimaryButton from "../ui/PrimaryButton";
import { FaRegSave } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RxCaretLeft } from "react-icons/rx";
import Link from "next/link";
import SecondaryButton from "../ui/SecondaryButton";
import { FiSend, FiPlus, FiEye, FiEdit } from "react-icons/fi";
import SendSurvey from "../feedback/surveys/SendSurvey";
import { VscFeedback } from "react-icons/vsc";
import useFetch from '@/hooks/useFetch';

import PropTypes from 'prop-types';
export default function FormBuilder({
  edit,
  initialId,
  uniqueLink,
  initialTitle = "",
  initialDescription = "",
  initialQuestions = [],
  onSave,
  loading: externalLoading,
  error: externalError,
  success: externalSuccess,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [active, setActive] = useState(false);
  const [questions, setQuestions] = useState(initialQuestions);
  const [nextId, setNextId] = useState(
    initialQuestions.length > 0
      ? Math.max(...initialQuestions.map((q) => q.id)) + 1
      : 1
  );
  const router = useRouter();
  const { setMessage, clearMessage } = useAlertStore((state) => state);

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

  const updateQuestion = (id, updated) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updated } : q))
    );
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const reorderQuestions = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(questions);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setQuestions(reordered);
  };

  const prepareSurveyPayload = () => ({
    title,
    description,
    questions: questions.map((q) => ({
      questionText: q.label,
      type: q.type === "multiple" ? "choice" : q.type,
      ...(q.type === "multiple"
        ? { options: q.options?.filter((opt) => opt.trim() !== "") }
        : {}),
    })),
  });

  // Only used for standalone create mode
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [sendSurvey, setSendSurvey] = useState(false);

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
      try {
        const payload = prepareSurveyPayload();
        const response = await fetch("/api/surveys", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create survey.');
        }
        setSuccess(true);
        setMessage("Survey created successfully!");
        setTimeout(() => {
          clearMessage();
        }, 3000);
        router.push("/feedback/surveys");
      } catch (err) {
        setError(err.message || "Failed to create survey.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className="h-full flex flex-col gap-8" aria-label="Survey form builder">
      {edit && (
        <SendSurvey
          uniqueLink={uniqueLink}
          open={sendSurvey}
          close={setSendSurvey}
          link={initialId}
        />
      )}

      {/* Header */}
      <header className="bg-white rounded-2xl p-6 shadow-sm" aria-label="Survey builder header">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Link
              href="/feedback/surveys"
              className="flex items-center gap-2 hover:gap-3 transition-all cursor-pointer duration-300"
            >
              <div className="bg-slate-900 hover:bg-slate-800 transition duration-300 text-white rounded-xl p-2">
                <RxCaretLeft className="w-6 h-6" />
              </div>
              <span className="text-slate-600 font-medium">
                Back to Surveys
              </span>
            </Link>
          </div>

          <div className="flex gap-3 items-center">
            {edit && (
              <div className="flex gap-2 items-center">
                <Link
                  href={`/feedback/surveys/${initialId}/responses`}
                  prefetch
                >
                  <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl transition-all duration-300 font-medium" aria-label="View responses">
                    <VscFeedback className="text-lg" />
                    <span className="max-md:hidden">View Responses</span>
                  </button>
                </Link>
                <button
                  onClick={() => setSendSurvey(true)}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-xl transition-all duration-300 font-medium"
                  aria-label="Send survey"
                >
                  <FiSend className="text-lg" />
                  <span className="max-md:hidden">Send Survey</span>
                </button>
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={externalLoading || loading}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-4 py-3 rounded-xl transition-all duration-300 font-medium"
              aria-label="Save survey"
            >
              <FaRegSave className="text-lg" />
              <span className="max-md:hidden">
                {externalLoading || loading ? "Saving..." : "Save Survey"}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-5 flex-1 h-full min-h-0 max-lg:grid-cols-1 gap-6">
        {/* Builder Section */}
        <section className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm overflow-y-auto" aria-label="Survey editor">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-slate-100 rounded-xl">
                <FiEdit className="text-xl text-slate-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Survey Editor
                </h2>
                <p className="text-slate-600 text-sm">
                  Build and customize your survey
                </p>
              </div>
            </div>
          </div>

          {/* Survey Details */}
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-2">
                Survey Details
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Basic information about your survey
              </p>

              <div className="space-y-4">
                <input
                  className="w-full p-3 bg-white rounded-xl focus:ring-2 focus:ring-slate-200 outline-none transition-all"
                  placeholder="Enter survey title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  aria-label="Survey title"
                />
                <textarea
                  className="w-full p-3 bg-white rounded-xl focus:ring-2 focus:ring-slate-200 outline-none transition-all resize-none"
                  placeholder="Describe your survey..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  aria-label="Survey description"
                />
              </div>
            </div>

            {/* Questions Section */}
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-slate-900">Questions</h3>
                  <p className="text-sm text-slate-600">
                    Add and organize your questions
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-slate-200 px-3 py-1.5 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">
                    {questions.length}
                  </span>
                  <span className="text-xs text-slate-500">questions</span>
                </div>
              </div>

              <DragDropContext onDragEnd={reorderQuestions}>
                <Droppable droppableId="questions">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-4 mb-4"
                    >
                      {questions.map((q, idx) => (
                        <Draggable
                          key={q.id}
                          draggableId={q.id.toString()}
                          index={idx}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="bg-white rounded-xl"
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

              <button
                onClick={addQuestion}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl transition-all duration-300 font-medium"
                aria-label="Add question"
              >
                <FiPlus className="text-lg" />
                Add Question
              </button>
            </div>

            {/* Error Display */}
            {(externalError || error) && (
              <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex-shrink-0"></div>
                  <p className="text-red-700 font-medium">
                    {externalError || error}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Preview Section */}
        <section className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm" aria-label="Live preview">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-100 rounded-xl">
              <FiEye className="text-xl text-slate-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Live Preview</h2>
              <p className="text-slate-600 text-sm">
                See how your survey will look
              </p>
            </div>
          </div>

          <div className="rounded-2xl p-6 h-full overflow-y-auto">
            <PreviewPane
              title={title}
              description={description}
              active={active}
              questions={questions}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

FormBuilder.propTypes = {
  edit: PropTypes.bool,
  initialId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  uniqueLink: PropTypes.string,
  initialTitle: PropTypes.string,
  initialDescription: PropTypes.string,
  initialQuestions: PropTypes.array,
  onSave: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.bool,
};
