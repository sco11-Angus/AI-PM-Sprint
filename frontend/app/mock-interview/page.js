import { ActionLink, GlassPanel, SprintShell } from "../components/sprint-shell";

const modes = ["Technical", "Product Sense", "Project Deep Dive"];

export default function MockInterviewPage() {
  return (
    <SprintShell
      eyebrow="AI Career Sprint Hub"
      title="AI Mock Interview"
      subtitle="Practice realistic AI PM interview questions with structured feedback."
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="interview-card p-5">
          <h2 className="text-[22px] font-black">Interview Modes</h2>
          <div className="mt-5 grid gap-3">
            {modes.map((mode) => (
              <button className="h-[44px] rounded-[9px] bg-white/55 text-[15px] font-black" key={mode}>
                {mode}
              </button>
            ))}
          </div>
          <div className="mt-5">
            <ActionLink href="/mock-interview">Start Mock Interview</ActionLink>
          </div>
        </div>
        <GlassPanel>
          <h2 className="text-[22px] font-black">Question Queue</h2>
          <div className="mt-5 grid gap-4">
            {[
              "Explain RAG to a non-technical stakeholder.",
              "Design a daily AI learning assistant for students.",
              "What metrics prove this feature is working?",
            ].map((question) => (
              <div className="rounded-[12px] bg-white/58 p-4 text-[16px] font-bold leading-[1.35]" key={question}>
                {question}
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </SprintShell>
  );
}
