import React from "react";
import { IoMdRemove, IoMdAddCircleOutline } from "react-icons/io";
import { MdDragIndicator } from "react-icons/md";
import { FiType, FiList, FiStar } from "react-icons/fi";

const typeOptions = [
  { value: "text", label: "Text Input", icon: <FiType /> },
  { value: "multiple", label: "Multiple Choice", icon: <FiList /> },
  { value: "rating", label: "Rating Scale (1-5)", icon: <FiStar /> },
];

import PropTypes from 'prop-types';
export default function QuestionCard({
  question,
  onUpdate,
  onRemove,
  dragHandleProps,
  index,
}) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const currentType = typeOptions.find((opt) => opt.value === question.type);

  return (
    <div className="rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative group" role="group" aria-label={`Survey question ${index + 1}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg">
            <span className="text-sm font-medium text-slate-700">
              Q{index + 1}
            </span>
          </div>
          <div
            className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-move text-slate-600 hover:text-slate-800 transition-colors"
            {...dragHandleProps}
            title="Drag to reorder"
          >
            <MdDragIndicator className="text-lg" />
          </div>
        </div>

        <button
          title="Remove question"
          type="button"
          className="p-2 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
          onClick={() => onRemove(question.id)}
          aria-label="Remove question"
        >
          <IoMdRemove className="text-lg" />
        </button>
      </div>

      {/* Question Input */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-4 bg-slate-50 rounded-xl focus:ring-2 focus:ring-slate-200 outline-none transition-all placeholder-slate-400 font-medium"
          placeholder="Enter your question here..."
          value={question.label}
          onChange={(e) => onUpdate(question.id, { label: e.target.value })}
          aria-label="Question text"
          aria-required="true"
        />
      </div>

      {/* Question Type Dropdown */}
      <div className="relative mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Question Type
        </label>
        <div
          className="p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors flex items-center justify-between"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          role="button"
          tabIndex={0}
          aria-label="Select question type"
          aria-expanded={dropdownOpen}
        >
          <div className="flex items-center gap-3">
            <div className="text-slate-600">{currentType?.icon}</div>
            <span className="font-medium text-slate-900">
              {currentType?.label}
            </span>
          </div>
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""
              }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {dropdownOpen && (
          <div className="absolute left-0 right-0 z-10 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden mt-2">
            {typeOptions.map((opt) => (
              <div
                key={opt.value}
                className={`p-3 cursor-pointer transition-colors flex items-center gap-3 ${question.type === opt.value
                  ? "bg-slate-900 text-white"
                  : "hover:bg-slate-50 text-slate-700"
                  }`}
                onClick={() => {
                  setDropdownOpen(false);
                  onUpdate(question.id, {
                    type: opt.value,
                    options: opt.value === "multiple" ? [""] : undefined,
                  });
                }}
              >
                <div
                  className={
                    question.type === opt.value
                      ? "text-white"
                      : "text-slate-600"
                  }
                >
                  {opt.icon}
                </div>
                <span className="font-medium">{opt.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Multiple Choice Options */}
      {question.type === "multiple" && (
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-900">Answer Options</h4>
            <div className="flex items-center gap-2 bg-slate-200 px-2 py-1 rounded-lg">
              <span className="text-xs font-medium text-slate-600">
                {question.options?.length || 0} options
              </span>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {question.options?.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-slate-500 min-w-0">
                  <div className="w-2 h-2 bg-slate-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm font-medium">{idx + 1}</span>
                </div>
                <input
                  type="text"
                  className="flex-1 p-3 bg-white rounded-lg focus:ring-2 focus:ring-slate-200 outline-none transition-all placeholder-slate-400"
                  placeholder={`Option ${idx + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...(question.options ?? [])];
                    newOptions[idx] = e.target.value;
                    onUpdate(question.id, { options: newOptions });
                  }}
                />
                {question.options && question.options.length > 1 && (
                  <button
                    title="Remove option"
                    type="button"
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                    onClick={() => {
                      const newOptions = (question.options ?? []).filter(
                        (_, i) => i !== idx
                      );
                      onUpdate(question.id, { options: newOptions });
                    }}
                    aria-label={`Remove option ${idx + 1}`}
                  >
                    <IoMdRemove />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all duration-300 font-medium"
            onClick={() =>
              onUpdate(question.id, {
                options: [...(question.options ?? []), ""],
              })
            }
            aria-label="Add answer option"
          >
            <IoMdAddCircleOutline className="text-lg" />
            Add Option
          </button>
        </div>
      )}

      {/* Rating Scale Preview */}
      {question.type === "rating" && (
        <div className="bg-slate-50 rounded-xl p-4">
          <h4 className="font-semibold text-slate-900 mb-3">
            Rating Scale Preview
          </h4>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <div key={rating} className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-medium text-slate-700 border border-slate-200">
                  {rating}
                </div>
                {rating === 1 && (
                  <span className="text-xs text-slate-500">Poor</span>
                )}
                {rating === 5 && (
                  <span className="text-xs text-slate-500">Great</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  dragHandleProps: PropTypes.object,
  index: PropTypes.number.isRequired,
};
