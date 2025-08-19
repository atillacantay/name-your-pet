import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EmptyState() {
  const t = useTranslations("EmptyState");

  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Heart className="w-12 h-12 text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-600 mb-2">{t("title")}</h2>
      <p className="text-gray-500">{t("description")}</p>
    </div>
  );
}
