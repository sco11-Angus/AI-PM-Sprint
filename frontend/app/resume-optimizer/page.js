import { ActionLink, GlassPanel, SprintShell } from "../components/sprint-shell";

export default function ResumeOptimizerPage() {
  return (
    <SprintShell
      eyebrow="AI Career Sprint Hub"
      title="JD Resume Optimizar"
      subtitle="A guided workspace for matching a resume story to a target AI PM role."
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="resume-card p-5">
          <h2 className="text-[22px] font-black">Input Zone</h2>
          <div className="mt-5 flex h-[70px] items-center justify-center rounded-[10px] border border-dashed border-[#d7d9ca] bg-white/35 text-[16px] font-black">
            ↥ Upload File
          </div>
          <div className="mt-4 flex h-[110px] items-start rounded-[10px] bg-white px-4 py-4 text-[14px] text-[#9a9a9a] shadow-[0_1px_4px_rgba(0,0,0,0.07)]">
            Paste target JD
          </div>
          <div className="mt-5">
            <ActionLink href="/resume-optimizer">Optimize Resume</ActionLink>
          </div>
        </div>
        <GlassPanel>
          <h2 className="text-[22px] font-black">Optimization Checklist</h2>
          <div className="mt-5 grid gap-3">
            {["AI product keywords", "Project impact evidence", "Interview-ready story", "Missing proof points"].map((item) => (
              <div className="rounded-[10px] bg-white/58 px-4 py-3 text-[15px] font-bold" key={item}>
                {item}
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </SprintShell>
  );
}
