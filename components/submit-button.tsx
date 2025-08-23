import { RefreshCw, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

interface SubmitButtonProps {
  isLoading: boolean;
  disabled: boolean;
}

export default function SubmitButton({
  isLoading,
  disabled,
}: SubmitButtonProps) {
  const t = useTranslations("SubmitButton");

  return (
    <button
      type="submit"
      disabled={disabled}
      aria-describedby={isLoading ? "submit-status" : undefined}
      className="group relative w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-5 px-6 rounded-xl 
               hover:from-purple-700 hover:to-pink-700 focus:from-purple-700 focus:to-pink-700
               disabled:opacity-50 disabled:cursor-not-allowed 
               transition-all duration-300 flex items-center justify-center gap-3
               focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
               min-h-[3.5rem] transform hover:scale-[1.02] disabled:hover:scale-100
               shadow-lg hover:shadow-xl disabled:shadow-md"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative flex items-center justify-center gap-3">
        {isLoading ? (
          <>
            <RefreshCw className="size-6 animate-spin" aria-hidden="true" />
            <span id="submit-status" className="text-lg">
              {t("loading")}
            </span>
          </>
        ) : (
          <>
            <Sparkles
              className="size-6 group-hover:animate-pulse"
              aria-hidden="true"
            />
            <span className="text-lg">{t("default")}</span>
          </>
        )}
      </div>

      {!disabled && !isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
      )}
    </button>
  );
}
