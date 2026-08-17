import type { TutorialTrack } from "@/data/tutorial-relations";

export default function TutorialIcon({ track, className = "h-5 w-5" }: { track: TutorialTrack; className?: string }) {
  const paths: Record<TutorialTrack, React.ReactNode> = {
    "getting-started": <><path d="M5 19V7l7-4 7 4v12" /><path d="M9 21v-8h6v8M3 21h18" /></>,
    "how-to-use": <><path d="M4 5h16v14H4z" /><path d="m9 9 4 3-4 3M14 15h3" /></>,
    pricing: <><path d="M12 3v18M16 7.5C16 5.6 14.2 5 12 5S8 5.8 8 7.5s1.8 2.3 4 2.7 4 1 4 3.2S14.2 17 12 17s-4-.7-4-2.7" /></>,
    workflows: <><path d="M5 4h5v5H5zM14 15h5v5h-5z" /><path d="M10 6.5h5a2 2 0 0 1 2 2V15M14 17.5H9a2 2 0 0 1-2-2V9" /></>,
    troubleshooting: <><path d="M12 3 2.8 19h18.4z" /><path d="M12 9v4M12 16h.01" /></>,
    "commercial-use": <><path d="M4 8h16v11H4zM8 8V5h8v3" /><path d="M4 12h16M10 12v2h4v-2" /></>,
    alternatives: <><path d="M4 7h13M14 4l3 3-3 3M20 17H7M10 14l-3 3 3 3" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">{paths[track]}</svg>;
}
