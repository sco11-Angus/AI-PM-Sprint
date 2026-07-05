const days = Array.from({ length: 30 }, (_, index) => index + 1);

const tools = [
  { icon: "✧", label: "AI Explain" },
  { icon: "□", label: "AI Ask" },
  { icon: "◇", label: "Project Build" },
];

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f4f1] px-5 py-10 text-[#050505]">
      <div className="wire-bg absolute inset-0 opacity-70" />
      <div className="absolute bottom-0 right-0 h-[46vw] min-h-[360px] w-[54vw] min-w-[440px] rounded-tl-full bg-[radial-gradient(circle_at_44%_38%,rgba(174,231,142,0.72),rgba(186,226,212,0.62)_28%,rgba(240,184,204,0.58)_48%,rgba(255,255,255,0)_70%)] blur-[1px]" />

      <section className="relative w-full max-w-[1040px]">
        <div className="relative mx-auto w-full max-w-[940px]">
          <div className="relative rounded-[10px] border-[11px] border-black bg-black shadow-[0_18px_34px_rgba(0,0,0,0.26)]">
            <div className="absolute left-1/2 top-[-7px] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-[#171717]" />

            <div className="screen-glow min-h-[525px] rounded-[2px] border border-[#1f1f1f] px-8 pb-12 pt-8 md:px-9">
              <header className="text-center">
                <h1 className="text-[38px] font-black leading-[0.98] tracking-[-0.02em]">
                  Welcome, User!
                  <br />
                  Day 7 of your 30-Day Sprint
                </h1>
              </header>

              <section className="mt-5">
                <div className="mb-2 flex items-end justify-between px-1">
                  <h2 className="text-[18px] font-bold">Sprint Track</h2>
                  <p className="text-[16px] font-medium">Unlocked</p>
                </div>
                <div className="grid grid-cols-30 gap-[7px]">
                  {days.map((day) => (
                    <div key={day} className="min-w-0">
                      <div
                        className={`h-[10px] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] ${
                          day <= 16 ? "bg-white" : "bg-[#d4d4d2]"
                        }`}
                      />
                      <p className="mt-[5px] text-center text-[7px] font-semibold leading-none">
                        Day {day}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-6 grid gap-5 md:grid-cols-[1fr_1fr]">
                <article className="glass-panel p-4">
                  <h2 className="text-[19px] font-bold">AI Knowledge Hub</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="soft-card min-h-[137px] p-4">
                      <h3 className="text-[16px] font-bold">Daily Technical Card</h3>
                      <p className="mt-2 text-[12px] font-medium leading-[1.28]">
                        E.g. explaining RAC with key concepts to masline with
                        countries and instractivecs and key concepts.
                      </p>
                      <p className="mt-3 text-[12px] text-[#8b8b8b]">14px/Regular</p>
                    </div>
                    <div className="soft-card min-h-[137px] p-4">
                      <h3 className="text-[16px] font-bold">Frontier Insights</h3>
                      <p className="mt-2 text-[12px] font-medium leading-[1.28]">
                        Summarize the latest AI developments of engineering
                        and under AI matamineat and AI asnts.
                      </p>
                      <p className="mt-3 text-[12px] text-[#8b8b8b]">14px/Regular</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-[10px] bg-white/42 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                    <button className="h-[36px] w-full rounded-[7px] bg-white text-[14px] font-bold shadow-[0_1px_6px_rgba(0,0,0,0.10)]">
                      Start Day 7 Tasks
                    </button>
                  </div>
                </article>

                <article className="glass-panel p-4">
                  <h2 className="text-[19px] font-bold">AI Career Sprint Hub</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="resume-card min-h-[205px] p-4">
                      <h3 className="text-[16px] font-bold">JD Resume Optimizar</h3>
                      <button className="mt-4 flex h-[46px] w-full items-center justify-center gap-2 rounded-[7px] border border-dashed border-[#d7d9ca] bg-white/35 text-[14px] font-bold">
                        <span className="text-[16px]">↥</span>
                        Upload File
                      </button>
                      <div className="mt-3 flex h-[47px] items-center rounded-[6px] bg-white px-3 text-[12px] text-[#9a9a9a] shadow-[0_1px_4px_rgba(0,0,0,0.07)]">
                        Paste target JD
                      </div>
                      <button className="mt-4 h-[33px] w-full rounded-[7px] bg-black text-[14px] font-bold text-white">
                        Optimize Resume
                      </button>
                    </div>

                    <div className="interview-card min-h-[205px] p-4">
                      <h3 className="text-[16px] font-bold">AI Mock Interview</h3>
                      <button className="mt-5 h-[32px] w-full rounded-[7px] bg-white/48 px-2 text-[12px] font-black">
                        Analyze Real Interview Qs
                      </button>
                      <p className="mt-3 text-[12px] font-medium leading-[1.18]">
                        Supports voice/text mode, modes for technical, product,
                        and project-based questions. Promis cutarize detailed
                        feedback.
                      </p>
                      <button className="mt-4 h-[33px] w-full rounded-[7px] bg-black text-[14px] font-bold text-white">
                        Start Mock Interview
                      </button>
                    </div>
                  </div>
                </article>
              </section>
            </div>
          </div>

          <div className="absolute bottom-[-44px] left-1/2 h-[158px] w-[210px] -translate-x-1/2 bg-[linear-gradient(180deg,#676767,#b7b7b7_42%,#8c8c8c_78%,#595959)] shadow-[inset_0_15px_20px_rgba(255,255,255,0.22),0_10px_18px_rgba(0,0,0,0.25)]" />
          <div className="absolute bottom-[-53px] left-1/2 h-[16px] w-[210px] -translate-x-1/2 rounded-b-[3px] bg-[linear-gradient(180deg,#a9a9a9,#565656)] shadow-[0_5px_8px_rgba(0,0,0,0.2)]" />
          <div className="absolute bottom-[-9px] left-1/2 h-[58px] w-[58px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#eef5f3_0,#d8e2dd_42%,#858585_44%,#4c4c4c_70%,rgba(0,0,0,0)_71%)]" />

          <div className="absolute bottom-[14px] left-1/2 flex -translate-x-1/2 items-center gap-[7px] rounded-[13px] border border-white/65 bg-white/74 px-3 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.19),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-md">
            {tools.map((tool) => (
              <button
                className="flex h-[34px] items-center gap-[7px] rounded-[9px] bg-white px-3 text-[14px] font-bold shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
                key={tool.label}
              >
                <span>{tool.icon}</span>
                {tool.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
