"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { clsx } from "clsx";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
  {
    question: "Can I cancel my Pro subscription anytime?",
    answer:
      "Yes, you can cancel anytime. Your Pro access continues until the end of your billing period, then your account automatically downgrades to the free Starter plan.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 7-day money-back guarantee on all Pro subscriptions. If you're not satisfied, contact support within 7 days for a full refund.",
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

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple Pricing
          </h1>
          <p className="text-xl text-gray-400">
            Start free. Upgrade when you need more.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-surface border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $0{" "}
                <span className="text-lg text-gray-400 font-normal">/ forever</span>
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
            <h2 className="text-3xl font-bold text-white mb-4">
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

      {/* CTA Section */}
      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to stop wasting AI credits?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of vibe coders building faster and better with
            SaveForVibe.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Start Free — 5 Workflows
          </Link>
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
