import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
  borderColor: string;
  stepNumber?: number;
}

export default function FeatureCard({
  icon: IconComponent,
  title,
  description,
  bgColor,
  iconColor,
  borderColor,
  stepNumber,
}: FeatureCardProps) {
  return (
    <article
      className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border-2 ${borderColor} transition-all duration-300 hover:scale-105`}
    >
      {stepNumber && (
        <div className="absolute -top-4 left-8">
          <div className="bg-white border-2 border-gray-300 rounded-full size-8 flex items-center justify-center text-sm font-bold text-gray-600">
            {stepNumber}
          </div>
        </div>
      )}

      <div
        className={`size-16 ${bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
        aria-hidden="true"
      >
        <IconComponent className={`size-8 ${iconColor}`} />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
        {title}
      </h3>

      <p className="text-gray-600 text-center leading-relaxed">{description}</p>

      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
    </article>
  );
}
