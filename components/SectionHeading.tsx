import Link from "next/link";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkText?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  href,
  linkText = "查看全部",
}: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
        >
          {linkText} →
        </Link>
      )}
    </div>
  );
}
