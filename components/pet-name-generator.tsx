"use client";

import { useRef, useState } from "react";
import { GeneratedResult } from "../app/types";
import EmptyState from "./empty-state";
import PetNameForm from "./pet-name-form";
import ResultsDisplay from "./results-display";

export default function PetNameGenerator() {
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleResult = (newResult: GeneratedResult) => {
    setResult(newResult);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="mb-16">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <PetNameForm onResult={handleResult} />
        </div>

        <div ref={ref}>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>

            {result ? (
              <ResultsDisplay result={result} onReset={handleReset} />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
