import { ActionLink, GlassPanel, SprintShell, WhiteActionLink } from "../components/sprint-shell";

const progressItems = [
  { day: 1, status: "completed" },
  { day: 2, status: "completed" },
  { day: 3, status: "completed" },
  { day: 4, status: "completed" },
  { day: 5, status: "completed" },
  { day: 6, status: "in_progress" },
  { day: 7, status: "in_progress" },
  ...Array.from({ length: 23 }, (_, index) => ({
    day: index + 8,
    status: "not_started",
  })),
];

export default function ProgressPage() {
  const completed = progressItems.filter((item) => item.status === "completed").length;
  const inProgress = progressItems.filter((item) => item.status === "in_progress").length;
  const completionRate = Math.round((completed / progressItems.length) * 100);

  return (
    <SprintShell
      eyebrow="Learning Progress"
      title="Sprint Progress Tracker"
      subtitle="A quick read on completion rate, active sprint days, and the next action to keep the 30-day path moving."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassPanel>
          <h2 className="text-[22px] font-black">Progress Snapshot</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="soft-card p-4">
              <p className="text-[12px] font-black text-[#667067]">Completed</p>
              <p className="mt-3 text-[34px] font-black leading-none">{completed}</p>
            </div>
            <div className="resume-card p-4">
              <p className="text-[12px] font-black text-[#667067]">In Progress</p>
              <p className="mt-3 text-[34px] font-black leading-none">{inProgress}</p>
            </div>
            <div className="interview-card p-4">
              <p className="text-[12px] font-black text-[#667067]">Rate</p>
              <p className="mt-3 text-[34px] font-black leading-none">{completionRate}%</p>
            </div>
          </div>
          <div className="mt-5 rounded-[14px] bg-white/56 p-4">
            <div className="h-[14px] overflow-hidden rounded-full bg-[#d8d8d4]">
              <div
                className="h-full rounded-full bg-black"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </GlassPanel>

        <GlassPanel>
          <h2 className="text-[22px] font-black">30-Day Map</h2>
          <div className="mt-5 grid grid-cols-10 gap-2">
            {progressItems.map((item) => (
              <div
                className={`flex h-[42px] items-center justify-center rounded-[10px] text-[13px] font-black shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] ${
                  item.status === "completed"
                    ? "bg-black text-white"
                    : item.status === "in_progress"
                      ? "bg-white text-black"
                      : "bg-white/42 text-[#7d857f]"
                }`}
                key={item.day}
              >
                {item.day}
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="mt-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto] md:items-center">
          <div>
            <h2 className="text-[20px] font-black">Next Best Action</h2>
            <p className="mt-2 text-[15px] font-medium text-[#4f5752]">
              Continue Day 7 and turn today&apos;s technical card into one product insight.
            </p>
          </div>
          <WhiteActionLink href="/day/7">Open Day 7</WhiteActionLink>
          <ActionLink href="/technical-card">Review Card</ActionLink>
        </div>
      </GlassPanel>
    </SprintShell>
  );
}
