"use client";

import { useState } from "react";
import { aiTools, getBestToolForWorkflow, getBestModel } from "@/lib/tool-benchmarks";
import { clsx } from "clsx";
import { Sparkles, Zap, TrendingUp, ExternalLink } from "lucide-react";

interface ToolRecommendationProps {
  workflowCategory: string;
  complexity: "low" | "medium" | "high";
  budget: "free" | "cheap" | "premium";
}

export default function ToolRecommendation({
  workflowCategory,
  complexity,
  budget,
}: ToolRecommendationProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const recommendedTools = getBestToolForWorkflow(
    workflowCategory,
    "code-generation",
    complexity,
    budget
  );

  const topTool = recommendedTools[0];

  return (
    <div className="bg-gradient-to-br from-brand/10 to-blue-500/5 border border-brand/20 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-brand" />
        <h3 className="text-brand font-semibold">AI Tool Recommendation</h3>
        <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-0.5 rounded">
          Auto-selected
        </span>
      </div>

      {/* Top Recommendation */}
      {topTool && (
        <div className="bg-surface/80 rounded-lg p-4 mb-4 border border-brand/30">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{topTool.icon}</span>
              <div>
                <h4 className="text-white font-bold flex items-center gap-2">
                  {topTool.name}
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                    Best Match
                  </span>
                </h4>
                <p className="text-gray-400 text-sm">{topTool.provider}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-brand">
                <TrendingUp className="w-4 h-4" />
                <span className="font-bold">{topTool.capabilities.codeGeneration}/10</span>
              </div>
              <p className="text-gray-500 text-xs">Code Quality</p>
            </div>
          </div>

          {/* Model Recommendation */}
          <div className="mt-3 pt-3 border-t border-gray-800">
            <p className="text-sm text-gray-400 mb-2">Recommended Model:</p>
            <code className="text-xs bg-black/50 px-2 py-1 rounded text-green-400 font-mono">
              {topTool.models[0]?.name}
            </code>
            <span className="text-xs text-gray-500 ml-2">
              {topTool.models[0]?.costPer1k < 0.001
                ? "Ultra cheap"
                : topTool.models[0]?.costPer1k < 0.005
                ? "Affordable"
                : "Premium"}
            </span>
          </div>

          {/* Why This Tool */}
          <div className="mt-3">
            <p className="text-sm text-gray-400 mb-1">Perfect for this workflow:</p>
            <ul className="text-sm text-gray-300 space-y-1">
              {topTool.bestFor.slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-yellow-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="mt-4 flex gap-2">
            <a
              href={topTool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-brand hover:bg-brand/90 text-white text-sm py-2 rounded-lg text-center transition-colors flex items-center justify-center gap-2"
            >
              Open {topTool.name}
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => setSelectedTool(topTool.id)}
              className="px-4 py-2 border border-gray-700 hover:border-brand text-gray-300 hover:text-white text-sm rounded-lg transition-colors"
            >
              Compare All
            </button>
          </div>
        </div>
      )}

      {/* Alternatives */}
      <div className="grid grid-cols-2 gap-2">
        {recommendedTools.slice(1, 3).map((tool) => (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className="flex items-center gap-2 p-3 bg-surface/50 rounded-lg hover:bg-surface transition-colors text-left"
          >
            <span className="text-xl">{tool.icon}</span>
            <div>
              <p className="text-white text-sm font-medium">{tool.name}</p>
              <p className="text-gray-500 text-xs">
                {tool.pricing.free ? "Free tier" : "Paid"}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Comparison Modal (simplified) */}
      {selectedTool && (
        <div className="mt-4 p-4 bg-black/50 rounded-lg">
          <h4 className="text-white font-medium mb-3">All Available Tools</h4>
          <div className="space-y-2">
            {aiTools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center justify-between p-2 rounded hover:bg-white/5"
              >
                <div className="flex items-center gap-2">
                  <span>{tool.icon}</span>
                  <span className="text-gray-300 text-sm">{tool.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    Context: {tool.capabilities.contextWindow >= 1000000
                      ? "1M+"
                      : tool.capabilities.contextWindow >= 100000
                      ? "200K"
                      : "128K"}
                  </span>
                  <span className="text-xs text-brand">
                    {tool.capabilities.codeGeneration}/10
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSelectedTool(null)}
            className="mt-3 text-gray-400 hover:text-white text-sm"
          >
            Close comparison
          </button>
        </div>
      )}
    </div>
  );
}
