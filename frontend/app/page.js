import Link from "next/link";

export default function Home() {
  const navItems = ["今日训练", "学习路径", "AI输入", "项目输出"];
  const modules = [
    {
      title: "今日任务",
      detail: "概念理解、行业观察、实操输出",
      accent: "bg-[#2F6F5E]",
    },
    {
      title: "AI输入系统",
      detail: "技术卡、前沿速递、课程启发",
      accent: "bg-[#315C9B]",
    },
    {
      title: "项目构建",
      detail: "从选题到PRD，再到Demo",
      accent: "bg-[#C96B4B]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F4] text-[#17201C]">
      <header className="border-b border-[#D8DED3] bg-[#FDFDF9]/90">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            AI PM Sprint
          </Link>
          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <a
                className="rounded-md px-3 py-2 text-sm font-medium text-[#526058] hover:bg-[#E7ECE3] hover:text-[#17201C]"
                href="#today"
                key={item}
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="#today"
            className="rounded-md bg-[#17201C] px-4 py-2 text-sm font-semibold text-white"
          >
            开始 Day 1
          </a>
        </nav>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-8 md:px-8 md:py-12">
        <section
          id="today"
          className="grid gap-6 rounded-lg border border-[#D8DED3] bg-[#FDFDF9] p-5 shadow-sm md:grid-cols-[1.25fr_0.75fr] md:p-8"
        >
          <div className="flex min-w-0 flex-col justify-between gap-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#2F6F5E]">
                Day 1 · MVP入口
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
                把零散的AI学习，压成每天可执行的产品训练。
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#526058] md:text-lg">
                首页先承担一个清晰职责：让用户知道今天该学什么、产出什么，
                并能进入后续的 Day 任务页和 AI 输入模块。
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["30天路径", "每日输出", "项目驱动"].map((metric) => (
                <div
                  className="rounded-md border border-[#D8DED3] bg-[#F7F8F4] px-4 py-3"
                  key={metric}
                >
                  <p className="text-sm font-semibold">{metric}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-lg bg-[#17201C] p-5 text-white">
            <p className="text-sm font-medium text-[#A7D8C2]">今日训练</p>
            <h2 className="mt-3 text-2xl font-semibold">理解 RAG 的产品价值</h2>
            <ul className="mt-6 grid gap-3 text-sm text-[#DDE8E1]">
              <li>阅读技术卡：一句话解释 RAG</li>
              <li>完成思考：它适合哪些学习产品？</li>
              <li>输出一句：讲给非技术同学听</li>
            </ul>
          </aside>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {modules.map((module) => (
            <article
              className="rounded-lg border border-[#D8DED3] bg-[#FDFDF9] p-5"
              key={module.title}
            >
              <div className={`h-1.5 w-12 rounded-full ${module.accent}`} />
              <h2 className="mt-5 text-xl font-semibold">{module.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#526058]">
                {module.detail}
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
