import { ActionLink, GlassPanel, SprintShell, WhiteActionLink } from "../../components/sprint-shell";

const tasks = [
  ["Concept", "Explain RAG in one plain sentence"],
  ["Thinking", "Where would retrieval improve a learning product?"],
  ["Practice", "Draft a small knowledge-base workflow"],
  ["Output", "Write one product opportunity from today's learning"],
];

export default function DaySevenPage() {
  return (
    <SprintShell
      eyebrow="Day 7 Tasks"
      title="RAG Product Sense Sprint"
      subtitle="A focused daily workspace for concept input, product thinking, hands-on practice, and a concrete written output."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassPanel>
          <h2 className="text-[22px] font-black">Today&apos;s Sprint Board</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {tasks.map(([label, body], index) => (
              <div className="soft-card min-h-[140px] p-4" key={label}>
                <p className="text-[12px] font-black text-[#667067]">0{index + 1}</p>
                <h3 className="mt-2 text-[18px] font-black">{label}</h3>
                <p className="mt-3 text-[14px] font-medium leading-[1.35] text-[#38413b]">{body}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel>
          <h2 className="text-[22px] font-black">Submission Draft</h2>
          <div className="mt-5 min-h-[220px] rounded-[12px] bg-white/62 p-4 text-[14px] font-medium leading-[1.45] text-[#707872] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            One sentence for a non-technical teammate...
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <WhiteActionLink href="/technical-card">Open Tech Card</WhiteActionLink>
            <ActionLink href="/ai-explain">Ask AI Explain</ActionLink>
          </div>
        </GlassPanel>
      </div>
    </SprintShell>
  );
}
