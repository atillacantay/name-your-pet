import { LucideIcon } from "lucide-react";

interface MiniFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
}

export default function MiniFeatureCard({
  icon: IconComponent,
  title,
  description,
  iconColor,
}: MiniFeatureCardProps) {
  return (
    <article className="bg-gray-50 rounded-xl p-6 text-center hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="size-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
        <IconComponent className={`size-6 ${iconColor}`} aria-hidden="true" />
      </div>

      <p className="font-semibold text-gray-900 mb-2 text-sm">{title}</p>

      <p className="text-gray-600 text-xs leading-relaxed">{description}</p>
    </article>
  );
}
