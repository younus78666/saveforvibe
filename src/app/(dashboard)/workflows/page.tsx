"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { workflows, WorkflowDefinition } from "@/lib/workflows";
import { clsx } from "clsx";

const categories = ["All", "Development", "SEO", "Security", "Marketing"] as const;
type Category = (typeof categories)[number];

const getCategoryColor = (category: string): string => {
  switch (category) {
    case "Development":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "SEO":
      return "bg-green-500/10 text-green-400 border-green-500/20";
    case "Security":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    case "Marketing":
      return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    default:
      return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  }
};

export default function WorkflowsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filteredWorkflows =
    activeFilter === "All"
      ? workflows
      : workflows.filter((w) => w.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Choose Your Workflow
          </h1>
          <p className="text-gray-400">
            Select a project type to get started
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeFilter === category
                  ? "bg-brand text-white"
                  : "bg-surface text-gray-400 hover:text-white border border-border"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Workflows Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredWorkflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </main>
    </div>
  );
}

function WorkflowCard({ workflow }: { workflow: WorkflowDefinition }) {
  return (
    <div className="group bg-surface border border-border rounded-xl p-6 hover:border-brand hover:scale-[1.02] transition-all cursor-pointer flex flex-col">
      {/* Top Row: Icon + Category */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{workflow.icon}</span>
        <span
          className={clsx(
            "px-2 py-1 rounded-full text-xs font-medium border",
            getCategoryColor(workflow.category)
          )}
        >
          {workflow.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-2">{workflow.title}</h3>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-6 flex-grow">
        {workflow.description}
      </p>

      {/* Bottom Row: Steps + Button */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-gray-500 text-sm">
          {workflow.totalSteps} Steps
        </span>
        <Link
          href={`/workflows/${workflow.id}/questions`}
          className="text-brand hover:text-white font-medium text-sm flex items-center gap-1 transition-colors"
        >
          Start <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
