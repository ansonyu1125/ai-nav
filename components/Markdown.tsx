import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      parts.push(<code key={key++}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("[")) {
      const inner = token.slice(1, -1);
      const sep = inner.indexOf("](");
      const label = inner.slice(0, sep);
      const href = inner.slice(sep + 2);
      parts.push(
        <a key={key++} href={href} target="_blank" rel="noreferrer">
          {label}
        </a>,
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function isBlockStart(line: string): boolean {
  return (
    line.startsWith("## ") ||
    line.startsWith("### ") ||
    line.startsWith("> ") ||
    line.startsWith("- ") ||
    line.startsWith("* ") ||
    /^\d+\.\s/.test(line)
  );
}

export default function Markdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(<h3 key={key++}>{renderInline(line.slice(4))}</h3>);
      i++;
    } else if (line.startsWith("## ")) {
      blocks.push(<h2 key={key++}>{renderInline(line.slice(3))}</h2>);
      i++;
    } else if (line.startsWith("> ")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quote.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <blockquote key={key++}>
          {quote.map((q, qi) => (
            <p key={qi}>{renderInline(q)}</p>
          ))}
        </blockquote>,
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (lines[i].startsWith("- ") || lines[i].startsWith("* "))
      ) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <ul key={key++}>
          {items.map((it, ii) => (
            <li key={ii}>{renderInline(it)}</li>
          ))}
        </ul>,
      );
    } else if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push(
        <ol key={key++}>
          {items.map((it, ii) => (
            <li key={ii}>{renderInline(it)}</li>
          ))}
        </ol>,
      );
    } else {
      const para: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim() !== "" &&
        !isBlockStart(lines[i])
      ) {
        para.push(lines[i]);
        i++;
      }
      blocks.push(
        <p key={key++}>
          {para.map((p, pi) => (
            <span key={pi}>
              {pi > 0 && <br />}
              {renderInline(p)}
            </span>
          ))}
        </p>,
      );
    }
  }

  return <div className="prose">{blocks}</div>;
}
