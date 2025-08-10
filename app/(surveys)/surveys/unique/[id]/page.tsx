"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { apiFetch } from "@/utils/apiFetch";

const FeedbackForm = () => {
    const { id } = useParams();
    type SurveyQuestion = {
        id: number;
        questionText: string;
        type: string;
        options?: string[];
        _id?: string; // If your API uses _id for questions
    };
    type SurveyType = {
        _id: string;
        title: string;
        description: string;
        questions: SurveyQuestion[];
    };
    const [survey, setSurvey] = useState<SurveyType | null>(null);

    useEffect(() => {
        // Fetch survey data from API
        const fetchSurvey = async () => {
            const res = await apiFetch(`/api/surveys/unique/${id}`);
            if (res.ok) {
                const data = await res.json();
                setSurvey(data.data.survey);
            }
        };
        fetchSurvey();
    }, []);
    const router = useRouter();

    const surveyId = survey?._id;


    const [answers, setAnswers] = useState<{ [key: string]: any }>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);


    const handleChange = (qid: string, value: any) => {
        setAnswers((prev) => ({ ...prev, [qid]: value }));
    };


    const preparePayload = () => ({
        surveyId,
        feedbacks: survey?.questions
            .map(q => ({
                questionId: q._id!,
                answer: answers[q._id!] !== undefined ? String(answers[q._id!]) : ""
            }))
            .filter(fb => fb.answer !== "")
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const payload = preparePayload();
            const res = await apiFetch("/api/feedback", {
                method: "POST",
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const json = await res.json();
                console.log(json);
                // setError(json.message || "Failed to submit feedback.");
            } else {
                setSuccess(true);
                setAnswers({});
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto inter flex items-start h-full  justify-center">
            <div className="bg-white border-stroke border text-start md:rounded-bl-3xl p-6 scrolly overflow-y-scroll h-full max-md:h-full md:max-h-11/12">
                <div className="flex justify-between">
                    <h3 className="x5l font-bold mb-8 text-primary">Feedback Form</h3>
                </div>
                {error && <div className="text-red-500 mt-2">{error}</div>}
                <h4 className="xl font-bold">{survey?.title}</h4>
                <p className="mb-4 text-gray-700 base">{survey?.description}</p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {survey?.questions.map((q, index) => (
                        <div key={q._id} className="mb-4">
                            <label className="block base font-semibold mb-2">{q.questionText}</label>
                            {q.type === "text" && (
                                <input
                                    type="text"
                                    className="w-full base p-2 border bg-white border-gray-300 outline-0 focus:border-primary rounded"
                                    placeholder={`Answer ${(index + 1).toString().padStart(2, "0")}`}
                                    value={answers[q._id!] || ""}
                                    onChange={(e) => handleChange(q._id!, e.target.value)}
                                />
                            )}
                            {q.type === "choice" && (
                                q.options?.map((opt, idx) => (
                                    <div key={idx} className="flex base items-center gap-2 mb-2">
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
                                            className="cursor-pointer p-2 px-3 rounded border border-gray-300 w-full bg-white transition-colors peer-checked:bg-primary/50 peer-checked:text-white peer-checked:border-primary/50"
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
                    {success && <div className="text-green-600 mt-2">Thank you for your feedback!</div>}
                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;