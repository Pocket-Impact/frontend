import React from "react";
import { Question } from "./QuestionCard";
import PrimaryButton from "../ui/PrimaryButton";

type Props = {
  title: string;
  description: string;
  active: boolean;
  questions: Question[];
};

export default function PreviewPane({
  title,
  description,
  active,
  questions,
}: Props) {
  return (
    <div className="bg-slate-50s h-full min-h-0 overflow-y-auto text-start p-6 flex flex-col">
      {/* Header Section */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-semibold text-slate-800">Preview</h3>
          {/* Survey status logic if needed */}
          {/* <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                        {active ? "Active" : "Inactive"}
                    </div> */}
        </div>
        {title && (
          <h4 className="text-xl font-bold text-slate-900 mb-3">{title}</h4>
        )}
        {description && (
          <p className="text-slate-600 leading-relaxed">{description}</p>
        )}
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <form className="space-y-8">
          {questions.map((q, index) => (
            <div key={q.id} className="space-y-4">
              <label className="block text-lg font-semibold text-slate-800">
                {q.label}
              </label>

              {/* Text Input */}
              {q.type === "text" && (
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                  placeholder={`Answer ${(index + 1)
                    .toString()
                    .padStart(2, "0")}`}
                />
              )}

              {/* Multiple Choice */}
              {q.type === "multiple" && (
                <div className="space-y-3">
                  {q.options?.map((opt, idx) => (
                    <div key={idx} className="relative">
                      <input
                        type="radio"
                        id={`q${q.id}_option_${idx}`}
                        name={`q${q.id}`}
                        value={opt}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={`q${q.id}_option_${idx}`}
                        className="cursor-pointer block p-4 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all duration-200 peer-checked:bg-blue-500 peer-checked:text-white peer-checked:shadow-md"
                      >
                        {opt}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {/* Rating Scale */}
              {q.type === "rating" && (
                <div className="flex gap-3 flex-wrap">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="relative">
                      <input
                        type="radio"
                        id={`q${q.id}_rating_${num}`}
                        name={`q${q.id}`}
                        value={num}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={`q${q.id}_rating_${num}`}
                        className="cursor-pointer w-14 h-14 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 font-semibold hover:bg-slate-200 transition-all duration-200 peer-checked:bg-blue-500 peer-checked:text-white peer-checked:shadow-md peer-checked:scale-105"
                      >
                        {num}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Empty State */}
          {questions.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-slate-500 text-lg">
                No questions available for preview.
              </p>
            </div>
          )}

          {/* Submit Button */}
          {questions.length > 0 && (
            <div className="pt-4">
              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md">
                Submit Answer
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
