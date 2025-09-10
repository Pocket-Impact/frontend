import React from "react";
import { VscFeedback } from "react-icons/vsc";
import { formatDistanceToNow } from "date-fns";
import FeedbackDetails from "./FeedbackDetails";
import PropTypes from 'prop-types';

const FeedbackCard = ({ feedback }) => {
  const [open, setOpen] = React.useState(false);

  const getSentimentStyles = (sentiment) => {
    if (!sentiment) return "bg-slate-100 text-slate-500";
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "bg-emerald-100 text-emerald-700";
      case "negative":
        return "bg-red-100 text-red-700";
      case "neutral":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-500";
    }
  };

  return (
    <>
      <FeedbackDetails
        feedback={feedback}
        open={open}
        close={() => setOpen(false)}
      />
      <div
        onClick={() => setOpen(!open)}
        className="shadow-md inter cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1 rounded-2xl p-6 group"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3 items-center">
            <div className="bg-slate-900 p-3 rounded-xl text-white group-hover:bg-slate-800 transition-colors">
              <VscFeedback className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 uppercase tracking-wide text-sm">
                {feedback.category}
              </div>
              <div className="text-slate-500 text-sm">
                {feedback.createdAt
                  ? formatDistanceToNow(new Date(feedback.createdAt), {
                    addSuffix: true,
                  })
                  : "Recent"}
              </div>
            </div>
          </div>

          <div
            className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getSentimentStyles(
              feedback.sentiment
            )}`}
          >
            {feedback.sentiment || "Analyzing..."}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed line-clamp-3">
            {feedback.message}
          </p>

          {/* Metadata */}
          <div className="flex justify-between items-center pt-2">
            <div className="text-sm text-slate-500">
              {feedback.user?.name || "Anonymous"}
            </div>
            <div className="text-sm text-slate-400 group-hover:text-slate-600 transition-colors flex items-center gap-2">
              <div className="w-2 h-2 bg-slate-300 rounded-full group-hover:bg-slate-400 transition-colors"></div>
              Click to expand
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

FeedbackCard.propTypes = {
  feedback: PropTypes.object.isRequired,
};

export default FeedbackCard;
