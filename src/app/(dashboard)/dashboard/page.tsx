"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Loader2, Rocket } from "lucide-react";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  plan: string;
  credits: number;
  created_at: string;
}

interface Workflow {
  id: string;
  project_type: string;
  project_name: string;
  current_step: number;
  total_steps: number;
  status: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDashboard = async (): Promise<void> => {
      // Check authentication
      const { data: authData } = await supabase.auth.getUser();

      if (!authData.user) {
        router.push("/login");
        return;
      }

      setUser(authData.user);

      // Fetch or create user profile
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (existingProfile) {
        setProfile(existingProfile);
      } else {
        // Create profile for existing user
        const { data: newProfile } = await supabase
          .from("profiles")
          .insert({
            id: authData.user.id,
            email: authData.user.email || "",
            full_name: authData.user.user_metadata?.full_name || "",
            plan: "free",
            credits: 5,
          })
          .select()
          .single();

        if (newProfile) {
          setProfile(newProfile);
        }
      }

      // Fetch user workflows
      const { data: workflowsData } = await supabase
        .from("workflows")
        .select("*")
        .eq("user_id", authData.user.id)
        .order("created_at", { ascending: false });

      if (workflowsData) {
        setWorkflows(workflowsData);
      }

      setLoading(false);
    };

    loadDashboard();
  }, [router]);

  const handleSignOut = async (): Promise<void> => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleStartWorkflow = (): void => {
    router.push("/workflows");
  };

  const getCreditsBadgeClasses = (): string => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    const credits = profile?.credits ?? 5;
    if (credits === 0) {
      return `${baseClasses} bg-red-500/10 text-red-500 border border-red-500/20`;
    }
    return `${baseClasses} bg-brand/10 text-brand border border-brand/20`;
  };

  const getCreditsText = (): string => {
    const credits = profile?.credits ?? 5;
    if (credits === 0) return "No Credits Left";
    return `${credits} Credit${credits !== 1 ? "s" : ""} Left`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-white">SaveForVibe</h1>
            <div className="flex items-center gap-4">
              <span className={getCreditsBadgeClasses()}>
                {getCreditsText()}
              </span>
              <span className="text-gray-400 text-sm hidden sm:inline">
                {user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Empty State or Workflows List */}
        {workflows.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-surface rounded-2xl mb-6 border border-border">
              <Rocket className="w-10 h-10 text-brand" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              No workflows yet
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Start your first project below and let&apos;s build something
              amazing together
            </p>
            <button
              onClick={handleStartWorkflow}
              className="bg-brand hover:bg-brand/90 text-white font-medium rounded-lg px-8 py-4 transition-colors"
            >
              Start New Workflow
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Your Workflows
                </h2>
                <p className="text-gray-400 mt-1">
                  Manage and continue your projects
                </p>
              </div>
              <button
                onClick={handleStartWorkflow}
                className="bg-brand hover:bg-brand/90 text-white font-medium rounded-lg px-6 py-3 transition-colors"
              >
                Start New Workflow
              </button>
            </div>

            {/* Workflows Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {workflows.map((workflow) => (
                <Link
                  key={workflow.id}
                  href={`/workflows/${workflow.id}/prompts/${workflow.current_step}`}
                  className="block bg-surface border border-border rounded-xl p-6 hover:border-brand/50 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl">
                      {workflow.project_type === "saas-builder" && "🚀"}
                      {workflow.project_type === "local-seo" && "📍"}
                      {workflow.project_type === "micro-niche" && "🎯"}
                      {workflow.project_type === "ecommerce" && "🛍️"}
                      {workflow.project_type === "security-hardening" && "🔒"}
                      {workflow.project_type === "chrome-extension" && "🧩"}
                      {workflow.project_type === "landing-page" && "📣"}
                      {workflow.project_type === "uc-seo-content" && "✍️"}
                      {!workflow.project_type && "🚀"}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        workflow.status === "active"
                          ? "bg-green-500/10 text-green-500"
                          : workflow.status === "completed"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-gray-500/10 text-gray-400"
                      }`}
                    >
                      {workflow.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {workflow.project_name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Step {workflow.current_step} of {workflow.total_steps}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 bg-border rounded-full h-2">
                      <div
                        className="bg-brand rounded-full h-2 transition-all"
                        style={{
                          width: `${
                            (workflow.current_step / workflow.total_steps) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm">
                      {Math.round((workflow.current_step / workflow.total_steps) * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">
                      {workflow.project_type.replace(/-/g, " ")}
                    </span>
                    <span className="text-brand font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Continue →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
