import type { Tool } from "@/lib/types";
import { BilingualText } from "./Bilingual";

export default function TrustDataPanel({ tool }: { tool: Tool }) {
  const rows = [
    {
      labelZh: "最近核验",
      labelEn: "Last verified",
      valueZh: tool.lastChecked ?? "尚未记录",
      valueEn: tool.lastChecked ?? "Not recorded",
    },
    {
      labelZh: "价格检查时间",
      labelEn: "Pricing last checked",
      valueZh: tool.pricingLastChecked ?? "尚未单独核验",
      valueEn: tool.pricingLastChecked ?? "Not separately verified",
    },
    {
      labelZh: "最近重大更新",
      labelEn: "Latest major update",
      valueZh: tool.latestMajorUpdate ? `${tool.latestMajorUpdate.date} · ${tool.latestMajorUpdate.title}` : "尚未记录",
      valueEn: tool.latestMajorUpdate ? `${tool.latestMajorUpdate.date} · ${tool.latestMajorUpdate.titleEn ?? tool.latestMajorUpdate.title}` : "Not recorded",
    },
    {
      labelZh: "联盟关系披露",
      labelEn: "Affiliate disclosure",
      valueZh:
        tool.affiliateDisclosure === "affiliate"
          ? "链接可能产生佣金"
          : tool.affiliateDisclosure === "none"
            ? "无联盟链接"
            : "当前未记录联盟关系",
      valueEn:
        tool.affiliateDisclosure === "affiliate"
          ? "Links may earn commission"
          : tool.affiliateDisclosure === "none"
            ? "No affiliate link"
            : "No affiliate relationship recorded",
    },
    {
      labelZh: "可用国家/地区",
      labelEn: "Available countries",
      valueZh: tool.availableCountries?.join("、") ?? "尚未整理",
      valueEn: tool.availableCountriesEn?.join(", ") ?? tool.availableCountries?.join(", ") ?? "Not mapped",
    },
    {
      labelZh: "免费试用条件",
      labelEn: "Free trial requirements",
      valueZh: tool.freeTrialRequirements ?? "请在官方页面确认",
      valueEn: tool.freeTrialRequirementsEn ?? tool.freeTrialRequirements ?? "Check current official terms",
    },
  ];

  return (
    <section className="border-y border-[#9eaaa4] py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#0b1b17]">
            <BilingualText zh="数据新鲜度与披露" en="Data freshness & disclosure" />
          </h2>
          <p className="mt-2 text-sm text-[#596761]">
            <BilingualText zh="缺失数据会明确标记，不用推测值填充。" en="Missing data stays visibly marked instead of being filled with assumptions." />
          </p>
        </div>
        <span className="font-mono text-xs uppercase text-[#68766f]">Evidence record</span>
      </div>
      <dl className="mt-6 grid border-t border-[#c2cbc5] sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((row) => (
          <div key={row.labelEn} className="border-b border-[#c2cbc5] py-5 sm:px-4">
            <dt className="text-xs font-semibold uppercase text-[#68766f]">
              <BilingualText zh={row.labelZh} en={row.labelEn} />
            </dt>
            <dd className="mt-2 text-sm font-medium leading-6 text-[#273a33]">
              <BilingualText zh={row.valueZh} en={row.valueEn} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
