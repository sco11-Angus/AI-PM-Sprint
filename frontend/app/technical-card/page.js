import { ActionLink, GlassPanel, SprintShell } from "../components/sprint-shell";

export default function TechnicalCardPage() {
  return (
    <SprintShell
      eyebrow="AI Knowledge Hub"
      title="Daily Technical Card"
      subtitle="A compact concept card that turns AI terms into product-manager language."
    >
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="soft-card p-5">
          <p className="text-[13px] font-black text-[#647065]">Today&apos;s Concept</p>
          <h2 className="mt-2 text-[36px] font-black leading-none">RAG</h2>
          <p className="mt-5 text-[17px] font-bold leading-[1.35]">
            Retrieval-Augmented Generation helps an AI answer with relevant external knowledge before it speaks.
          </p>
        </div>
        <GlassPanel>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[12px] bg-white/58 p-4">
              <h3 className="text-[17px] font-black">Simple Principle</h3>
              <p className="mt-3 text-[14px] font-medium leading-[1.38] text-[#424b45]">
                Search first, then generate. The model gets useful context from a trusted source instead of relying only on memory.
              </p>
            </div>
            <div className="rounded-[12px] bg-white/58 p-4">
              <h3 className="text-[17px] font-black">Product Example</h3>
              <p className="mt-3 text-[14px] font-medium leading-[1.38] text-[#424b45]">
                A course assistant can retrieve notes, tasks, and examples before answering a student.
              </p>
            </div>
          </div>
          <div className="mt-5">
            <ActionLink href="/day/7">Use In Day 7 Tasks</ActionLink>
          </div>
        </GlassPanel>
      </div>
    </SprintShell>
  );
}
