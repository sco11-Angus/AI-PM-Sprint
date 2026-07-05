import Link from "next/link";

export const toolLinks = [
  { icon: "✧", label: "AI Explain", href: "/ai-explain" },
  { icon: "□", label: "AI Ask", href: "/ai-ask" },
  { icon: "◇", label: "Project Build", href: "/project-build" },
  { icon: "◐", label: "Progress", href: "/progress" },
];

export function SprintShell({ children, eyebrow, title, subtitle }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef0ed] px-5 py-7 text-[#050505] md:px-8 md:py-10">
      <div className="app-background absolute inset-0" />
      <section className="screen-glow relative mx-auto min-h-[calc(100vh-56px)] w-full max-w-[1180px] rounded-[22px] border border-white/55 px-5 pb-24 pt-7 shadow-[0_18px_52px_rgba(58,63,60,0.15),inset_0_1px_1px_rgba(255,255,255,0.88)] md:px-9 md:pt-9">
        <header className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <Link
              className="inline-flex h-[34px] items-center rounded-[10px] bg-white/68 px-4 text-[13px] font-bold shadow-[0_1px_5px_rgba(0,0,0,0.10)]"
              href="/"
            >
              ← Sprint Home
            </Link>
            <p className="mt-6 text-[14px] font-black uppercase tracking-[0.12em] text-[#5f6a62]">
              {eyebrow}
            </p>
            <h1 className="mt-2 text-[34px] font-black leading-[0.98] tracking-[-0.02em] md:text-[44px]">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-4 max-w-[720px] text-[15px] font-medium leading-[1.45] text-[#4f5752] md:text-[17px]">
                {subtitle}
              </p>
            ) : null}
          </div>
        </header>

        <div className="mt-7">{children}</div>

        <FloatingTools />
      </section>
    </main>
  );
}

export function FloatingTools() {
  return (
    <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-[7px] rounded-[15px] border border-white/65 bg-white/74 px-3 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.19),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-md">
      {toolLinks.map((tool) => (
        <Link
          className="flex h-[36px] items-center gap-[7px] rounded-[10px] bg-white px-3 text-[14px] font-bold shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
          href={tool.href}
          key={tool.label}
        >
          <span>{tool.icon}</span>
          {tool.label}
        </Link>
      ))}
    </div>
  );
}

export function GlassPanel({ children, className = "" }) {
  return <article className={`glass-panel p-4 md:p-5 ${className}`}>{children}</article>;
}

export function ActionLink({ children, href }) {
  return (
    <Link
      className="flex h-[42px] items-center justify-center rounded-[8px] bg-black px-5 text-[15px] font-bold text-white shadow-[0_3px_9px_rgba(0,0,0,0.18)]"
      href={href}
    >
      {children}
    </Link>
  );
}

export function WhiteActionLink({ children, href }) {
  return (
    <Link
      className="flex h-[42px] items-center justify-center rounded-[8px] bg-white px-5 text-[15px] font-bold shadow-[0_1px_6px_rgba(0,0,0,0.10)]"
      href={href}
    >
      {children}
    </Link>
  );
}
