import { ActionLink, GlassPanel, SprintShell } from "../components/sprint-shell";

const signals = ["Long-context agents", "AI-native workflows", "Evaluation as product moat"];

export default function FrontierInsightsPage() {
  return (
    <SprintShell
      eyebrow="AI Knowledge Hub"
      title="Frontier Insights"
      subtitle="Turn fast-moving AI updates into product opportunity points."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {signals.map((signal, index) => (
          <div className="soft-card min-h-[210px] p-5" key={signal}>
            <p className="text-[12px] font-black text-[#667067]">Signal 0{index + 1}</p>
            <h2 className="mt-4 text-[23px] font-black leading-[1.02]">{signal}</h2>
            <p className="mt-5 text-[14px] font-medium leading-[1.4] text-[#424b45]">
              Summarize what changed, who benefits, and what small product wedge could be tested this week.
            </p>
          </div>
        ))}
      </div>
      <GlassPanel className="mt-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <p className="text-[17px] font-bold">Output: one opportunity point that could become a mini AI product.</p>
          <ActionLink href="/project-build">Send To Project Build</ActionLink>
        </div>
      </GlassPanel>
    </SprintShell>
  );
}
