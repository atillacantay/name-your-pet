interface SectionHeaderProps {
  title: string;
  subtitle: string;
  headingId?: string;
  titleSize?: "large" | "medium";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function SectionHeader({
  title,
  subtitle,
  headingId,
  titleSize = "large",
  maxWidth = "2xl",
}: SectionHeaderProps) {
  const titleClasses =
    titleSize === "large"
      ? "text-3xl font-bold text-gray-900 mb-4"
      : "text-2xl font-bold text-gray-900 mb-4";

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div className="text-center mb-16">
      <h2 id={headingId} className={titleClasses}>
        {title}
      </h2>
      <p
        className={`text-lg text-gray-600 ${maxWidthClasses[maxWidth]} mx-auto leading-relaxed`}
      >
        {subtitle}
      </p>
    </div>
  );
}
