import Link from "next/link";
import type { Tool } from "@/lib/types";
import { PRICING_LABEL } from "@/lib/types";
import { getVariantAlternatives, getVariantLinks, type ProductVariant } from "@/lib/product-variants";
import { variantConfig } from "@/lib/variant-config";
import { BilingualText, ZhOnlyText } from "./Bilingual";
import JsonLd from "./JsonLd";
import ProductTypeIcon from "./ProductTypeIcon";
import ProductVersionNav from "./ProductVersionNav";
import ToolLogo from "./ToolLogo";
import VariantCard from "./VariantCard";
import TrustDataPanel from "./TrustDataPanel";
import DataFeedback from "./DataFeedback";
import ScoreBreakdown from "./ScoreBreakdown";
import DecisionBrief from "./DecisionBrief";
import InternalLinkHub from "./InternalLinkHub";

function formatVisits(tool: Tool) {
  const visits = tool.traffic?.monthlyVisits;
  return visits == null ? null : `${visits.toLocaleString()}${tool.traffic?.visitsUnit ?? ""}`;
}

function description(tool: Tool, variant: ProductVariant, zh: boolean) {
  const name = tool.name;
  const copy = {
    web: zh ? `${name} 的官方网页版本。这里单独整理浏览器内使用方式、网页入口和网站信号，不与 App、插件或桌面端数据混用。` : `The official web edition of ${name}, with browser-based use, web destinations, and website signals kept separate from apps, plugins, and desktop software.`,
    app: zh ? `${name} 的官方移动版本。这里单独整理应用商店入口、安装方式和移动端使用信息。` : `The official mobile edition of ${name}, with store destinations, installation, and mobile usage kept separate.`,
    plugin: zh ? `${name} 的浏览器插件版本。插件商店、安装方式和权限信息均与网页版分开整理。` : `The browser plugin edition of ${name}, with extension-store destination, setup, and permission context kept separate.`,
    api: zh ? `${name} 的开发者 API 版本。这里只使用官方 API 文档入口，并单独整理接入、鉴权和开发者相关信息。` : `The developer API edition of ${name}, using its dedicated official API documentation and separate integration, authentication, and developer context.`,
    desktop: zh ? `${name} 的桌面客户端版本。这里单独整理官方下载入口、系统支持和本地安装信息。` : `The desktop edition of ${name}, with official downloads, operating-system support, and local installation information kept separate.`,
  };
  return copy[variant];
}

function usageSteps(tool: Tool, variant: ProductVariant) {
  const steps: Record<ProductVariant, Array<{ zh: string; en: string }>> = {
    web: [
      { zh: "打开官方网页入口并核对域名与品牌。", en: "Open the official web destination and verify the domain and brand." },
      { zh: `登录或注册 ${tool.name}，先查看免费额度和当前条款。`, en: `Sign in or register for ${tool.name}, then review current free access and terms.` },
      { zh: "在浏览器内完成任务；上传敏感内容前先查看隐私与数据使用政策。", en: "Complete the task in-browser and review privacy terms before uploading sensitive content." },
    ],
    app: [
      { zh: "选择设备对应的官方应用商店入口，并核对开发者和品牌 Logo。", en: "Choose the official store for your device and verify the publisher and brand logo." },
      { zh: `安装 ${tool.name} App，使用已有账号登录或按官方流程注册。`, en: `Install the ${tool.name} app, then sign in or follow its official registration flow.` },
      { zh: "使用移动端适配的拍摄、上传、通知或随身工作流程。", en: "Use mobile-specific capture, upload, notification, or on-the-go workflows." },
    ],
    plugin: [
      { zh: "打开官方插件商店，确认名称、开发者和权限说明。", en: "Open the official extension listing and verify its name, publisher, and permissions." },
      { zh: `安装 ${tool.name} 插件并固定到浏览器工具栏。`, en: `Install the ${tool.name} plugin and pin it to the browser toolbar.` },
      { zh: "在受支持网页中启动插件，处理页面或账户数据前核对权限范围。", en: "Launch it on supported pages and review permissions before sharing page or account data." },
    ],
    api: [
      { zh: "打开官方 API 文档，确认当前模型、端点、地区和价格。", en: "Open the official API docs and confirm current models, endpoints, regions, and pricing." },
      { zh: "按照官方方式创建凭证，并将密钥保存在服务端环境变量中。", en: "Create credentials through the official flow and keep keys in server-side environment variables." },
      { zh: "先用测试请求验证限流、错误处理和费用，再接入生产环境。", en: "Validate rate limits, error handling, and cost with test requests before production use." },
    ],
    desktop: [
      { zh: "打开官方下载页并选择对应操作系统版本。", en: "Open the official download page and choose the correct operating-system build." },
      { zh: `安装 ${tool.name}，核对发布者签名并登录官方账号。`, en: `Install ${tool.name}, verify the publisher signature, and sign in with the official account.` },
      { zh: "检查自动更新、本地文件访问和后台权限，再导入敏感内容。", en: "Review updates, local-file access, and background permissions before importing sensitive content." },
    ],
  };
  return steps[variant];
}

