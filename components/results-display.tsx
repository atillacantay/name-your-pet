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
    <section
      className="space-y-8"
      role="region"
      aria-labelledby="results-title"
    >
      <div className="text-center relative">
        <div className="inline-flex items-center justify-center size-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mb-4">
          <Sparkles className="size-8 text-white" aria-hidden="true" />
        </div>
        <h2
          id="results-title"
          className="text-3xl font-bold text-gray-900 mb-3"
        >
          {t("title")}
        </h2>
        <p className="text-lg text-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
          {result.message}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {t("suggestedNamesTitle")}
          </h3>
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {result.names.length} names
          </div>
        </div>

        <ul className="grid gap-4" role="list">
          {result.names.map((name, index) => (
            <li
              key={index}
              className="group bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative flex items-center space-x-3">
                <div className="size-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-purple-600 shadow-sm">
                  {index + 1}
                </div>
                <span className="text-xl font-bold text-purple-800 group-hover:text-purple-900 transition-colors">
                  {name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button
          onClick={onReset}
          className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-medium py-4 px-6 rounded-xl 
                   hover:from-gray-200 hover:to-gray-300 focus:from-gray-200 focus:to-gray-300 transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform hover:scale-[1.02]"
        >
          {t("tryAnotherButton")}
        </button>
      </div>
    </section>
  );
}
