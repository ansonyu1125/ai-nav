"use client";

import { useState } from "react";
import { BilingualText } from "./Bilingual";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    const response = await fetch("/api/subscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }) });
    setStatus(response.ok ? "sent" : "error");
    if (response.ok) setEmail("");
  }
  return (
    <section className="border-t border-[#315148] bg-[#0a1815] px-5 py-12 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[1fr_.8fr] lg:items-end">
        <div>
          <h2 className="text-3xl font-semibold"><BilingualText zh="每周 3 款值得尝试的工具" en="Three tools worth trying each week" /></h2>
          <p className="mt-3 max-w-2xl leading-7 text-[#9fb3ac]"><BilingualText zh="获取重要价格变化、免费试用、优惠和任务型工具组合，不发送普通新闻摘要。" en="Get meaningful price changes, free trials, deals, and task-based tool stacks—not a generic news digest." /></p>
        </div>
        <form onSubmit={submit} className="grid grid-cols-[minmax(0,1fr)_auto] bg-[#f4f4ef] p-1.5">
          <label><span className="sr-only">Email</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-12 w-full bg-transparent px-3 text-[#0b1b17] placeholder:text-[#68766f] focus:outline-none" /></label>
          <button disabled={status === "sending"} className="bg-[#d9f99d] px-5 font-semibold text-[#07110f] disabled:opacity-60"><BilingualText zh="订阅" en="Subscribe" /></button>
        </form>
        {status === "sent" && <p className="text-sm text-[#d9f99d]"><BilingualText zh="订阅成功。" en="You're subscribed." /></p>}
        {status === "error" && <p className="text-sm text-[#f2a59e]"><BilingualText zh="暂时无法订阅，请稍后再试。" en="Unable to subscribe right now." /></p>}
      </div>
    </section>
  );
}
