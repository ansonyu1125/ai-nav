export const contentTestProtocols = [
  {
    id: "writing-core-v1",
    cluster: "writing",
    version: 1,
    tasks: [
      { id: "rewrite", instruction: "Rewrite a 300-word source for a concise professional audience without changing facts.", evidenceToRecord: ["factual preservation", "tone control", "editing effort"] },
      { id: "long-form", instruction: "Create a structured 1,000-word draft from a five-point brief.", evidenceToRecord: ["structure", "repetition", "instruction adherence"] },
      { id: "grounding", instruction: "Summarize a supplied source and attach every factual claim to that source.", evidenceToRecord: ["unsupported claims", "citation clarity"] },
    ],
  },
  {
    id: "presentations-core-v1",
    cluster: "presentations",
    version: 1,
    tasks: [
      { id: "brief-to-deck", instruction: "Create a 10-slide sales presentation from a fixed brief.", evidenceToRecord: ["narrative", "layout variety", "editing effort"] },
      { id: "export", instruction: "Export the deck to every format available on the tested plan.", evidenceToRecord: ["formats", "watermarks", "formatting loss"] },
    ],
  },
  {
    id: "meetings-core-v1",
    cluster: "meetings",
    version: 1,
    tasks: [
      { id: "transcription", instruction: "Transcribe the shared 15-minute two-speaker recording.", evidenceToRecord: ["speaker accuracy", "proper nouns", "latency"] },
      { id: "actions", instruction: "Generate decisions and action items from the transcript.", evidenceToRecord: ["missed actions", "invented actions", "assignee accuracy"] },
    ],
  },
  {
    id: "research-core-v1",
    cluster: "research",
    version: 1,
    tasks: [
      { id: "cited-answer", instruction: "Answer a fixed market question using cited primary sources.", evidenceToRecord: ["citation validity", "source quality", "coverage"] },
      { id: "document-set", instruction: "Synthesize the shared five-document research pack.", evidenceToRecord: ["cross-document accuracy", "contradictions", "traceability"] },
    ],
  },
  {
    id: "image-editing-core-v1",
    cluster: "image-editing",
    version: 1,
    tasks: [
      { id: "background", instruction: "Remove and replace the background of the shared product image.", evidenceToRecord: ["edge quality", "manual corrections", "resolution"] },
      { id: "resize", instruction: "Create square, portrait, and landscape campaign variants.", evidenceToRecord: ["recomposition", "text safety", "export limits"] },
    ],
  },
]
