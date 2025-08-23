import { Heart } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Header() {
  const t = await getTranslations("Header");

  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
          <Heart className="size-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {t("title")}
        </h1>
      </div>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        {t("description")}
      </p>
    </div>
  );
}
