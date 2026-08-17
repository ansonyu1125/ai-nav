"use client";

import { useState } from "react";
import { BilingualText } from "./Bilingual";

const issueOptions = [
  { id: "pricing", zh: "报告价格过期", en: "Report outdated pricing" },
  { id: "broken-link", zh: "报告链接失效", en: "Report broken link" },
  { id: "update", zh: "建议更新", en: "Suggest an update" },
] as const;

export default function DataFeedback({ toolId }: { toolId: string }) {
  const [issueType, setIssueType] = useState<(typeof issueOptions)[number]["id"]>("pricing");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ toolId, issueType, message, email }),
    });
    setStatus(response.ok ? "sent" : "error");
    if (response.ok) setMessage("");
  }

  return (
    <section className="border border-[#c2cbc5] bg-[#e7ebe6] p-5 sm:p-6">
      <h2 className="text-xl font-semibold text-[#0b1b17]">
        <BilingualText zh="发现数据问题？" en="Found a data issue?" />
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#596761]">
        <BilingualText zh="提交内容会进入待审核队列，核实后才会更新页面。" en="Reports enter a review queue and are published only after verification." />
      </p>
      <form onSubmit={submit} className="mt-5">
        <div className="flex flex-wrap gap-2">
          {issueOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setIssueType(option.id)}
              className={`min-h-10 border px-3 text-sm font-semibold ${
                issueType === option.id
                  ? "border-[#285c4c] bg-[#285c4c] text-white"
                  : "border-[#9eaaa4] bg-transparent text-[#33443e] hover:bg-white"
              }`}
            >
              <BilingualText zh={option.zh} en={option.en} />
            </button>
          ))}
        </div>
        <label className="mt-4 block">
          <span className="text-sm font-semibold"><BilingualText zh="具体情况" en="What should we check?" /></span>
          <textarea
            required
            minLength={8}
            maxLength={2000}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="mt-2 min-h-28 w-full border border-[#9eaaa4] bg-white p-3 text-sm focus:border-[#285c4c] focus:outline-none"
            placeholder="Include the current price, broken destination, or a source URL."
          />
        </label>
        <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <label>
            <span className="sr-only">Email (optional)</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-h-11 w-full border border-[#9eaaa4] bg-white px-3 text-sm focus:border-[#285c4c] focus:outline-none"
              placeholder="Email for follow-up (optional)"
            />
          </label>
          <button disabled={status === "sending"} className="min-h-11 bg-[#d9f99d] px-5 font-semibold text-[#07110f] disabled:cursor-wait disabled:opacity-60">
            <BilingualText zh={status === "sending" ? "提交中..." : "提交审核"} en={status === "sending" ? "Sending..." : "Submit for review"} />
          </button>
        </div>
        {status === "sent" && <p className="mt-3 text-sm font-semibold text-[#146640]"><BilingualText zh="已提交，感谢你的反馈。" en="Submitted. Thank you for helping us verify it." /></p>}
        {status === "error" && <p className="mt-3 text-sm font-semibold text-[#9b3e38]"><BilingualText zh="暂时无法提交，请稍后再试。" en="Unable to submit right now. Please try again later." /></p>}
      </form>
    </section>
  );
}
