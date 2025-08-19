import { Camera, Heart, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function FeaturesSection() {
  const t = await getTranslations("FeaturesSection");

  const features = [
    {
      icon: Camera,
      title: t("aiAnalysis.title"),
      description: t("aiAnalysis.description"),
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Sparkles,
      title: t("personalizedNames.title"),
      description: t("personalizedNames.description"),
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      icon: Heart,
      title: t("instantResults.title"),
      description: t("instantResults.description"),
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
  ];

  return (
    <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
      {features.map((feature, index) => {
        const IconComponent = feature.icon;
        return (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
            <div
              className={`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
}
