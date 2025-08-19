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
      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl 
               hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed 
               transition-all duration-200 flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <RefreshCw className="size-5 animate-spin" />
          {t("loading")}
        </>
      ) : (
        <>
          <Sparkles className="size-5" />
          {t("default")}
        </>
      )}
    </button>
  );
}
