/* ============================================================
   LOADHAWK v2 — PROOF ENGINE
   Live load theater · ROI calculator · transcript · sticky CTA
   ============================================================ */

(function () {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------
     1. LIVE LOAD THEATER
     Replays one real load at compressed speed. Narrative
     timestamps (t, sim-seconds) are decoupled from real
     playback offsets (real, seconds) so the feed never has
     dead air. The visitor performs the final approval click.
     ---------------------------------------------------------- */
  function theater() {
    const log = document.getElementById("thLog");
    const list = document.getElementById("thList");
    const clockEl = document.getElementById("thClock");
    const statusEl = document.getElementById("thStatus");
    const countEl = document.getElementById("thCount");
    const approveBtn = document.getElementById("thApprove");
    const replayBtn = document.getElementById("thReplay");
    const shell = document.getElementById("theater");
    if (!log || !shell) return;

    const CARRIERS = [
      { name: "J&M TRANSPORT", score: 94, rate: "$1,850", top: true },
      { name: "REDLINE CARRIERS", score: 88, rate: "$1,910" },
      { name: "MIDWEST FREIGHT", score: 91, rate: "$1,940" },
      { name: "BLUE OX LOGISTICS", score: 86, rate: "$1,990" },
      { name: "PRAIRIE HAUL INC", score: 82, rate: "$2,040" },
    ];

    /* t = narrative sim-seconds, real = playback offset seconds */
    const EVENTS = [
      { t: 0,   real: 0,    ag: "LOAD",        txt: "RECEIVED — CHI → ATL · DRY VAN · PICKUP THU 06:00" },
      { t: 2,   real: 0.9,  ag: "RELIABILITY", txt: "38 LANE CARRIERS FOUND → 12 SELECTED (SCORE ≥ 80)" },
      { t: 4,   real: 1.9,  ag: "COVERAGE",    txt: "12 CARRIERS CONTACTED — 8 CALLS · 12 SMS · 12 EMAILS" },
      { t: 31,  real: 3.4,  ag: "CALLER",      txt: "J&M TRANSPORT PICKED UP — 14s RING" },
      { t: 58,  real: 4.8,  ag: "SMS ←",       txt: "MIDWEST FREIGHT: “CAN DO $2,100”" },
      { t: 66,  real: 5.8,  ag: "RATE",        txt: "DAT LANE AVG $1,920 · YOUR CEILING $1,975" },
      { t: 71,  real: 6.8,  ag: "RATE",        txt: "COUNTERED MIDWEST AT $1,890 — MIDPOINT LOGIC" },
      { t: 102, real: 8.4,  ag: "CALLER",      txt: "J&M QUOTED $1,850 — UNDER CEILING, LOCKING", carrier: 0 },
      { t: 123, real: 9.8,  ag: "RELIABILITY", txt: "1 RESPONDER SKIPPED — GHOST RATE 23%" },
      { t: 168, real: 11.2, ag: "EMAIL ←",     txt: "REDLINE CARRIERS: $1,910 — MC VERIFIED (FMCSA)", carrier: 1 },
      { t: 202, real: 12.7, ag: "SMS ←",       txt: "MIDWEST: “OK $1,940 FINAL” — ACCEPTED, UNDER CEILING", carrier: 2 },
      { t: 250, real: 14.2, ag: "CALLER",      txt: "BLUE OX CONFIRMED $1,990 — TRANSCRIPT SAVED", carrier: 3 },
      { t: 337, real: 15.7, ag: "EMAIL ←",     txt: "PRAIRIE HAUL: $2,040 — RANKED #5", carrier: 4 },
      { t: 410, real: 17.2, ag: "SUPPORT",     txt: "SHIPPER ASKED PICKUP ETA — ANSWERED IN 14s" },
      { t: 494, real: 19.0, ag: "✦ READY",     txt: "5 OPTIONS RANKED — AWAITING YOUR APPROVAL", final: true },
    ];
    const END_T = 494; /* 8:14 */

    let raf = null;
    let startTime = null;
    let fired = 0;
    let placed = 0;
    let done = false;
    let booked = false;

    function fmt(t) {
      const m = Math.floor(t / 60);
      const s = Math.floor(t % 60);
      return "T+" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    }

    /* map real elapsed → narrative time, piecewise between events */
    function simTime(elapsed) {
      if (elapsed >= EVENTS[EVENTS.length - 1].real) return END_T;
      for (let i = EVENTS.length - 1; i >= 0; i--) {
        if (elapsed >= EVENTS[i].real) {
          const a = EVENTS[i];
          const b = EVENTS[i + 1];
          const p = (elapsed - a.real) / (b.real - a.real);
          return a.t + (b.t - a.t) * p;
        }
      }
      return 0;
    }

    function addLine(ev) {
      const div = document.createElement("div");
      div.className = "th-line" + (ev.final ? " th-final" : "");
      div.innerHTML =
        '<span class="t">' + fmt(ev.t) + "</span>" +
        '<span class="ag">' + ev.ag + "</span>" +
        "<span>" + ev.txt + "</span>";
      log.appendChild(div);
      while (log.children.length > 14) log.removeChild(log.firstChild);
      if (window.gsap && !REDUCED) gsap.from(div, { opacity: 0, y: 8, duration: 0.35, ease: "power2.out" });
    }

    function addCarrier(idx) {
      const c = CARRIERS[idx];
      const li = document.createElement("li");
      if (c.top) li.dataset.top = "1";
      li.innerHTML =
        "<span>" + c.name + "</span>" +
        '<span class="sc">' + c.score + "</span>" +
        '<span class="rt">' + c.rate + "</span>";
      list.appendChild(li);
      requestAnimationFrame(function () { li.classList.add("in"); });
      placed++;
      countEl.textContent = placed + " / 5";
    }

    function arm() {
      done = true;
      clockEl.textContent = fmt(END_T);
      list.querySelectorAll("li").forEach(function (li) {
        if (li.dataset.top) li.classList.add("th-top");
      });
      approveBtn.disabled = false;
      approveBtn.classList.add("armed");
      approveBtn.innerHTML = '<span class="mono">APPROVE J&M — $1,850</span>';
      statusEl.innerHTML = '<i class="th-pulse"></i>READY';
    }

    function frame(now) {
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) / 1000;
      const t = simTime(elapsed);
      clockEl.textContent = fmt(t);

      while (fired < EVENTS.length && elapsed >= EVENTS[fired].real) {
        const ev = EVENTS[fired];
        addLine(ev);
        if (ev.carrier !== undefined) addCarrier(ev.carrier);
        if (ev.final) { arm(); }
        fired++;
      }
      if (!done) raf = requestAnimationFrame(frame);
    }

    function reset() {
      if (raf) cancelAnimationFrame(raf);
      raf = null; startTime = null; fired = 0; placed = 0; done = false; booked = false;
      log.innerHTML = "";
      list.innerHTML = "";
      countEl.textContent = "0 / 5";
      clockEl.textContent = "T+00:00";
      statusEl.innerHTML = '<i class="th-pulse"></i>WORKING';
      statusEl.classList.remove("is-booked");
      approveBtn.disabled = true;
      approveBtn.classList.remove("armed", "booked");
      approveBtn.innerHTML = '<span class="mono">AWAITING OPTIONS…</span>';
    }

    function instant() {
      /* reduced motion: render the end state, no playback */
      reset();
      EVENTS.forEach(function (ev) {
        addLine(ev);
        if (ev.carrier !== undefined) addCarrier(ev.carrier);
      });
      arm();
    }

    function play() {
      reset();
      if (REDUCED) { instant(); return; }
      raf = requestAnimationFrame(frame);
    }

    approveBtn.addEventListener("click", function () {
      if (!done || booked) return;
      booked = true;
      addLine({ t: END_T, ag: "BOOKED ✦", txt: "J&M TRANSPORT @ $1,850 · RATE CON SENT — YOUR CLICK WAS THE WHOLE JOB", final: true });
      approveBtn.classList.remove("armed");
      approveBtn.classList.add("booked");
      approveBtn.innerHTML = '<span class="mono">BOOKED ✦ 8:14 + ONE CLICK</span>';
      statusEl.classList.add("is-booked");
      statusEl.innerHTML = "BOOKED ✦";
    });

    replayBtn.addEventListener("click", play);

    /* start when it scrolls into view */
    let started = false;
    const io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !started) {
        started = true;
        play();
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(shell);
  }

  /* ----------------------------------------------------------
     2. ROI CALCULATOR
     Industry averages: 10% of loads lost to slow response,
     $50/load negotiation leak, 37 dispatcher-min saved per
     load at a $28/hr fully-loaded cost. LoadHawk mid $4.5K/mo.
     ---------------------------------------------------------- */
  function roi() {
    const loadsIn = document.getElementById("roiLoads");
    const marginIn = document.getElementById("roiMargin");
    if (!loadsIn || !marginIn) return;
    const loadsVal = document.getElementById("roiLoadsVal");
    const marginVal = document.getElementById("roiMarginVal");
    const missedEl = document.getElementById("roiMissed");
    const leakEl = document.getElementById("roiLeak");
    const hoursEl = document.getElementById("roiHours");
    const hoursDEl = document.getElementById("roiHoursD");
    const totalEl = document.getElementById("roiTotal");
    const multEl = document.getElementById("roiMult");

    const usd = function (n) { return "$" + Math.round(n).toLocaleString("en-US"); };

    function update() {
      const loads = parseInt(loadsIn.value, 10);
      const margin = parseInt(marginIn.value, 10);
      const missed = loads * 0.10 * margin;
      const leak = loads * 50;
      const hours = (loads * 37) / 60;
      const hoursD = hours * 28;
      const total = missed + leak + hoursD;
      const mult = total / 4500;

      loadsVal.textContent = loads;
      marginVal.textContent = "$" + margin;
      missedEl.textContent = usd(missed);
      leakEl.textContent = usd(leak);
      hoursEl.textContent = "(" + Math.round(hours) + " hrs)";
      hoursDEl.textContent = usd(hoursD);
      totalEl.textContent = usd(total);
      multEl.textContent =
        "≈ " + mult.toFixed(1) + "× WHAT LOADHAWK COSTS — AND THE GUARANTEE COVERS YOU ANYWAY";
    }

    loadsIn.addEventListener("input", update);
    marginIn.addEventListener("input", update);
    update();
  }

  /* ----------------------------------------------------------
     3. TRANSCRIPT — staggered reveal on scroll
     ---------------------------------------------------------- */
  function transcript() {
    if (REDUCED || !window.gsap || !window.ScrollTrigger) return;
    const lines = document.querySelectorAll(".tr-line");
    if (!lines.length) return;
    gsap.set(lines, { opacity: 0, y: 24 });
    ScrollTrigger.batch(lines, {
      start: "top 88%",
      once: true,
      onEnter: function (batch) {
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.18 });
      },
    });
  }

  /* ----------------------------------------------------------
     4. STICKY MOBILE CTA — visible between hero and footer
     ---------------------------------------------------------- */
  function stickyCta() {
    const bar = document.getElementById("stickyCta");
    const hero = document.getElementById("hero");
    const footer = document.getElementById("contact");
    if (!bar || !hero || !footer) return;
    let heroVisible = true;
    let footerVisible = false;

    function sync() {
      bar.classList.toggle("show", !heroVisible && !footerVisible);
    }
    new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; sync(); }, { threshold: 0.1 }).observe(hero);
    new IntersectionObserver(function (e) { footerVisible = e[0].isIntersecting; sync(); }, { threshold: 0.05 }).observe(footer);
  }

  document.addEventListener("DOMContentLoaded", function () {
    theater();
    roi();
    transcript();
    stickyCta();
  });
})();
