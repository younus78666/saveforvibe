"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { workflows } from "@/lib/workflows";
import { clsx } from "clsx";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

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

const faqs = [
  {
    question: "Which AI tools does SaveForVibe work with?",
    answer:
      "SaveForVibe works with any AI tool — Claude, Gemini, ChatGPT, Kimi, and any other AI assistant. You simply copy the prompt and paste it wherever you like.",
  },
  {
    question: "Do I need coding experience?",
    answer:
      "No. SaveForVibe is built for vibe coders — people who build with AI without traditional coding backgrounds. The prompts guide both you and the AI step by step.",
  },
  {
    question: "Why are the prompts better than writing my own?",
    answer:
      "Our prompts are context-locked and constraint-injected. They tell the AI exactly what to do, what NOT to do, which files to touch, and include a test checklist — eliminating the back-and-forth that wastes your credits.",
  },
  {
    question: "What is a workflow run?",
    answer:
      "One workflow run = one complete project guide from setup to launch. Each run uses 1 credit from your account.",
  },
  {
    question: "Can I use SaveForVibe for client projects?",
    answer:
      "Absolutely. Many freelancers use SaveForVibe to build client websites faster and more reliably. The Pro plan is perfect for agencies.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-lg font-medium text-white group-hover:text-brand transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          className={clsx(
            "w-5 h-5 text-gray-400 flex-shrink-0 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={clsx(
          "overflow-hidden transition-all",
          isOpen ? "max-h-48 pb-5" : "max-h-0"
        )}
      >
        <p className="text-gray-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-medium mb-6">
                <span>⚡</span>
                Built for Vibe Coders
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Stop Wasting AI Credits.
                <br />
                <span className="text-brand">Get It Right First Time.</span>
              </h1>

              <p className="text-lg text-gray-400 mb-8 max-w-xl">
                Answer 5 questions. Get step-by-step AI prompts that are strict,
                precise and context-locked — so your AI builds exactly what you
                want, every time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  href="/register"
                  className="bg-brand hover:bg-brand/90 text-white font-semibold px-8 py-4 rounded-lg text-center transition-colors"
                >
                  Start Free — 5 Workflows
                </Link>
                <Link
                  href="#how-it-works"
                  className="border border-border hover:border-brand text-white font-medium px-8 py-4 rounded-lg text-center transition-colors"
                >
                  See How It Works
                </Link>
              </div>

              <p className="text-sm text-gray-500">
                No credit card required • Works with Claude, Gemini, Kimi and
                ChatGPT
              </p>
            </div>

            {/* Right: Visual */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-brand/20 blur-3xl rounded-full" />

                {/* Code block mockup */}
                <div className="relative bg-surface border border-border rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-4 text-gray-500 text-sm">prompt.md</span>
                  </div>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="text-gray-400">
                      # Task 1 — Brand Identity System
                    </div>
                    <div className="text-gray-300">
                      <span className="text-brand">PROJECT:</span> SaveForVibe
                    </div>
                    <div className="text-brand">STRICT RULES:</div>
                    <div className="text-gray-400 pl-4">❌ Do NOT write code</div>
                    <div className="text-gray-400 pl-4">
                      ✅ Design decisions only
                    </div>
                    <div className="text-gray-300 mt-4">
                      1. Color palette — 5 hex codes
                    </div>
                    <div className="text-gray-300">
                      2. Typography — heading font
                    </div>
                    <div className="text-gray-300">3. Spacing scale — 4px</div>
                    <div className="text-brand mt-4">
                      Wait for my approval...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              From Confused to Building in 3 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                icon: "🎯",
                title: "Pick Your Workflow",
                description:
                  "Choose from 8 project types: SaaS, SEO, Security, eCommerce and more",
              },
              {
                step: 2,
                icon: "💬",
                title: "Answer 5 Questions",
                description:
                  "Tell us about your project. Takes 2 minutes. No technical knowledge needed.",
              },
              {
                step: 3,
                icon: "🚀",
                title: "Get Perfect Prompts",
                description:
                  "Receive strict, context-locked prompts one by one. Each one tested before the next unlocks.",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand text-white font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
                {/* Arrow between steps (desktop only) */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full -translate-x-1/2">
                    <div className="flex items-center justify-center">
                      <div className="w-24 h-px bg-gradient-to-r from-border to-brand" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflows Section */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              8 Workflows. Every Project Type Covered.
            </h2>
            <p className="text-gray-400">
              From idea to launched — we have a workflow for every vibe coder
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="bg-surface border border-border rounded-xl p-6 hover:border-brand/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{workflow.icon}</span>
                  <span
                    className={clsx(
                      "px-2 py-1 rounded-full text-xs font-medium border",
                      getCategoryColor(workflow.category)
                    )}
                  >
                    {workflow.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {workflow.title}
                </h3>
                <p className="text-gray-400 text-sm">{workflow.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Start Free →
            </Link>
          </div>
        </div>
      </section>

      {/* Why SaveForVibe Section */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Vibe Coders Choose SaveForVibe
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Without */}
            <div className="bg-surface border border-red-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-red-400 mb-6">
                Without SaveForVibe
              </h3>
              <ul className="space-y-4">
                {[
                  "10-15 prompts to get one feature working",
                  "AI changes random files and breaks things",
                  "Wrong packages installed every time",
                  "No testing = bugs pile up",
                  "Credits wasted on repeated fixes",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400">
                    <span className="text-red-500 flex-shrink-0">❌</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* With */}
            <div className="bg-surface border border-green-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-green-400 mb-6">
                With SaveForVibe
              </h3>
              <ul className="space-y-4">
                {[
                  "1-2 prompts per feature, done right",
                  "AI only touches files you specify",
                  "Stack stays locked throughout",
                  "Test checklist after every single step",
                  "Save 70% of your AI credits",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-green-500 flex-shrink-0">✅</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple Pricing
            </h2>
            <p className="text-gray-400">
              Start free. Upgrade when you need more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-surface border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $0 <span className="text-lg text-gray-400 font-normal">/ forever</span>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  { text: "3 workflow runs", included: true },
                  { text: "All 8 workflow types", included: true },
                  { text: "Copy prompts to clipboard", included: true },
                  { text: "Test checklists included", included: true },
                  { text: "Export to PDF", included: false },
                  { text: "Custom workflow builder", included: false },
                  { text: "Priority support", included: false },
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span
                      className={clsx(
                        feature.included ? "text-green-500" : "text-gray-600"
                      )}
                    >
                      {feature.included ? "✅" : "❌"}
                    </span>
                    <span
                      className={
                        feature.included ? "text-gray-300" : "text-gray-500"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className="block w-full text-center border border-border hover:border-brand text-white font-medium py-3 rounded-lg transition-colors"
              >
                Start Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-surface border-2 border-brand rounded-xl p-8 relative">
              <span className="absolute -top-3 right-6 px-3 py-1 bg-brand text-white text-xs font-semibold rounded-full">
                Most Popular
              </span>

              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $19{" "}
                <span className="text-lg text-gray-400 font-normal">/ month</span>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  { text: "Unlimited workflow runs", included: true },
                  { text: "All 8 workflow types", included: true },
                  { text: "Copy prompts to clipboard", included: true },
                  { text: "Test checklists included", included: true },
                  { text: "Export to PDF", included: true },
                  { text: "Custom workflow builder (coming soon)", included: true },
                  { text: "Priority support", included: true },
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <span className="text-gray-300">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className="block w-full text-center bg-brand hover:bg-brand/90 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Start Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6 sm:p-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left */}
            <div>
              <div className="flex items-center gap-1 text-white font-bold text-lg mb-1">
                SaveForVibe <span>⚡</span>
              </div>
              <p className="text-gray-500 text-sm">Stop wasting AI credits.</p>
            </div>

            {/* Center */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/workflows"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Workflows
              </Link>
              <Link
                href="/pricing"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/login"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Sign In
              </Link>
            </div>

            {/* Right */}
            <p className="text-gray-500 text-sm">
              © 2025 SaveForVibe. Built for Vibe Coders.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
