"use client";

import { useEffect, useRef } from "react";

/**
 * The node field — a deliberate flash of craft on /about.
 *
 * This is a port of the canvas that ran behind the hero on the previous
 * version of this site: a drifting particle field that links nearby nodes and
 * draws a line to the cursor when it comes close. It was cut from the rebuild
 * as decorative motion, and it comes back here under conditions it never had
 * before.
 *
 * What is different from the original:
 *
 *  - It is a BOUNDED BAND, never a full-bleed background. Nothing on this site
 *    animates underneath text somebody is trying to read.
 *  - It respects `prefers-reduced-motion`. The field renders one static frame
 *    and stops, so the texture survives for a reader who has asked the OS for
 *    less movement.
 *  - It only runs while it is on screen. An IntersectionObserver cancels the
 *    frame loop the moment the band scrolls out of view, so a reader parked
 *    further down the page is not paying for an animation they cannot see.
 *  - Colour comes from the theme tokens, read from the cascade at mount and
 *    again on theme change, so it is correct in light and dark without a
 *    second palette.
 *  - It is `aria-hidden` and entirely decorative. Nothing is communicated here
 *    that is not also said in words.
 */

const NODE_COUNT_BASE = 34;
const LINK_DISTANCE = 116;
const CURSOR_REACH = LINK_DISTANCE * 1.4;

type Node = { x: number; y: number; vx: number; vy: number; r: number };

function readStroke(el: HTMLElement): string {
  const styles = getComputedStyle(el);
  return (
    styles.getPropertyValue("--stroke-diagram").trim() ||
    styles.getPropertyValue("--text-muted").trim() ||
    "#7c828b"
  );
}

export function NodeField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let running = false;
    let stroke = readStroke(wrap);
    const pointer = { x: -9999, y: -9999 };

    const measure = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale the population with area so a wide desktop band and a 360px
      // phone band read at the same density.
      const target = Math.round(
        NODE_COUNT_BASE * Math.min(1.6, Math.max(0.45, width / 900)),
      );
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 1 + Math.random() * 1.4,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i += 1) {
        const p = nodes[i];

        for (let j = i + 1; j < nodes.length; j += 1) {
          const q = nodes[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < LINK_DISTANCE) {
            ctx.globalAlpha = (1 - d / LINK_DISTANCE) * 0.28;
            ctx.strokeStyle = stroke;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        const dc = Math.hypot(p.x - pointer.x, p.y - pointer.y);
        if (dc < CURSOR_REACH) {
          ctx.globalAlpha = (1 - dc / CURSOR_REACH) * 0.55;
          ctx.strokeStyle = stroke;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 0.5;
      ctx.fillStyle = stroke;
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const frame = () => {
      draw();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    measure();
    draw(); // one frame regardless, so reduced-motion readers still see it

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    observer.observe(wrap);

    const onPointerMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    // Pointer events only. On touch this stays a quiet static texture, because
    // a finger is not a cursor and chasing it produces a jitter, not an effect.
    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerleave", onPointerLeave);

    const resizeObserver = new ResizeObserver(() => {
      measure();
      draw();
    });
    resizeObserver.observe(wrap);

    const themeObserver = new MutationObserver(() => {
      stroke = readStroke(wrap);
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="node-field" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
