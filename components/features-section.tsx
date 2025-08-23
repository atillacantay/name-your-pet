import {
  Brain,
  Camera,
  Clock,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import FeatureCard from "./ui/feature-card";
import MiniFeatureCard from "./ui/mini-feature-card";
import SectionHeader from "./ui/section-header";

export default async function FeaturesSection() {
  const t = await getTranslations("FeaturesSection");

  const mainFeatures = [
    {
      icon: Brain,
      title: t("aiAnalysis.title"),
      description: t("aiAnalysis.description"),
      bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      icon: Sparkles,
      title: t("personalizedNames.title"),
      description: t("personalizedNames.description"),
      bgColor: "bg-gradient-to-br from-pink-100 to-pink-200",
      iconColor: "text-pink-600",
      borderColor: "border-pink-200",
    },
    {
      icon: Zap,
      title: t("instantResults.title"),
      description: t("instantResults.description"),
      bgColor: "bg-gradient-to-br from-indigo-100 to-indigo-200",
      iconColor: "text-indigo-600",
      borderColor: "border-indigo-200",
    },
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: t("additionalFeatures.privacy.title"),
      description: t("additionalFeatures.privacy.description"),
      iconColor: "text-green-600",
    },
    {
      icon: Users,
      title: t("additionalFeatures.multiLanguage.title"),
      description: t("additionalFeatures.multiLanguage.description"),
      iconColor: "text-blue-600",
    },
    {
      icon: Camera,
      title: t("additionalFeatures.smartUpload.title"),
      description: t("additionalFeatures.smartUpload.description"),
      iconColor: "text-orange-600",
    },
    {
      icon: Clock,
      title: t("additionalFeatures.lightningFast.title"),
      description: t("additionalFeatures.lightningFast.description"),
      iconColor: "text-teal-600",
    },
  ];

  return (
    <section className="py-16 px-4" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          headingId="features-heading"
          title={t("howItWorks.title")}
          subtitle={t("howItWorks.subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              bgColor={feature.bgColor}
              iconColor={feature.iconColor}
              borderColor={feature.borderColor}
              stepNumber={index + 1}
            />
          ))}
        </div>

        <SectionHeader
          title={t("whyChoose.title")}
          subtitle={t("whyChoose.subtitle")}
          titleSize="medium"
          maxWidth="xl"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, index) => (
            <MiniFeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconColor={feature.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
