"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getWorkflowById, WorkflowDefinition, Question } from "@/lib/workflows";

export default function QuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const workflowId = params.id as string;
  const workflow = getWorkflowById(workflowId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }
      setUserId(data.user.id);

      // Get or create user profile with credits
      const { data: existingProfile, error: profileError } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profileError) {
        console.log("Profile fetch error:", profileError);
      }

      if (existingProfile) {
        console.log("Found profile with credits:", existingProfile.credits);
        setCredits(existingProfile.credits);
      } else {
        console.log("No profile found, creating new one with 5 credits");
        // Create profile with 5 credits
        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            email: data.user.email || "",
            full_name: data.user.user_metadata?.full_name || "",
            plan: "free",
            credits: 5,
          })
          .select("credits")
          .single();

        if (createError) {
          console.error("Error creating profile:", createError);
        }

        if (newProfile) {
          console.log("Created profile with credits:", newProfile.credits);
          setCredits(newProfile.credits);
        }
      }
    };

    checkAuth();
  }, [router]);

  if (!workflow) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Workflow not found
          </h1>
          <Link
            href="/workflows"
            className="text-brand hover:text-white transition-colors"
          >
            Go back
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion: Question = workflow.questions[currentQuestionIndex];
  const isFirstQuestion: boolean = currentQuestionIndex === 0;
  const isLastQuestion: boolean =
    currentQuestionIndex === workflow.questions.length - 1;

  const handleAnswerChange = (value: string): void => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = (): void => {
    if (!answers[currentQuestion.id]?.trim()) {
      return;
    }
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleBack = (): void => {
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!userId) return;
    if (!credits || credits <= 0) {
      alert("You have no credits left. Please purchase more credits.");
      return;
    }

    setLoading(true);

    // Get project name from first question answer
    const projectName =
      answers[workflow.questions[0].id] || "Untitled Project";

    // Create workflow in database
    const { data: workflowData, error: workflowError } = await supabase
      .from("workflows")
      .insert({
        user_id: userId,
        project_type: workflow.id,
        project_name: projectName,
        answers: answers,
        current_step: 1,
        total_steps: workflow.totalSteps,
        status: "active",
      })
      .select()
      .single();

    if (workflowError) {
      console.error("Error creating workflow:", workflowError);
      setLoading(false);
      return;
    }

    // Deduct 1 credit
    const { error: creditError } = await supabase
      .from("profiles")
      .update({ credits: credits - 1 })
      .eq("id", userId);

    if (creditError) {
      console.error("Error deducting credits:", creditError);
      setLoading(false);
      return;
    }

    setLoading(false);

    // Redirect to prompts page
    router.push(`/workflows/${workflowData.id}/prompts/1`);
  };

  const progress: number =
    ((currentQuestionIndex + 1) / workflow.questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              href="/workflows"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Workflow Info */}
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">{workflow.icon}</span>
          <h1 className="text-2xl font-bold text-white mb-2">
            {workflow.title}
          </h1>
          <p className="text-gray-400">
            Answer {workflow.questions.length} questions to generate your
            prompts
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Question {currentQuestionIndex + 1} of {workflow.questions.length}
            </span>
            <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-brand rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-surface border border-border rounded-xl p-8">
          <label className="block text-lg font-medium text-white mb-4">
            {currentQuestion.label}
          </label>

          {currentQuestion.type === "text" && (
            <input
              type="text"
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand"
            />
          )}

          {currentQuestion.type === "textarea" && (
            <textarea
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder={currentQuestion.placeholder}
              rows={4}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand resize-none"
            />
          )}

          {currentQuestion.type === "select" && currentQuestion.options && (
            <select
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand appearance-none cursor-pointer"
            >
              <option value="" disabled className="text-gray-500">
                Select an option
              </option>
              {currentQuestion.options.map((option) => (
                <option key={option} value={option} className="text-white">
                  {option}
                </option>
              ))}
            </select>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={isFirstQuestion}
              className="px-6 py-3 rounded-lg text-gray-400 hover:text-white disabled:opacity-0 transition-colors"
            >
              Back
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={
                  !answers[currentQuestion.id]?.trim() || loading || credits === 0
                }
                className="bg-brand hover:bg-brand/90 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg px-8 py-3 transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : credits === 0 ? (
                  "No Credits Left"
                ) : (
                  "Generate My Prompts →"
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]?.trim()}
                className="bg-brand hover:bg-brand/90 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg px-8 py-3 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
