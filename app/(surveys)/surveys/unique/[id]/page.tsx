"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { apiFetch } from "@/utils/apiFetch";
import { useAlertStore } from "@/stores/alertStore";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const FeedbackForm = () => {
    const { id } = useParams();
    type SurveyQuestion = {
        id: number;
        questionText: string;
        type: string;
        options?: string[];
        _id?: string;
    };
    type SurveyType = {
        _id: string;
        title: string;
        description: string;
        questions: SurveyQuestion[];
    };
    const [survey, setSurvey] = useState<SurveyType | null>(null);

    useEffect(() => {
        const fetchSurvey = async () => {
            const res = await apiFetch(`/api/surveys/unique/${id}`);
            if (res.ok) {
                const data = await res.json();
                setSurvey(data.data.survey);
                setPageLoading(false);
            } else {
                const json = await res.json();
                console.log(json);
            }
        };
        fetchSurvey();
    }, []);
    const router = useRouter();

    const surveyId = survey?._id;


    const [answers, setAnswers] = useState<{ [key: string]: any }>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setMessage, clearMessage } = useAlertStore((state) => state);
    const [pageLoading, setPageLoading] = useState<boolean>(true);

    const handleChange = (qid: string, value: any) => {
        setAnswers((prev) => ({ ...prev, [qid]: value }));
    };


    const preparePayload = () => ({
        surveyId,
        responses: survey?.questions
            .map(q => ({
                questionId: q._id!,
                answer: answers[q._id!] !== undefined ? String(answers[q._id!]) : ""
            }))
            .filter(resp => resp.answer !== "")
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const payload = preparePayload();
            const res = await apiFetch("/api/responses", {
                method: "POST",
                body: JSON.stringify(payload),
            });

            const json = await res.json();
            if (!res.ok) {
                setError("Failed to submit feedback.");
                console.log(json);
            } else {
                setAnswers({});
                setMessage("Feedback submitted successfully.");
                setTimeout(() => {
                    clearMessage();
                }, 3000);
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) return <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/3 bg-primary/70 py-5 rounded-x2l w-max">
        <DotLottieReact
            src="/animations/loading.lottie"
            loop
            autoplay
            className="w-20"
            style={{ height: "auto" }}
        />
    </div>;

    return (
        <div className="max-w-xl w-full bg-white scrolly h-full max-md:h-screen overflow-y-scroll border-stroke border p-6 inter flex flex-col items-start">
            <div className="flex justify-between">
                <h3 className="x5l font-bold mb-8 text-primary">Survey Form</h3>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <h4 className="xl font-bold">{survey?.title}</h4>
            <p className="mb-4 text-gray-700 base">{survey?.description}</p>
            <form className="w-full" onSubmit={handleSubmit}>
                {survey?.questions.map((q, index) => (
                    <div key={q._id} className="mb-4">
                        <label className="block base font-semibold mb-2">{q.questionText}</label>
                        {q.type === "text" && (
                            <textarea
                                className="w-full base p-2 border bg-white border-gray-300 outline-0 focus:border-primary rounded"
                                placeholder={`Answer ${(index + 1).toString().padStart(2, "0")}`}
                                value={answers[q._id!] || ""}
                                onChange={(e) => handleChange(q._id!, e.target.value)}
                            />
                        )}
                        {q.type === "choice" && (
                            q.options?.map((opt, idx) => (
                                <div key={idx} className="flex base w-full items-center gap-2 mb-2">
                                    <input
                                        type="radio"
                                        id={`q${q._id}_option_${idx}`}
                                        name={`q${q._id}`}
                                        value={opt}
                                        checked={answers[q._id!] === opt}
                                        onChange={() => handleChange(q._id!, opt)}
                                        className="hidden peer"
                                    />
                                    <label
                                        htmlFor={`q${q._id}_option_${idx}`}
                                        className="cursor-pointer w-full p-2 px-3 rounded border border-gray-300 bg-white transition-colors peer-checked:bg-primary/50 peer-checked:text-white peer-checked:border-primary/50"
                                    >
                                        {opt}
                                    </label>
                                </div>
                            ))
                        )}
                        {q.type === "rating" && (
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <div key={num} className="base items-center">
                                        <input
                                            type="radio"
                                            id={`q${q._id}_rating_${num}`}
                                            name={`q${q._id}`}
                                            value={num}
                                            checked={answers[q._id!] === num}
                                            onChange={() => handleChange(q._id!, num)}
                                            className="hidden peer"
                                        />
                                        <label
                                            htmlFor={`q${q._id}_rating_${num}`}
                                            className="cursor-pointer w-12 h-12 max-md:h-8 max-md:w-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white transition-colors peer-checked:bg-primary/50 peer-checked:text-white peer-checked:border-primary"
                                        >
                                            {num}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <PrimaryButton
                    text={loading ? "Submitting..." : "Submit answer"}
                    styles="p-3 px-4 base rounded-xl bg-primary text-white hover:bg-primary-dark transition"
                    type="submit"
                    isLoading={loading}
                />
            </form>
        </div>
    );
};

export default FeedbackForm;