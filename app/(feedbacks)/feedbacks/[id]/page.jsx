"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { apiFetch } from "@/utils/apiFetch";
import { useAlertStore } from "@/stores/alertStore";

const categories = [
  "product",
  "ux",
  "support",
  "pricing",
  "features",
  "performance",
  "other",
];

export default function Page() {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const { setMessage: setAlertMessage } = useAlertStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setError("Category is required");
      return;
    }
    if (!message) {
      setError("Message is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await apiFetch(`/api/feedbacks/${id}`, {
        method: "POST",
        body: JSON.stringify({ category, message }),
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.message || "Server error");
      } else {
        setCategory("");
        setMessage("");
        setAlertMessage("Feedback submitted successfully!");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full bg-white max-md:h-full flex-1 min-h-0 h-max border-stroke border p-6 inter flex flex-col items-start">
      <div className="flex justify-between">
        <h3 className="x2l font-bold mb-4 text-primary">Feedback Form</h3>
      </div>
      <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="block base font-semibold mb-2 base">Category</label>
        <div className="relative bg-white p-3 border rounded-sm border-stroke flex items-center justify-between">
          <span>{category || "Select category"}</span>
          <div
            className="rounded-sm hover:bg-gray-200 cursor-pointer"
            onClick={() => setShowCategories(!showCategories)}
          >
            <svg
              data-testid="caret-down-icon" // Added data-testid
              className="transition-all duration-300 w-6 text-black/80 h-6"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 15 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="0"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div
            className={`absolute bg-white top-full mt-2 rounded-lg z-50 border border-gray-300 overflow-y-scroll clean max-h-52 w-full left-0 ${
              showCategories ? "block" : "hidden"
            }`}
          >
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setShowCategories(false);
                }}
                className="hover:bg-gray-200 pl-2 cursor-pointer h-10 flex items-center border-gray-300 border-b"
              >
                <span className="capitalize">{cat}</span>
              </div>
            ))}
          </div>
        </div>
        {error && <div className="text-red-500 base">{error}</div>}
        <div>
          <label className="block base font-semibold mb-2">Content</label>
          <textarea
            className="w-full base p-2 border bg-white border-gray-300 outline-0 focus:border-primary rounded"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-primary cursor-pointer transition duration-300 h-max text-white rounded-full inter p-3 px-4 base rounded-sm mt-2 bg-primary text-white hover:bg-primary-dark transition"
          >
            <div className="flex items-center gap-2 max-md:gap-1.5">
              <span className="text undefined">
                {loading ? "Submitting..." : "Submit answer"}
              </span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
