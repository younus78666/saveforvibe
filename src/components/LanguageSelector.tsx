"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Globe, Check } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "ur", name: "اردو", flag: "🇵🇰", dir: "rtl" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳", dir: "ltr" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷", dir: "ltr" },
];

interface LanguageSelectorProps {
  selected: string;
  onChange: (code: string) => void;
  compact?: boolean;
}

export default function LanguageSelector({ selected, onChange, compact = false }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const current = languages.find((l) => l.code === selected) || languages[0];

  if (compact) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface hover:border-brand transition-colors text-sm"
        >
          <Globe className="w-4 h-4 text-gray-400" />
          <span>{current.flag}</span>
          <span className="text-gray-300">{current.name}</span>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full right-0 mt-2 w-48 bg-surface border border-border rounded-xl shadow-xl z-50 py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={clsx(
                    "w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-brand/10 transition-colors",
                    selected === lang.code && "bg-brand/10"
                  )}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className={clsx(
                    "flex-1",
                    selected === lang.code ? "text-white" : "text-gray-300"
                  )}>
                    {lang.name}
                  </span>
                  {selected === lang.code && (
                    <Check className="w-4 h-4 text-brand" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          className={clsx(
            "flex items-center gap-3 p-4 rounded-xl border transition-all",
            selected === lang.code
              ? "border-brand bg-brand/10"
              : "border-border bg-surface hover:border-brand/50"
          )}
        >
          <span className="text-2xl">{lang.flag}</span>
          <div className="text-left">
            <p className={clsx(
              "font-medium",
              selected === lang.code ? "text-white" : "text-gray-300"
            )}>
              {lang.name}
            </p>
            <p className="text-xs text-gray-500">
              {lang.dir === "rtl" ? "Right-to-left" : "Left-to-right"}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
