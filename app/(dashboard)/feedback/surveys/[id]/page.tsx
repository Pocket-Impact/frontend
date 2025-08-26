"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/utils/apiFetch";
import FormBuilder from "@/components/surveys/FormBuilder";
import { Question } from "@/components/surveys/QuestionCard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const surveyId = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [initialSurvey, setInitialSurvey] = useState<{
        id: string;
        title: string;
        description: string;
        questions: Question[];
    } | null>(null);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function fetchSurvey() {
            setLoading(true);
            setError(null);
            try {
                // Fetch survey by unique link ID (for preview/edit)
                const res = await apiFetch(`/api/surveys/unique/${surveyId}`);
                const json = await res.json();
                const survey = json?.data?.survey;
                if (!survey) throw new Error("Survey not found");
                setInitialSurvey({
                    id: survey._id,
                    title: survey.title || "",
                    description: survey.description || "",
                    questions: (survey.questions || []).map((q: {
                        type: string;
                        questionText: string;
                        options?: string[];
                    }, idx: number) => ({
                        id: idx + 1,
                        type: q.type === "choice" ? "multiple" : q.type,
                        label: q.questionText,
                        options: q.options || undefined,
                    })),
                });
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message || "Failed to load survey.");
                } else {
                    setError("Failed to load survey.");
                }
            } finally {
                setLoading(false);
            }
        }
        if (surveyId) fetchSurvey();
    }, [surveyId]);

    // Handler for saving survey edits
    async function handleSave({ title, description, questions }: { title: string; description: string; questions: Question[] }) {
        setSaving(true);
        setError(null);
        setSuccess(false);
        try {
            const payload = {
                title,
                description,
                questions: questions.map(q => ({
                    questionText: q.label,
                    type: q.type === "multiple" ? "choice" : q.type,
                    ...(q.type === "multiple" ? { options: q.options?.filter(opt => opt.trim() !== "") } : {}),
                })),
            };
            await apiFetch(`/api/surveys/${initialSurvey?.id}`, {
                method: "PUT",
                body: JSON.stringify(payload),
            });
            router.push(`/feedback/surveys`);
            setSuccess(true);
        } catch (err) {
            setError("Failed to save survey.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return (
        <div className="p-8 text-center">
            <DotLottieReact
                src="/animations/loading.lottie"
                loop
                autoplay
                className="w-10"
                style={{ height: "auto" }}
            />
        </div>
    );
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!initialSurvey) return null;

    return (
        <div className="h-full">
            <FormBuilder
                edit={true}
                initialId={initialSurvey.id}
                initialTitle={initialSurvey.title}
                initialDescription={initialSurvey.description}
                initialQuestions={initialSurvey.questions}
                onSave={handleSave}
                loading={saving}
                error={error}
                success={success}
            />
        </div>
    );
}
