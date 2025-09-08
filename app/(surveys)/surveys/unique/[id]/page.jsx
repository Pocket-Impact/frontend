"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { apiFetch } from "@/utils/apiFetch";
import { useAlertStore } from "@/stores/alertStore";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import logo from '@/public/img/white.svg'
import Image from 'next/image'

const FeedbackForm = () => {
    const { id } = useParams();
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

    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setMessage, clearMessage } = useAlertStore((state) => state);
    const [pageLoading, setPageLoading] = useState(true);

    const handleChange = (qid, value) => {
        setAnswers((prev) => ({ ...prev, [qid]: value }));
    };


    const preparePayload = () => ({
        surveyId,
        responses: survey?.questions
            .map(q => ({
                questionId: q._id,
                answer: answers[q._id] !== undefined ? String(answers[q._id]) : ""
            }))
            .filter(resp => resp.answer !== "")
    });


    const handleSubmit = async (e) => {
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
        <div className="lg:max-w-6xl 2xl:max-w-[1300px] w-full lg:h-[600px] max-md:h-full border-stroke md:border inter flex flex-col items-start">
            <div className="grid lg:grid-cols-5 h-full min-h-0 items-stretch">
                <div className="lg:col-span-2 bg-primary w-full h-full min-h-0 flex flex-col gap-6 flex-1 max-h-full overflow-y-auto p-6">
                    <div className='flex items-center gap-4 max-md:gap-2'>
                        <Image src={logo.src} alt="Pocket Impact Logo" width={logo.width} height={logo.height} className='w-8 h-8' />
                        <span className='bricolage lg text-white'>
                            Pocket Impact
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <h3 className="x2l font-semibold text-white bricolage">Survey form</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="lg font-bold text-white">{survey?.title}</h4>
                        <p className="sm text-white/80 font-light">{survey?.description}</p>
                    </div>
                </div>
                <form className="lg:col-span-3 scrolly p-6 h-full flex flex-col max-h-full overflow-y-auto" onSubmit={handleSubmit}>
                    {error &&
                        <div className='mb-4 bg-orange-100 border-orange-400 border p-3 op-2 base rounded-lg text-red-500 font-medium'>
                            {error}
                        </div>
                    }
                    {survey?.questions.map((q, index) => (
                        <div key={q._id} className="mb-4">
                            <label className="block base font-semibold mb-2">{q.questionText}</label>
                            {q.type === "text" && (
                                <textarea
                                    className="w-full base p-2 border bg-white border-gray-300 outline-0 focus:border-primary rounded"
                                    placeholder={`Answer ${(index + 1).toString().padStart(2, "0")}`}
                                    value={answers[q._id] || ""}
                                    onChange={(e) => handleChange(q._id, e.target.value)}
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
                                            checked={answers[q._id] === opt}
                                            onChange={() => handleChange(q._id, opt)}
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
                                                checked={answers[q._id] === num}
                                                onChange={() => handleChange(q._id, num)}
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
        </div>
    );
};

export default FeedbackForm;