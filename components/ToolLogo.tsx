import type { Tool } from "@/lib/types";

interface ToolLogoProps {
  tool: Tool;
  size?: "sm" | "md" | "lg";
}

const SIZE = {
  sm: { box: "h-8 w-8", emoji: "text-lg" },
  md: { box: "h-12 w-12", emoji: "text-2xl" },
  lg: { box: "h-20 w-20", emoji: "text-5xl" },
};

export default function ToolLogo({ tool, size = "md" }: ToolLogoProps) {
  const s = SIZE[size];
  return (
    <div
      className={`flex shrink-0 items-center justify-center border border-[#c6d0ca] bg-white p-1.5 ${s.box}`}
    >
      {tool.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tool.logo}
          alt={tool.name}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      ) : (
        <span className={s.emoji}>{tool.emoji}</span>
      )}
    </div>
  );
}
