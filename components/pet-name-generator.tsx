"use client";

import { useState } from "react";
import { GeneratedResult } from "../app/types";
import EmptyState from "./empty-state";
import PetNameForm from "./pet-name-form";
import ResultsDisplay from "./results-display";

export default function PetNameGenerator() {
  const [result, setResult] = useState<GeneratedResult | null>(null);

  const handleResult = (newResult: GeneratedResult) => {
    setResult(newResult);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <PetNameForm onResult={handleResult} />

      <div className="bg-white rounded-2xl shadow-xl p-8">
        {result ? (
          <ResultsDisplay result={result} onReset={handleReset} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
