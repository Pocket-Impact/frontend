"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/utils/apiFetch";
import useFetch from "@/hooks/useFetch";
import FormBuilder from "@/components/surveys/FormBuilder";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const surveyId = params?.id;

    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const { data: surveyResponse, loading, error } = useFetch(
        surveyId ? `/api/surveys/unique/${surveyId}` : null
    );

    const initialSurvey = surveyResponse?.data?.survey ? {
        id: surveyResponse.data.survey._id,
        uniqueLinkId: surveyResponse.data.survey.uniqueLinkId,
        title: surveyResponse.data.survey.title || "",
        description: surveyResponse.data.survey.description || "",
        questions: (surveyResponse.data.survey.questions || []).map((q, idx) => ({
            id: idx + 1,
            type: q.type === "choice" ? "multiple" : q.type,
            label: q.questionText,
            options: q.options || undefined,
        })),
    } : null;

    // Handler for saving survey edits
    async function handleSave({ title, description, questions }) {
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
                uniqueLink={initialSurvey.uniqueLinkId}
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
