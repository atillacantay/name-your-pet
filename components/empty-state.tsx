import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EmptyState() {
  const t = useTranslations("EmptyState");

  return (
    <section
      className="text-center py-12 relative"
      role="status"
      aria-live="polite"
    >
      <div className="relative mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6 relative overflow-hidden">
          <Heart
            className="size-12 text-gray-500 animate-pulse"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{t("title")}</h2>

        <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
          {t("description")}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 max-w-sm mx-auto">
          <div className="flex items-center text-left space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
            <div className="size-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
              1
            </div>
            <span className="text-sm text-gray-700">{t("steps.upload")}</span>
          </div>

          <div className="flex items-center text-left space-x-3 p-3 bg-pink-50 rounded-lg border border-pink-100">
            <div className="size-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
              2
            </div>
            <span className="text-sm text-gray-700">{t("steps.analyze")}</span>
          </div>

          <div className="flex items-center text-left space-x-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
            <div className="size-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
              3
            </div>
            <span className="text-sm text-gray-700">{t("steps.results")}</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
          <p className="text-sm text-gray-600 font-medium">
            {t("encouragement")}
          </p>
        </div>
      </div>
    </section>
  );
}
