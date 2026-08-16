import Link from "next/link";
import { BilingualText } from "@/components/Bilingual";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <div className="text-6xl">🧭</div>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        <BilingualText zh="页面不存在" en="Page not found" />
      </h1>
      <p className="mt-2 text-slate-500">
        <BilingualText
          zh="你访问的页面不存在或已被移动。"
          en="The page you are looking for does not exist or has moved."
        />
      </p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-indigo-600 px-6 py-2.5 font-medium text-white transition hover:bg-indigo-700"
      >
        <BilingualText zh="返回首页" en="Back to home" />
      </Link>
    </div>
  );
}
