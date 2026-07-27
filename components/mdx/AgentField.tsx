"use client";

import { useEffect, useRef } from "react";
import s from "./mdx.module.css";

/**
 * The agent field — the one piece of decorative motion on the site.
 *
 * The previous version of this site ran a generic particle network behind its
 * hero. This replaces it with the same physics drawing something that carries
 * an argument: three fixed roles, work drifting between them, and edges that
 * only ever flow ARCHITECT → BUILDER → REVIEWER. Nothing ever flows back from
 * the reviewer to the builder, because that is the rule the whole delivery
 * system is built on — no agent may both write and approve its own work.
 *
 * It is a figure, not a background: bounded, hairline-topped, captioned, at
 * artifact width, in one place on one route. Colour is `--stroke-diagram` and
 * never `--accent`, because accent means "interactive" everywhere else and
 * spending it on decoration would devalue every real link on the page.
 */

const ROLES = ["ARCHITECT", "BUILDER", "REVIEWER"] as const;
const DRIFTERS = 18;
const LINK = 132;
const CURSOR_REACH = 150;
const WARMUP_STEPS = 120;

type P = { x: number; y: number; vx: number; vy: number };

/** Deterministic, so the reduced-motion frame is the same every time. */
function seeded(seed: number) {
  let t = seed;
  return () => {
    t = (t * 1664525 + 1013904223) % 4294967296;
    return t / 4294967296;
  };
}

function token(el: HTMLElement, name: string, fallback: string) {
  return getComputedStyle(el).getPropertyValue(name).trim() || fallback;
}

export function AgentField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
      .matches;

    let w = 0;
    let h = 0;
    let anchors: { x: number; y: number; label: string }[] = [];
    let drifters: P[] = [];
    let raf = 0;
    let running = false;
    let stroke = token(wrap, "--stroke-diagram", "#7c828b");
    let strong = token(wrap, "--text-muted", "#7e848d");
    const pointer = { x: -9999, y: -9999 };

    const measure = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      anchors = ROLES.map((label, i) => ({
        x: w * (0.18 + i * 0.32),
        y: h * 0.5,
        label,
      }));

      const rand = seeded(20260727);
      drifters = Array.from({ length: DRIFTERS }, () => ({
        x: rand() * w,
        y: rand() * h,
        vx: (rand() - 0.5) * 0.3,
        vy: (rand() - 0.5) * 0.3,
      }));
    };

    const step = () => {
      for (const d of drifters) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 8 || d.y > h - 8) d.vy *= -1;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;

      // Drifting work, linked to whichever role is nearest.
      for (const d of drifters) {
        for (const a of anchors) {
          const dist = Math.hypot(d.x - a.x, d.y - a.y);
          if (dist < LINK) {
            ctx.globalAlpha = (1 - dist / LINK) * 0.3;
            ctx.strokeStyle = stroke;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(a.x, a.y);
            ctx.stroke();
          }
        }
        if (finePointer) {
          const dc = Math.hypot(d.x - pointer.x, d.y - pointer.y);
          if (dc < CURSOR_REACH) {
            ctx.globalAlpha = (1 - dc / CURSOR_REACH) * 0.35;
            ctx.strokeStyle = stroke;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      // The spine: architect → builder → reviewer. One direction only.
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = strong;
      ctx.lineWidth = 1.4;
      for (let i = 0; i < anchors.length - 1; i += 1) {
        const a = anchors[i];
        const b = anchors[i + 1];
        ctx.beginPath();
        ctx.moveTo(a.x + 7, a.y);
        ctx.lineTo(b.x - 12, b.y);
        ctx.stroke();
        // Arrowhead, so the direction is visible and not implied.
        ctx.beginPath();
        ctx.moveTo(b.x - 12, b.y);
        ctx.lineTo(b.x - 18, b.y - 4);
        ctx.moveTo(b.x - 12, b.y);
        ctx.lineTo(b.x - 18, b.y + 4);
        ctx.stroke();
      }

      // Drifting nodes.
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = stroke;
      for (const d of drifters) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Role nodes and labels.
      ctx.globalAlpha = 1;
      for (const a of anchors) {
        ctx.fillStyle = strong;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 3.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.font =
          '10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
        ctx.textAlign = "center";
        ctx.globalAlpha = 0.75;
        ctx.fillText(a.label, a.x, a.y + 20);
        ctx.globalAlpha = 1;
      }
    };

    const frame = () => {
      step();
      draw();
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    measure();
    // Warm the simulation before the first paint, so a reduced-motion reader
    // sees a settled network instead of the t=0 uniform scatter.
    for (let i = 0; i < WARMUP_STEPS; i += 1) step();
    draw();

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting && document.visibilityState === "visible"
        ? start()
        : stop()),
      { threshold: 0 },
    );
    io.observe(wrap);

    const onVisibility = () =>
      document.visibilityState === "hidden" ? stop() : undefined;
    document.addEventListener("visibilitychange", onVisibility);

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    if (finePointer) {
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerleave", onLeave);
    }

    const ro = new ResizeObserver(() => {
      measure();
      for (let i = 0; i < WARMUP_STEPS; i += 1) step();
      draw();
    });
    ro.observe(wrap);

    const mo = new MutationObserver(() => {
      stroke = token(wrap, "--stroke-diagram", "#7c828b");
      strong = token(wrap, "--text-muted", "#7e848d");
      draw();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <figure data-breakout className={`${s.breakout} ${s.agentFigure}`}>
      <div ref={wrapRef} className="agent-field" aria-hidden="true">
        <canvas ref={canvasRef} />
      </div>
      <figcaption className={s.agentCaption}>
        The delivery system, drawn. Work drifts between three roles and the
        spine only ever runs one way, because no agent may both write and
        approve its own change. A canvas the previous version of this site ran
        behind its hero, kept here bounded, theme-aware, and paused when it is
        off screen or when the operating system asks for less motion.
      </figcaption>
    </figure>
  );
}
