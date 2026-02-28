"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { HelpCircle, SkipForward, Info } from "lucide-react";

interface SmartQuestionProps {
  question: {
    id: string;
    label: string;
    type: string;
    options?: string[];
    placeholder?: string;
    hint?: string;
    allowSkip?: boolean;
    skipLabel?: string;
  };
  value: string;
  onChange: (value: string) => void;
  onSkip?: () => void;
}

export default function SmartQuestion({ question, value, onChange, onSkip }: SmartQuestionProps) {
  const [showHint, setShowHint] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  const handleSkip = () => {
    setIsSkipped(true);
    onChange("SKIP_" + question.id);
    onSkip?.();
  };

  const handleUnskip = () => {
    setIsSkipped(false);
    onChange("");
  };

  if (isSkipped) {
    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SkipForward className="w-5 h-5 text-gray-500" />
            <span className="text-gray-400">
              Skipped: {question.label}
            </span>
          </div>
          <button
            onClick={handleUnskip}
            className="text-brand hover:text-white text-sm font-medium"
          >
            Answer anyway →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Label with hint toggle */}
      <div className="flex items-start justify-between">
        <label className="block text-lg font-medium text-white">
          {question.label}
        </label>
        {question.hint && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-gray-500 hover:text-brand transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Hint box */}
      {showHint && question.hint && (
        <div className="bg-brand/10 border border-brand/20 rounded-lg p-3 flex items-start gap-2">
          <Info className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
          <p className="text-brand/90 text-sm">{question.hint}</p>
        </div>
      )}

      {/* Input field */}
      {question.type === "text" && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand"
        />
      )}

      {question.type === "textarea" && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand resize-none"
        />
      )}

      {question.type === "select" && question.options && (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand appearance-none cursor-pointer"
        >
          <option value="" disabled>Select an option</option>
          {question.options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )}

      {question.type === "multiselect" && question.options && (
        <div className="grid gap-2">
          {question.options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg cursor-pointer hover:border-brand/50 transition-colors"
            >
              <input
                type="checkbox"
                checked={value.includes(option)}
                onChange={(e) => {
                  const current = value ? value.split(", ") : [];
                  if (e.target.checked) {
                    onChange([...current, option].join(", "));
                  } else {
                    onChange(current.filter((v) => v !== option).join(", "));
                  }
                }}
                className="w-4 h-4 rounded border-border text-brand focus:ring-brand"
              />
              <span className="text-gray-300">{option}</span>
            </label>
          ))}
        </div>
      )}

      {/* Skip button */}
      {question.allowSkip && (
        <button
          onClick={handleSkip}
          className="text-gray-500 hover:text-gray-400 text-sm flex items-center gap-1"
        >
          <SkipForward className="w-4 h-4" />
          {question.skipLabel || "Skip this question"}
        </button>
      )}
    </div>
  );
}
