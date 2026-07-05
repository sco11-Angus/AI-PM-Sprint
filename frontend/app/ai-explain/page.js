import { GlassPanel, SprintShell, WhiteActionLink } from "../components/sprint-shell";

export default function AiExplainPage() {
  return (
    <SprintShell
      eyebrow="Bottom Tool"
      title="AI Explain"
      subtitle="Turn a hard AI concept into a simple explanation, product analogy, and practical example."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassPanel>
          <h2 className="text-[22px] font-black">Explain Prompt</h2>
          <div className="mt-5 min-h-[190px] rounded-[12px] bg-white/62 p-4 text-[15px] font-medium text-[#737b75]">
            Explain RAG to a beginner AI product manager...
          </div>
          <div className="mt-5">
            <WhiteActionLink href="/technical-card">Use Today&apos;s Card</WhiteActionLink>
          </div>
        </GlassPanel>
        <div className="soft-card p-5">
          <h2 className="text-[22px] font-black">Answer Shape</h2>
          <div className="mt-5 grid gap-3">
            {["One-line explanation", "How it works", "When to use it", "Common product risk"].map((item) => (
              <div className="rounded-[10px] bg-white/46 px-4 py-3 text-[15px] font-bold" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SprintShell>
  );
}
