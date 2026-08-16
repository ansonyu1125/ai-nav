import { REGION_LABEL, type Region } from "@/lib/types";

const styles: Record<Region, string> = {
  domestic: "bg-teal-50 text-teal-700 ring-teal-600/20",
  overseas: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
};

export default function RegionBadge({ region }: { region: Region }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[region]}`}
    >
      {REGION_LABEL[region]}
    </span>
  );
}
