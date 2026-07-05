const days = Array.from({ length: 30 }, (_, index) => index + 1);

const tools = [
  { icon: "✧", label: "AI Explain" },
  { icon: "□", label: "AI Ask" },
  { icon: "◇", label: "Project Build" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef0ed] px-5 py-7 text-[#050505] md:px-8 md:py-10">
      <div className="app-background absolute inset-0" />

      <section className="screen-glow relative mx-auto min-h-[calc(100vh-56px)] w-full max-w-[1180px] rounded-[22px] border border-white/55 px-5 pb-20 pt-8 shadow-[0_18px_52px_rgba(58,63,60,0.15),inset_0_1px_1px_rgba(255,255,255,0.88)] md:px-9 md:pb-24 md:pt-10">
        <header className="text-center">
          <h1 className="text-[34px] font-black leading-[0.98] tracking-[-0.02em] md:text-[44px]">
            Welcome, User!
            <br />
            Day 7 of your 30-Day Sprint
          </h1>
        </header>

        <section className="mt-7">
          <div className="mb-2 flex items-end justify-between px-1">
            <h2 className="text-[18px] font-bold md:text-[20px]">Sprint Track</h2>
            <p className="text-[16px] font-medium md:text-[18px]">Unlocked</p>
          </div>
          <div className="grid grid-cols-30 gap-[6px] md:gap-[8px]">
            {days.map((day) => (
              <div key={day} className="min-w-0">
                <div
                  className={`h-[10px] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] ${
                    day <= 16 ? "bg-white" : "bg-[#d4d4d2]"
                  }`}
                />
                <p className="mt-[5px] text-center text-[7px] font-semibold leading-none md:text-[8px]">
                  Day {day}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7 grid gap-6 md:grid-cols-[1fr_1fr]">
          <article className="glass-panel p-4 md:p-5">
            <h2 className="text-[20px] font-bold">AI Knowledge Hub</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="soft-card min-h-[150px] p-4">
                <h3 className="text-[17px] font-bold">Daily Technical Card</h3>
                <p className="mt-3 text-[13px] font-medium leading-[1.28]">
                  E.g. explaining RAC with key concepts to masline with countries
                  and instractivecs and key concepts.
                </p>
                <p className="mt-4 text-[12px] text-[#8b8b8b]">14px/Regular</p>
              </div>
              <div className="soft-card min-h-[150px] p-4">
                <h3 className="text-[17px] font-bold">Frontier Insights</h3>
                <p className="mt-3 text-[13px] font-medium leading-[1.28]">
                  Summarize the latest AI developments of engineering and under
                  AI matamineat and AI asnts.
                </p>
                <p className="mt-4 text-[12px] text-[#8b8b8b]">14px/Regular</p>
              </div>
            </div>
            <div className="mt-4 rounded-[12px] bg-white/42 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
              <button className="h-[42px] w-full rounded-[8px] bg-white text-[15px] font-bold shadow-[0_1px_6px_rgba(0,0,0,0.10)]">
                Start Day 7 Tasks
              </button>
            </div>
          </article>

          <article className="glass-panel p-4 md:p-5">
            <h2 className="text-[20px] font-bold">AI Career Sprint Hub</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="resume-card min-h-[226px] p-4">
                <h3 className="text-[17px] font-bold">JD Resume Optimizar</h3>
                <button className="mt-4 flex h-[50px] w-full items-center justify-center gap-2 rounded-[8px] border border-dashed border-[#d7d9ca] bg-white/35 text-[15px] font-bold">
                  <span className="text-[17px]">↥</span>
                  Upload File
                </button>
                <div className="mt-3 flex h-[52px] items-center rounded-[7px] bg-white px-3 text-[13px] text-[#9a9a9a] shadow-[0_1px_4px_rgba(0,0,0,0.07)]">
                  Paste target JD
                </div>
                <button className="mt-4 h-[38px] w-full rounded-[8px] bg-black text-[15px] font-bold text-white">
                  Optimize Resume
                </button>
              </div>

              <div className="interview-card min-h-[226px] p-4">
                <h3 className="text-[17px] font-bold">AI Mock Interview</h3>
                <button className="mt-5 h-[36px] w-full rounded-[8px] bg-white/48 px-2 text-[13px] font-black">
                  Analyze Real Interview Qs
                </button>
                <p className="mt-3 text-[13px] font-medium leading-[1.18]">
                  Supports voice/text mode, modes for technical, product, and
                  project-based questions. Promis cutarize detailed feedback.
                </p>
                <button className="mt-4 h-[38px] w-full rounded-[8px] bg-black text-[15px] font-bold text-white">
                  Start Mock Interview
                </button>
              </div>
            </div>
          </article>
        </section>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-[7px] rounded-[15px] border border-white/65 bg-white/74 px-3 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.19),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-md">
          {tools.map((tool) => (
            <button
              className="flex h-[36px] items-center gap-[7px] rounded-[10px] bg-white px-3 text-[14px] font-bold shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
              key={tool.label}
            >
              <span>{tool.icon}</span>
              {tool.label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
