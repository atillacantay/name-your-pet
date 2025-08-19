"use client";

import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { GeneratedResult } from "../app/types";

interface ResultsDisplayProps {
  result: GeneratedResult;
  onReset: () => void;
}

export default function ResultsDisplay({
  result,
  onReset,
}: ResultsDisplayProps) {
  const t = useTranslations("ResultsDisplay");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("title")}</h2>
        <p className="text-gray-600">{result.message}</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-700 mb-3">
          {t("aiAnalysisTitle")}
        </h3>
        <p className="text-gray-600 italic">"{result.analysis}"</p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-4 text-center">
          {t("suggestedNamesTitle")}
        </h3>
        <div className="grid gap-3">
          {result.names.map((name, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 text-center transform hover:scale-105 transition-transform"
            >
              <span className="text-lg font-semibold text-purple-700">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
      >
        {t("tryAnotherButton")}
      </button>
    </div>
  );
}
