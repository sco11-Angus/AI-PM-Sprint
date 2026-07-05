import { ActionLink, GlassPanel, SprintShell } from "../components/sprint-shell";

export default function AiAskPage() {
  return (
    <SprintShell
      eyebrow="Bottom Tool"
      title="AI Ask"
      subtitle="A lightweight Q&A surface for learning blockers during the sprint."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassPanel>
          <h2 className="text-[22px] font-black">Ask Anything</h2>
          <div className="mt-5 min-h-[260px] rounded-[12px] bg-white/62 p-4 text-[15px] font-medium text-[#737b75]">
            What is confusing in today&apos;s sprint?
          </div>
          <div className="mt-5">
            <ActionLink href="/ai-ask">Send Question</ActionLink>
          </div>
        </GlassPanel>
        <div className="soft-card p-5">
          <h2 className="text-[22px] font-black">Quick Starters</h2>
          <div className="mt-5 grid gap-3">
            {["Give me an example", "Compare two concepts", "Challenge my answer", "Make it interview-ready"].map((item) => (
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