export default function VariantDetailPage({ tool, variant, siteUrl }: { tool: Tool; variant: ProductVariant; siteUrl: string }) {
  const config = variantConfig[variant];
  const links = getVariantLinks(tool, variant);
  const alternatives = getVariantAlternatives(tool, variant);
  const steps = usageSteps(tool, variant);
  const platforms = links.map((link) => link.platform).join(", ");
  const missingZh = "尚未核验";
  const missingEn = "Not yet verified";
  const latest = tool.latestMajorUpdate;

  const facts = [
    { zh: "产品形态", en: "Product type", zhValue: config.nameZh, enValue: config.nameEn },
    { zh: "官方入口", en: "Official destinations", zhValue: `${links.length} 个已记录入口`, enValue: `${links.length} recorded destination${links.length === 1 ? "" : "s"}` },
    { zh: "核心模型", en: "Model", zhValue: tool.model || missingZh, enValue: tool.modelEn || tool.model || missingEn },
    { zh: "价格模式", en: "Pricing", zhValue: tool.pricingNote || PRICING_LABEL[tool.pricing].zh, enValue: tool.pricingNoteEn || PRICING_LABEL[tool.pricing].en },
    { zh: "最近核验", en: "Last verified", zhValue: tool.lastChecked || missingZh, enValue: tool.lastChecked || missingEn },
    { zh: "价格核验", en: "Pricing last checked", zhValue: tool.pricingLastChecked || missingZh, enValue: tool.pricingLastChecked || missingEn },
    { zh: "重大更新", en: "Latest major update", zhValue: latest ? `${latest.date} · ${latest.title}` : missingZh, enValue: latest ? `${latest.date} · ${latest.titleEn || latest.title}` : missingEn },
    { zh: "可用国家", en: "Available countries", zhValue: tool.availableCountries?.join("、") || missingZh, enValue: tool.availableCountriesEn?.join(", ") || tool.availableCountries?.join(", ") || missingEn },
    { zh: "免费试用条件", en: "Free trial requirements", zhValue: tool.freeTrialRequirements || missingZh, enValue: tool.freeTrialRequirementsEn || tool.freeTrialRequirements || missingEn },
    { zh: "联盟披露", en: "Affiliate disclosure", zhValue: tool.affiliateDisclosure === "affiliate" ? "包含联盟链接" : tool.affiliateDisclosure === "none" ? "无联盟关系" : missingZh, enValue: tool.affiliateDisclosure === "affiliate" ? "Affiliate link" : tool.affiliateDisclosure === "none" ? "No affiliate relationship" : missingEn },
    { zh: "支持平台", en: "Supported platforms", zhValue: platforms || missingZh, enValue: platforms || missingEn },
    { zh: "发布年份", en: "Released", zhValue: tool.releaseYear ? String(tool.releaseYear) : missingZh, enValue: tool.releaseYear ? String(tool.releaseYear) : missingEn },
  ];

  const jsonLd = { "@context": "https://schema.org", "@type": variant === "api" ? "WebAPI" : "SoftwareApplication", name: `${tool.name} ${config.nameEn}`, description: description(tool, variant, false), url: `${siteUrl}/${config.route}/${tool.id}`, applicationCategory: config.nameEn, operatingSystem: platforms || undefined, downloadUrl: links[0]?.url };

  return <div className="bg-[#f2f4ef] text-[#0b1b17]">
    <JsonLd data={jsonLd} />
    <section className="border-b border-[#29473e] bg-[#07110f] text-white"><div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#8fa69e]"><Link href="/" className="hover:text-white"><BilingualText zh="首页" en="Home" /></Link><span>/</span><Link href={`/${config.route}`} className="hover:text-white"><BilingualText zh={config.nameZh} en={config.nameEn} /></Link><span>/</span><span className="text-white">{tool.name}</span></nav>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start"><div><div className="flex flex-col gap-5 sm:flex-row sm:items-start"><div className="relative w-fit"><ToolLogo tool={tool} size="lg" /><span className="absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center border-2 border-[#07110f]" style={{ backgroundColor: config.accent, color: "#07110f" }} title={config.nameEn}><ProductTypeIcon type={variant} className="h-5 w-5" /></span></div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{tool.name}</h1><span className="inline-flex h-7 items-center gap-1.5 border px-2 font-mono text-xs font-semibold uppercase" style={{ borderColor: config.accent, color: config.accent }}><ProductTypeIcon type={variant} className="h-3.5 w-3.5" /><BilingualText zh={config.nameZh} en={config.nameEn} /></span></div>{tool.nameZh && tool.nameZh !== tool.name && <ZhOnlyText zh={tool.nameZh} className="mt-2 text-[#9fb3ac]" />}<p className="mt-5 max-w-3xl text-lg leading-8 text-[#b8c8c2]"><BilingualText zh={description(tool, variant, true)} en={description(tool, variant, false)} /></p></div></div><div className="mt-8"><ProductVersionNav tool={tool} current={variant} /></div></div>
        <div className="border border-[#315148] bg-[#0a1815] p-5"><div className="text-sm font-semibold text-white"><BilingualText zh={config.destinationZh} en={config.destinationEn} /></div><div className="mt-4 grid gap-2">{links.map((link) => <a key={`${link.platform}-${link.url}`} href={link.url} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-between gap-4 px-4 font-semibold text-[#07110f] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#7dd3fc]" style={{ backgroundColor: config.accent }}><span>{link.nameEn ?? link.name ?? config.nameEn}</span><span className="font-mono text-xs uppercase">{link.platform}</span></a>)}</div><p className="mt-4 text-xs leading-5 text-[#839b93]"><BilingualText zh="按钮直接打开这一产品形态对应的官方入口，不使用其他版本的普通主页替代。" en="Each button opens the official destination for this product format; another version's general homepage is never substituted." /></p></div>
      </div>
    </div></section>

    <div className="sticky top-16 z-30 border-b border-[#c2cbc5] bg-[#f2f4ef]/95"><nav className="mx-auto flex max-w-6xl gap-7 overflow-x-auto px-5 sm:px-8">{[["product-information", "产品信息", "Product information"], ["usage-signals", "接入与使用", "Setup & usage"], ["alternatives", "替代品", "Alternatives"]].map(([id, zh, en], index) => <a key={id} href={`#${id}`} className={`shrink-0 border-b-2 py-4 text-sm font-semibold ${index === 0 ? "border-[#285c4c] text-[#285c4c]" : "border-transparent text-[#68766f] hover:text-[#0b1b17]"}`}><BilingualText zh={zh} en={en} /></a>)}</nav></div>

    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <section id="product-information" className="scroll-mt-36"><div className="grid gap-8 lg:grid-cols-[.55fr_1.45fr]"><div><h2 className="text-3xl font-semibold"><BilingualText zh={`${config.nameZh}信息`} en={`${config.nameEn} information`} /></h2><p className="mt-4 max-w-md leading-7 text-[#596761]"><BilingualText zh="所有详情页使用同一组必填字段。无法确认的数据保留位置并标记为尚未核验。" en="Every detail page uses the same required fields. Unconfirmed data keeps its place and is marked as not yet verified." /></p></div><dl className="grid border-t border-[#9eaaa4] sm:grid-cols-2">{facts.map((fact) => <div key={fact.en} className="border-b border-[#c2cbc5] py-5 sm:px-4"><dt className="text-xs font-semibold uppercase text-[#68766f]"><BilingualText zh={fact.zh} en={fact.en} /></dt><dd className="mt-2 font-medium"><BilingualText zh={fact.zhValue} en={fact.enValue} /></dd></div>)}</dl></div></section>
      <DecisionBrief tool={tool} variant={variant} /><TrustDataPanel tool={tool} /><ScoreBreakdown tool={tool} /><InternalLinkHub tool={tool} />
      <section id="usage-signals" className="scroll-mt-36 border-t border-[#9eaaa4] py-14"><h2 className="text-3xl font-semibold"><BilingualText zh="接入、安装与使用信号" en="Setup, access & usage signals" /></h2><div className="mt-7 grid gap-px bg-[#c2cbc5] md:grid-cols-3"><div className="bg-[#e7ebe6] p-5"><div className="font-mono text-2xl font-semibold">{links.length}</div><div className="mt-1 text-sm text-[#596761]"><BilingualText zh="专属官方入口" en="Format-specific official destinations" /></div></div><div className="bg-[#e7ebe6] p-5"><div className="text-lg font-semibold"><BilingualText zh="尚未核验" en="Not yet verified" /></div><div className="mt-1 text-sm text-[#596761]"><BilingualText zh="安装量、调用量或活跃用户" en="Installs, API usage, or active users" /></div></div><div className="bg-[#e7ebe6] p-5"><div className="text-lg font-semibold">{formatVisits(tool) ?? <BilingualText zh="尚未核验" en="Not yet verified" />}</div><div className="mt-1 text-sm text-[#596761]"><BilingualText zh="官网流量（不替代产品使用量）" en="Website traffic (not product usage)" /></div></div></div><p className="mt-4 text-sm leading-6 text-[#68766f]"><BilingualText zh="安装、调用和活跃用户数据只有在能追溯到官方或可信来源时才会显示；网站访问量不会冒充产品使用量。" en="Install, request, and active-user figures appear only when traceable to an official or trusted source. Website visits are never substituted for product usage." /></p>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">{steps.map((step, index) => <li key={step.en} className="border-t-2 border-[#285c4c] bg-white p-5"><span className="font-mono text-xs text-[#68766f]">0{index + 1}</span><p className="mt-4 leading-7 text-[#33443e]"><BilingualText zh={step.zh} en={step.en} /></p></li>)}</ol>
      </section>
      <section id="alternatives" className="scroll-mt-36 border-t border-[#9eaaa4] pt-14"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-3xl font-semibold"><BilingualText zh="同形态替代品" en="Same-format alternatives" /></h2><p className="mt-3 text-[#596761]"><BilingualText zh="只推荐拥有同类专属官方入口的产品。" en="Only products with a dedicated official destination in the same format are included." /></p></div><Link href={`/${config.route}`} className="font-semibold text-[#285c4c] hover:text-[#0b1b17]"><BilingualText zh="查看全部" en="View all" /></Link></div>{alternatives.length > 0 ? <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{alternatives.map((alternative) => <VariantCard key={alternative.id} tool={alternative} variant={variant} />)}</div> : <div className="mt-7 border border-[#c2cbc5] bg-[#e7ebe6] p-6 text-[#596761]"><BilingualText zh="当前分类暂无其他已核验的同形态产品。" en="No other verified products in this format are available in the same category yet." /></div>}</section>
      <div className="mt-14"><DataFeedback toolId={tool.id} /></div>
    </main>
  </div>;
}


