// 通用 JSON-LD 结构化数据注入：利于 Google 富摘要与 AI 引擎（GEO）提取。
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
