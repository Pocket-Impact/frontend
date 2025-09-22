"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { apiFetch } from "@/utils/apiFetch";
import { useAlertStore } from "@/stores/alertStore";
import logo from "@/public/img/white.svg";

const FeedbackForm = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setMessage, clearMessage } = useAlertStore();
  const router = useRouter();

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const res = await apiFetch(`/api/surveys/unique/${id}`);
        if (res.ok) {
          const data = await res.json();
          setSurvey(data.data.survey);
          setPageLoading(false);
        } else {
          const json = await res.json();
          setError(json.message || "Failed to load survey");
          setPageLoading(false);
        }
      } catch (err) {
        setError("Network error. Please try again.");
        setPageLoading(false);
      }
    };
    fetchSurvey();
  }, [id]);

  const preparePayload = () => {
    const responses = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));
    return { surveyId: survey._id, responses };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = preparePayload();
      if (payload.responses.length === 0) {
        setError("No answers provided.");
        setLoading(false);
        return;
      }
      const res = await apiFetch("/api/responses", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Failed to submit feedback.");
      } else {
        setAnswers({});
        setMessage("Feedback submitted successfully.");
        setTimeout(() => {
          clearMessage();
          router.replace("/surveys");
        }, 3000);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <DotLottieReact src="./loading.lottie" loop autoplay />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="lg:max-w-6xl 2xl:max-w-[1300px] w-full lg:h-[600px] max-md:h-full border-stroke md:border inter flex flex-col items-start">
      <div className="grid lg:grid-cols-5 w-full h-full min-h-0 items-stretch">
        <div className="lg:col-span-2 bg-primary w-full min-w-full h-full min-h-0 flex flex-col gap-6 max-h-full overflow-y-auto p-6">
          <div className="flex items-center gap-4 max-md:gap-2">
            <Image
              src={logo}
              alt="Pocket Impact Logo"
              width={40}
              height={40}
              className="w-8 h-8"
            />
            <span className="bricolage lg text-white">Pocket Impact</span>
          </div>
          <div className="flex justify-between">
            <h3 className="x2l font-semibold text-white bricolage">
              Survey form
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="lg font-bold text-white">{survey.title}</h4>
            <p className="sm text-white/80 font-light">{survey.description}</p>
          </div>
        </div>
        <form
          className="lg:col-span-3 scrolly p-6 h-full flex flex-col max-h-full overflow-y-auto"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="mb-4 bg-orange-100 border-orange-400 border p-3 op-2 base rounded-lg text-red-500 font-medium">
              {error}
            </div>
          )}
          {survey.questions.map((question) => (
            <div key={question._id} className="mb-4">
              <label className="block base font-semibold mb-2">
                {question.questionText}
              </label>
              {question.type === "text" && (
                <textarea
                  className="w-full base p-2 border bg-white border-gray-300 outline-0 focus:border-primary rounded"
                  placeholder="Answer 01"
                  onChange={(e) =>
                    setAnswers({ ...answers, [question._id]: e.target.value })
                  }
                />
              )}
              {question.type === "choice" &&
                question.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex base w-full items-center gap-2 mb-2"
                  >
                    <input
                      type="radio"
                      id={`qq${question._id}_option_${index}`}
                      name={`qq${question._id}`}
                      value={option}
                      className="hidden peer"
                      onChange={() =>
                        setAnswers({ ...answers, [question._id]: option })
                      }
                    />
                    <label
                      htmlFor={`qq${question._id}_option_${index}`}
                      className="cursor-pointer w-full p-2 px-3 rounded border border-gray-300 bg-white transition-colors peer-checked:bg-primary/50 peer-checked:text-white peer-checked:border-primary/50"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              {question.type === "rating" && (
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <div key={rating} className="base items-center">
                      <input
                        type="radio"
                        id={`qq${question._id}_rating_${rating}`}
                        name={`qq${question._id}`}
                        value={rating}
                        className="hidden peer"
                        onChange={() =>
                          setAnswers({ ...answers, [question._id]: rating })
                        }
                      />
                      <label
                        htmlFor={`qq${question._id}_rating_${rating}`}
                        className="cursor-pointer w-12 h-12 max-md:h-8 max-md:w-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white transition-colors peer-checked:bg-primary/50 peer-checked:text-white peer-checked:border-primary"
                      >
                        {rating}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-primary cursor-pointer transition duration-300 h-max text-white rounded-lg inter p-3 px-4 base hover:bg-primary-dark"
            disabled={loading}
          >
            <div className="flex items-center gap-2 max-md:gap-1.5">
              <span className="text undefined">
                {loading ? "Submitting..." : "Submit answer"}
              </span>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
