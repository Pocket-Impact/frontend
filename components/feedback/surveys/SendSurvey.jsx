"use client";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useAlertStore } from "@/stores/alertStore";
import { apiFetch } from "@/utils/apiFetch";
import React, { useState } from "react";
import Papa from "papaparse";
import { FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { BiCopy } from "react-icons/bi";

const SendSurvey = ({ open, close, link, uniqueLink }) => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState(null);
  const { setMessage, clearMessage } = useAlertStore((state) => state);
  const [loading, setLoading] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [copied, setCopied] = useState(false);

  const addEmail = () => {
    let newError = "";

    if (email.length == 0) {
      newError = "Required";
    } else if (!email.trim().includes("@") || !email.trim().includes(".")) {
      newError = 'Email should include "@" and "."';
    } else {
      setEmails([...emails, email]);
      setEmail("");
    }

    setError(newError);
  };

  const sendSurvey = async () => {
    setError(null);

    if (!error) {
      setLoading(true);
      try {
        const response = await apiFetch("/api/surveys/send-survey-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ surveyId: link, emails }),
        });

        if (response.ok) {
          setEmails([]);
          setEmail("");
          setError(null);
          close(false);
          setMessage("Successfully sent the surveys");
          setTimeout(() => {
            clearMessage();
          }, 3000);
        } else {
          const data = await response.json();
          setError(data.message || "Failed to send survey");
          console.log(data);
        }
      } catch (err) {
        setError("Network error");
      }
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (link) {
      navigator.clipboard.writeText(
        `${window.location.origin}/surveys/unique/${uniqueLink}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleClose = () => {
    setEmails([]);
    close(false);
    setEmail("");
    setError(null);
  };

  return (
    <div
      className={`${open ? "fixed" : "hidden"
        } inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4 z-50`}
    >
      <div className="w-full max-w-2xl">
        {/* Close Button */}
        <div className="flex justify-end mb-3">
          <button
            className="bg-white/90 hover:bg-white shadow-sm rounded-full p-2 transition-all duration-200 hover:shadow-md"
            onClick={handleClose}
          >
            <IoClose className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Main Modal */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-slate-50 px-6 py-5">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-slate-800">
                Send Survey
              </h1>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${copied
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                onClick={handleCopy}
                type="button"
              >
                <BiCopy className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {copied ? "Copied!" : "Copy Link"}
                </span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Email Input Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                Add email addresses
              </label>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
                  {error}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addEmail();
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={`flex-1 px-4 py-3 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:outline-none transition-all duration-200 ${error
                    ? "focus:ring-red-500/20 bg-red-50"
                    : "focus:ring-blue-500/20"
                    }`}
                  placeholder="e.g. john@example.com"
                />
                <button
                  type="button"
                  onClick={addEmail}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors duration-200"
                >
                  Add
                </button>
              </form>
            </div>

            {/* CSV Upload Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                Or upload CSV file
              </label>
              <div className="relative">
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setCsvFile(file || null);
                    if (!file) return;
                    Papa.parse(file, {
                      header: false,
                      skipEmptyLines: true,
                      complete: (results) => {
                        const allEmails = results.data
                          .flat()
                          .filter(
                            (val) =>
                              val.includes("@") && val.includes(".")
                          );
                        setEmails((prev) =>
                          Array.from(new Set([...prev, ...allEmails]))
                        );
                      },
                    });
                  }}
                />
                <label
                  htmlFor="csv-upload"
                  className="flex items-center gap-3 cursor-pointer p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200"
                >
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <FiUpload className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-slate-700">
                    {csvFile ? csvFile.name : "Choose CSV file"}
                  </span>
                </label>
              </div>
            </div>

            {/* Email Tags */}
            {emails.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">
                    Recipients ({emails.length})
                  </label>
                  <button
                    onClick={() => setEmails([])}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-3 bg-slate-50 rounded-xl">
                  {emails.map((email, index) => (
                    <span
                      key={index}
                      className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm flex items-center gap-2 group"
                    >
                      {email}
                      <button
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-0.5 opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={() =>
                          setEmails(emails.filter((_, i) => i !== index))
                        }
                      >
                        <IoClose className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Send Button */}
            {emails.length > 0 && (
              <div className="pt-2">
                <button
                  onClick={sendSurvey}
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${loading
                    ? "bg-blue-400 text-white cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md"
                    }`}
                >
                  {loading
                    ? "Sending..."
                    : `Send Survey to ${emails.length} recipient${emails.length > 1 ? "s" : ""
                    }`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendSurvey;
