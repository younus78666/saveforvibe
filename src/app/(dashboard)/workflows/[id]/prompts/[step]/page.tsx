"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Copy, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getWorkflowById } from "@/lib/workflows";
import { getWorkflowStep, replacePlaceholders, WorkflowStep } from "@/lib/prompts";
import { clsx } from "clsx";

interface WorkflowData {
  id: string;
  user_id: string;
  project_type: string;
  project_name: string;
  answers: Record<string, string>;
  current_step: number;
  total_steps: number;
  status: string;
}

interface ProfileData {
  credits: number;
}

export default function PromptStepPage() {
  const params = useParams();
  const router = useRouter();
  const workflowId = params.id as string;
  const stepNumber = parseInt(params.step as string, 10);

  const [workflow, setWorkflow] = useState<WorkflowData | null>(null);
  const [stepData, setStepData] = useState<WorkflowStep | null>(null);
  const [processedPrompt, setProcessedPrompt] = useState<string>("");
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [credits, setCredits] = useState<number>(0);
  const [workflowType, setWorkflowType] = useState<string>("");

  const loadWorkflow = useCallback(async (): Promise<void> => {
    try {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        router.push("/login");
        return;
      }

      console.log("Loading workflow:", workflowId);
      console.log("User:", authData.user.id);

      // Fetch workflow
      const { data: workflowData, error: workflowError } = await supabase
        .from("workflows")
        .select("*")
        .eq("id", workflowId)
        .single();

      if (workflowError || !workflowData) {
        console.error("Error loading workflow:", workflowError);
        console.log("Workflow ID tried:", workflowId);
        console.log("User ID:", authData.user.id);
        setLoading(false);
        return;
      }

      console.log("Workflow loaded:", workflowData.project_type);

      // Verify ownership
      if (workflowData.user_id !== authData.user.id) {
        console.error("Ownership mismatch:", workflowData.user_id, "vs", authData.user.id);
        setLoading(false);
        return;
      }

      setWorkflow(workflowData);
      setWorkflowType(workflowData.project_type);

      // Get step data
      const step = getWorkflowStep(workflowData.project_type, stepNumber);
      console.log("Step data:", step ? "found" : "not found");
      
      if (!step) {
        console.error("Step not found:", workflowData.project_type, stepNumber);
        setLoading(false);
        return;
      }
      
      setStepData(step);

      // Process prompt with placeholders
      const processed = replacePlaceholders(step.prompt, workflowData.answers);
      setProcessedPrompt(processed);

      // Initialize checkboxes
      setCheckedItems(new Array(step.testChecklist.length).fill(false));

      // Get user credits
      const { data: profileData } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", authData.user.id)
        .single();

      if (profileData) {
        setCredits(profileData.credits);
      }

      setLoading(false);
    } catch (err) {
      console.error("Unexpected error:", err);
      setLoading(false);
    }
  }, [workflowId, stepNumber, router]);

  useEffect(() => {
    loadWorkflow();
  }, [loadWorkflow]);

  const handleCheckboxToggle = (index: number): void => {
    setCheckedItems((prev) => {
      const newItems = [...prev];
      newItems[index] = !newItems[index];
      return newItems;
    });
  };

  const allChecked = checkedItems.every((item) => item);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(processedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleNext = async (): Promise<void> => {
    if (!workflow || !stepData) return;

    const nextStep = stepNumber + 1;
    const totalSteps = workflow.total_steps;

    // Update current_step in database
    const { error } = await supabase
      .from("workflows")
      .update({ current_step: Math.min(nextStep, totalSteps) })
      .eq("id", workflowId);

    if (error) {
      console.error("Error updating step:", error);
      return;
    }

    if (nextStep > totalSteps) {
      // Completed workflow
      router.push("/dashboard");
    } else {
      router.push(`/workflows/${workflowId}/prompts/${nextStep}`);
    }
  };

  const handlePrevious = (): void => {
    if (stepNumber > 1) {
      router.push(`/workflows/${workflowId}/prompts/${stepNumber - 1}`);
    }
  };

  const handleComplete = async (): Promise<void> => {
    if (!workflow) return;

    const { error } = await supabase
      .from("workflows")
      .update({ status: "completed", current_step: workflow.total_steps })
      .eq("id", workflowId);

    if (error) {
      console.error("Error completing workflow:", error);
      return;
    }

    router.push("/dashboard");
  };

  const getWorkflowTitle = (): string => {
    const wf = getWorkflowById(workflowType);
    return wf?.title || workflowType;
  };

  const progress = workflow && stepData
    ? ((stepNumber - 1) / workflow.total_steps) * 100
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
      </div>
    );
  }

  if (!workflow || !stepData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-4">
          <h1 className="text-xl font-bold text-white mb-4">Workflow Not Found</h1>
          <p className="text-gray-400 mb-2">Workflow ID: {workflowId}</p>
          <p className="text-gray-500 text-sm mb-6">
            This workflow may not exist or you don&apos;t have permission to view it.
            Check console for details (F12).
          </p>
          <Link 
            href="/dashboard" 
            className="bg-brand hover:bg-brand/90 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isLastStep = stepNumber === workflow.total_steps;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            <div className="text-center">
              <h1 className="text-sm font-medium text-white">
                {getWorkflowTitle()}
              </h1>
              <p className="text-xs text-gray-400">
                Step {stepNumber} of {workflow.total_steps}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  credits === 0
                    ? "bg-red-500/10 text-red-500 border border-red-500/20"
                    : "bg-brand/10 text-brand border border-brand/20"
                )}
              >
                {credits === 0 ? "No Credits" : `${credits} Credits`}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-border h-1">
          <div
            className="bg-brand h-1 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Panel - Test Checklist */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step Info */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {stepData.aiTool}
                </span>
                <span className="text-gray-400 text-sm">
                  {stepData.estimatedTime}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2">
                {stepData.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                {stepData.description}
              </p>

              {/* Context Note */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <p className="text-amber-400 text-sm">
                  <strong>Tip:</strong> {stepData.contextNote}
                </p>
              </div>
            </div>

            {/* Test Checklist */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Test Before Continuing
              </h3>

              <div className="space-y-3">
                {stepData.testChecklist.map((item, index) => (
                  <label
                    key={index}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <div
                      className={clsx(
                        "w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                        checkedItems[index]
                          ? "bg-brand border-brand"
                          : "border-border bg-background group-hover:border-brand/50"
                      )}
                      onClick={() => handleCheckboxToggle(index)}
                    >
                      {checkedItems[index] && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                    <span
                      className={clsx(
                        "text-sm transition-colors",
                        checkedItems[index]
                          ? "text-gray-400 line-through"
                          : "text-gray-300"
                      )}
                    >
                      {item}
                    </span>
                  </label>
                ))}
              </div>

              {/* All checked message */}
              {allChecked && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm text-center font-medium">
                    ✅ All tests passed! You can continue.
                  </p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              {stepNumber > 1 && (
                <button
                  onClick={handlePrevious}
                  className="flex-1 px-6 py-3 border border-border text-gray-300 hover:text-white hover:border-brand rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous Step
                </button>
              )}

              {isLastStep ? (
                <button
                  onClick={handleComplete}
                  disabled={!allChecked}
                  className={clsx(
                    "flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2",
                    allChecked
                      ? "bg-green-600 hover:bg-green-500 text-white"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  )}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Complete Workflow 🎉
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!allChecked}
                  className={clsx(
                    "flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2",
                    allChecked
                      ? "bg-brand hover:bg-brand/90 text-white"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  )}
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Panel - Prompt */}
          <div className="lg:col-span-3">
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              {/* Prompt Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div>
                  <h3 className="font-semibold text-white">Your Prompt</h3>
                  <p className="text-sm text-gray-400">
                    Copy this and paste into {stepData.aiTool}
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className={clsx(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                    copied
                      ? "bg-green-500/20 text-green-400"
                      : "bg-brand/10 text-brand hover:bg-brand/20"
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied! ✓
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Prompt
                    </>
                  )}
                </button>
              </div>

              {/* Prompt Content */}
              <div className="p-6">
                <pre className="bg-background border border-border rounded-lg p-4 overflow-x-auto">
                  <code className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {processedPrompt}
                  </code>
                </pre>

                <p className="mt-4 text-sm text-gray-500">
                  Paste this into {stepData.aiTool} and wait for the response before
                  continuing to the next step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
