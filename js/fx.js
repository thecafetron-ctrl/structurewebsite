/* ============================================================
   STRUCTURE — CANVAS FX ENGINE
   Monochrome generative visuals. Pure white light on black.
   ============================================================ */

(function () {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const ACCENT = "47,230,200"; // electric cyan rgb

  /* ----------------------------------------------------------
     1. NETWORK FLOW MAP  (home hero)
     A drifting constellation of logistics nodes. Freight pulses
     travel along the connections. The cursor bends the field.
     ---------------------------------------------------------- */
  function networkMap(canvas) {
    const ctx = canvas.getContext("2d");
    let W, H, nodes = [], edges = [], pulses = [];
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let raf, running = true;

    function resize() {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      build();
    }

    function build() {
      nodes = [];
      edges = [];
      pulses = [];
      const count = Math.max(36, Math.min(90, Math.floor((W * H) / 22000)));
      for (let i = 0; i < count; i++) {
        const z = 0.35 + Math.random() * 0.65; // depth
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          ox: 0, oy: 0,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          z: z,
          r: z * 1.8,
          hub: Math.random() < 0.12,
          tw: Math.random() * Math.PI * 2,
        });
      }
      // connect near neighbours
      const maxDist = Math.min(W, H) * 0.22;
      for (let i = 0; i < nodes.length; i++) {
        let links = 0;
        for (let j = i + 1; j < nodes.length && links < 3; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            edges.push({ a: i, b: j, d: d });
            links++;
          }
        }
      }
      // seed pulses
      const pulseCount = Math.min(14, Math.floor(edges.length / 5));
      for (let i = 0; i < pulseCount; i++) spawnPulse();
    }

    function spawnPulse() {
      if (!edges.length) return;
      pulses.push({
        edge: Math.floor(Math.random() * edges.length),
        t: 0,
        speed: 0.0024 + Math.random() * 0.004,
        dir: Math.random() < 0.5 ? 1 : -1,
      });
    }

    function frame(time) {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);

      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      // drift + cursor repulsion
      for (const n of nodes) {
        n.x += n.vx * n.z;
        n.y += n.vy * n.z;
        if (n.x < -20) n.x = W + 20; if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20; if (n.y > H + 20) n.y = -20;

        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy);
        const R = 170;
        let push = 0;
        if (d < R && d > 0.01) push = (1 - d / R) * 26 * n.z;
        n.ox += ((push * dx) / (d || 1) - n.ox) * 0.08;
        n.oy += ((push * dy) / (d || 1) - n.oy) * 0.08;
      }

      // edges
      ctx.lineWidth = 1;
      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b];
        const ax = a.x + a.ox, ay = a.y + a.oy;
        const bx = b.x + b.ox, by = b.y + b.oy;
        const midx = (ax + bx) / 2, midy = (ay + by) / 2;
        const md = Math.hypot(midx - mouse.x, midy - mouse.y);
        const glow = Math.max(0, 1 - md / 260);
        const alpha = 0.05 + Math.min(a.z, b.z) * 0.05 + glow * 0.22;
        ctx.strokeStyle = "rgba(255,255,255," + alpha.toFixed(3) + ")";
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }

      // pulses (freight moving along lanes)
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const e = edges[p.edge];
        if (!e) { pulses.splice(i, 1); spawnPulse(); continue; }
        p.t += p.speed;
        if (p.t >= 1) { pulses.splice(i, 1); spawnPulse(); continue; }
        const a = nodes[e.a], b = nodes[e.b];
        const t = p.dir === 1 ? p.t : 1 - p.t;
        const x = a.x + a.ox + (b.x + b.ox - a.x - a.ox) * t;
        const y = a.y + a.oy + (b.y + b.oy - a.y - a.oy) * t;
        const fade = Math.sin(p.t * Math.PI);
        ctx.fillStyle = "rgba(" + ACCENT + "," + (0.95 * fade).toFixed(3) + ")";
        ctx.shadowColor = "rgba(" + ACCENT + ",0.8)";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(x, y, 1.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        // trail
        ctx.fillStyle = "rgba(" + ACCENT + "," + (0.3 * fade).toFixed(3) + ")";
        const tx = a.x + a.ox + (b.x + b.ox - a.x - a.ox) * Math.max(0, t - 0.03 * p.dir);
        const ty = a.y + a.oy + (b.y + b.oy - a.y - a.oy) * Math.max(0, t - 0.03 * p.dir);
        ctx.beginPath();
        ctx.arc(tx, ty, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // nodes
      for (const n of nodes) {
        n.tw += 0.02;
        const twinkle = 0.55 + Math.sin(n.tw) * 0.25;
        const x = n.x + n.ox, y = n.y + n.oy;
        ctx.fillStyle = "rgba(255,255,255," + (n.z * twinkle * 0.85).toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(x, y, n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.hub) {
          const ringR = n.r + 4 + Math.sin(n.tw * 0.7) * 2;
          ctx.strokeStyle = "rgba(" + ACCENT + "," + (n.z * 0.45).toFixed(3) + ")";
          ctx.beginPath();
          ctx.arc(x, y, ringR, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(frame);
    }

    window.addEventListener("pointermove", function (e) {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    });
    window.addEventListener("resize", resize);

    // pause offscreen
    const io = new IntersectionObserver(function (entries) {
      const vis = entries[0].isIntersecting;
      if (vis && !running) { running = true; raf = requestAnimationFrame(frame); }
      else if (!vis && running) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(canvas);

    resize();
    if (!REDUCED) raf = requestAnimationFrame(frame);
    else { // static frame for reduced motion
      frame(0); running = false; cancelAnimationFrame(raf);
    }
  }

  /* ----------------------------------------------------------
     2. RADAR SWEEP  (loadhawk hero)
     A hawk-eye radar. Concentric rings, a sweeping beam, load
     blips that flare as the beam passes. Crosshair drifts.
     ---------------------------------------------------------- */
  function radar(canvas) {
    const ctx = canvas.getContext("2d");
    let W, H, cx, cy, R, blips = [];
    let angle = -Math.PI / 2;
    let raf, running = true;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    function resize() {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = W * 0.72;
      cy = H * 0.46;
      R = Math.min(W, H) * 0.52;
      build();
    }

    function build() {
      blips = [];
      const n = 26;
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = R * (0.18 + Math.random() * 0.78);
        blips.push({ a: a, r: r, flare: 0, big: Math.random() < 0.25 });
      }
    }

    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);

      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      const ox = mouse.x * 14, oy = mouse.y * 10;
      const X = cx + ox, Y = cy + oy;

      // rings
      for (let i = 1; i <= 5; i++) {
        ctx.strokeStyle = "rgba(255,255,255," + (0.05 + (i === 5 ? 0.04 : 0)) + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(X, Y, (R / 5) * i, 0, Math.PI * 2);
        ctx.stroke();
      }
      // cross axes
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.beginPath();
      ctx.moveTo(X - R, Y); ctx.lineTo(X + R, Y);
      ctx.moveTo(X, Y - R); ctx.lineTo(X, Y + R);
      ctx.stroke();
      // tick marks on outer ring
      for (let t = 0; t < 72; t++) {
        const ta = (t / 72) * Math.PI * 2;
        const len = t % 6 === 0 ? 10 : 4;
        ctx.strokeStyle = "rgba(255,255,255,0.14)";
        ctx.beginPath();
        ctx.moveTo(X + Math.cos(ta) * R, Y + Math.sin(ta) * R);
        ctx.lineTo(X + Math.cos(ta) * (R - len), Y + Math.sin(ta) * (R - len));
        ctx.stroke();
      }

      // sweep beam (gradient wedge)
      angle += 0.0085;
      const grad = ctx.createConicGradient
        ? ctx.createConicGradient(angle, X, Y)
        : null;
      if (grad) {
        grad.addColorStop(0, "rgba(255,255,255,0.16)");
        grad.addColorStop(0.08, "rgba(255,255,255,0.02)");
        grad.addColorStop(0.18, "rgba(255,255,255,0)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(X, Y);
        ctx.arc(X, Y, R, 0, Math.PI * 2);
        ctx.fill();
      }
      // beam leading edge
      ctx.strokeStyle = "rgba(" + ACCENT + ",0.65)";
      ctx.lineWidth = 1;
      ctx.shadowColor = "rgba(" + ACCENT + ",0.5)";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(X, Y);
      ctx.lineTo(X + Math.cos(angle) * R, Y + Math.sin(angle) * R);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // blips
      for (const b of blips) {
        // flare when beam passes
        let da = (angle - b.a) % (Math.PI * 2);
        if (da < 0) da += Math.PI * 2;
        if (da < 0.05) b.flare = 1;
        b.flare *= 0.985;
        const bx = X + Math.cos(b.a) * b.r;
        const by = Y + Math.sin(b.a) * b.r;
        const base = b.big ? 2.2 : 1.4;
        const fr = Math.round(255 - (255 - 47) * b.flare);
        const fg = Math.round(255 - (255 - 230) * b.flare);
        const fb = Math.round(255 - (255 - 200) * b.flare);
        ctx.fillStyle = "rgba(" + fr + "," + fg + "," + fb + "," + (0.12 + b.flare * 0.88).toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(bx, by, base + b.flare * 2.5, 0, Math.PI * 2);
        ctx.fill();
        if (b.flare > 0.5) {
          ctx.strokeStyle = "rgba(" + ACCENT + "," + ((b.flare - 0.5) * 0.8).toFixed(3) + ")";
          ctx.beginPath();
          ctx.arc(bx, by, (base + 6) * (1.6 - b.flare), 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // center
      ctx.fillStyle = "rgba(" + ACCENT + ",0.95)";
      ctx.shadowColor = "rgba(" + ACCENT + ",0.8)";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(X, Y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(frame);
    }

    window.addEventListener("pointermove", function (e) {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(function (entries) {
      const vis = entries[0].isIntersecting;
      if (vis && !running) { running = true; raf = requestAnimationFrame(frame); }
      else if (!vis && running) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(canvas);

    resize();
    if (!REDUCED) raf = requestAnimationFrame(frame);
    else { frame(); running = false; cancelAnimationFrame(raf); }
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    const hero = document.getElementById("heroCanvas");
    const rad = document.getElementById("radarCanvas");
    if (hero) networkMap(hero);
    if (rad) radar(rad);
  });
})();
