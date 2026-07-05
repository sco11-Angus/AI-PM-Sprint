"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { ActionLink, GlassPanel, SprintShell, WhiteActionLink } from "../components/sprint-shell";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9000";

export default function LearningPathPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedDay, setSelectedDay] = useState(7);
  const [selectedTask, setSelectedTask] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadTasks() {
      try {
        setStatus("loading");
        const response = await fetch(`${API_BASE_URL}/api/tasks`);
        if (!response.ok) {
          throw new Error(`Task list request failed: ${response.status}`);
        }
        const payload = await response.json();
        if (!cancelled) {
          setTasks(payload.tasks || []);
          setStatus("ready");
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message);
          setStatus("error");
        }
      }
    }

    loadTasks();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadTaskDetail() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/tasks/${selectedDay}`);
        if (!response.ok) {
          throw new Error(`Day ${selectedDay} request failed: ${response.status}`);
        }
        const payload = await response.json();
        if (!cancelled) {
          setSelectedTask(payload);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message);
        }
      }
    }

    loadTaskDetail();
    return () => {
      cancelled = true;
    };
  }, [selectedDay]);

  const completedPreviewDays = useMemo(() => new Set([1, 2, 3, 4, 5]), []);

  return (
    <SprintShell
      eyebrow="Learning Path"
      title="Day 1-30 Sprint Map"
      subtitle="Browse the full 30-day path, inspect a single day, and jump directly into the task workspace."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <GlassPanel>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-[22px] font-black">30-Day Task List</h2>
              <p className="mt-2 text-[14px] font-medium text-[#59625c]">
                Source: {API_BASE_URL}/api/tasks
              </p>
            </div>
            <div className="rounded-[10px] bg-white/58 px-4 py-2 text-[13px] font-black">
              {status === "ready" ? `${tasks.length} Days Loaded` : "Loading"}
            </div>
          </div>

          {status === "error" ? (
            <div className="mt-5 rounded-[12px] bg-white/62 p-4 text-[14px] font-bold text-[#7f3131]">
              {error}
            </div>
          ) : null}

          <div className="mt-5 grid grid-cols-5 gap-2 md:grid-cols-10">
            {(tasks.length ? tasks : Array.from({ length: 30 }, (_, index) => ({ day: index + 1 }))).map((task) => (
              <button
                className={`h-[46px] rounded-[11px] text-[13px] font-black shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] ${
                  selectedDay === task.day
                    ? "bg-black text-white"
                    : completedPreviewDays.has(task.day)
                      ? "bg-white text-black"
                      : "bg-white/42 text-[#6f7972]"
                }`}
                key={task.day}
                onClick={() => setSelectedDay(task.day)}
                type="button"
              >
                Day {task.day}
              </button>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel>
          <h2 className="text-[22px] font-black">Day Detail</h2>
          <div className="mt-5 soft-card p-5">
            <p className="text-[12px] font-black text-[#667067]">SELECTED DAY</p>
            <h3 className="mt-2 text-[26px] font-black leading-[1.05]">
              {selectedTask?.title || `Day ${selectedDay}`}
            </h3>
            <p className="mt-4 text-[15px] font-medium leading-[1.42] text-[#39423d]">
              {selectedTask?.objective || "Loading task objective from backend..."}
            </p>
          </div>

          <div className="mt-4 grid gap-3">
            {[
              ["Thinking", selectedTask?.thinking_prompt],
              ["Practice", selectedTask?.practice_prompt],
              ["Output", selectedTask?.output_prompt],
            ].map(([label, content]) => (
              <div className="rounded-[12px] bg-white/58 p-4" key={label}>
                <p className="text-[12px] font-black text-[#667067]">{label}</p>
                <p className="mt-2 text-[14px] font-bold leading-[1.35] text-[#353d38]">
                  {content || "Loading..."}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <WhiteActionLink href={`/day/${selectedDay}`}>Open Day {selectedDay}</WhiteActionLink>
            <ActionLink href="/progress">View Progress</ActionLink>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="mt-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <p className="text-[16px] font-bold">
            Backend integration is live: the list and detail panes read from FastAPI task endpoints.
          </p>
          <Link
            className="flex h-[42px] items-center justify-center rounded-[8px] bg-white px-5 text-[15px] font-bold shadow-[0_1px_6px_rgba(0,0,0,0.10)]"
            href="/day/7"
          >
            Continue Day 7
          </Link>
        </div>
      </GlassPanel>
    </SprintShell>
  );
}
