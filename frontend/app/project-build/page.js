import { ActionLink, GlassPanel, SprintShell } from "../components/sprint-shell";

const steps = ["Pick direction", "Define user", "Design MVP", "Write PRD", "Plan AI capability", "Build demo"];

export default function ProjectBuildPage() {
  return (
    <SprintShell
      eyebrow="Bottom Tool"
      title="Project Build"
      subtitle="Transform daily learning outputs into a coherent AI PM portfolio project."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <GlassPanel>
          <h2 className="text-[22px] font-black">Build Pipeline</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {steps.map((step, index) => (
              <div className="rounded-[12px] bg-white/58 p-4" key={step}>
                <p className="text-[12px] font-black text-[#667067]">Step 0{index + 1}</p>
                <h3 className="mt-2 text-[17px] font-black">{step}</h3>
              </div>
            ))}
          </div>
        </GlassPanel>
        <div className="resume-card p-5">
          <h2 className="text-[22px] font-black">Current Project</h2>
          <p className="mt-5 text-[18px] font-black leading-[1.2]">AI learning assistant for zero-base PM candidates</p>
          <p className="mt-4 text-[14px] font-medium leading-[1.4] text-[#424b45]">
            Use today&apos;s RAG concept to design a searchable learning memory.
          </p>
          <div className="mt-6">
            <ActionLink href="/frontier-insights">Add Insight</ActionLink>
          </div>
        </div>
      </div>
    </SprintShell>
  );
}
