/* ============================================================
   STRUCTURE — MOTION ORCHESTRATION
   Lenis + GSAP ScrollTrigger on a single synced loop.
   ============================================================ */

(function () {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TOUCH = window.matchMedia("(pointer: coarse)").matches;
  const PAGE = document.body.dataset.page || "home";

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- LENIS SMOOTH SCROLL ---------- */
  let lenis = null;
  if (!REDUCED) {
    lenis = new Lenis({
      duration: 1.25,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  } else {
    document.documentElement.classList.add("reduced");
  }

  /* ---------- SPLIT HELPERS ---------- */
  function splitChars(el) {
    const text = el.textContent.trim();
    el.setAttribute("aria-label", text);
    el.textContent = "";
    const frag = document.createDocumentFragment();
    text.split(/\s+/).forEach(function (word, wi, arr) {
      const wordWrap = document.createElement("span");
      wordWrap.style.cssText = "display:inline-block;white-space:nowrap;";
      wordWrap.setAttribute("aria-hidden", "true");
      for (const ch of word) {
        const wrap = document.createElement("span");
        wrap.style.cssText = "display:inline-block;overflow:hidden;vertical-align:top;";
        const inner = document.createElement("span");
        inner.className = "ch";
        inner.style.display = "inline-block";
        inner.textContent = ch;
        wrap.appendChild(inner);
        wordWrap.appendChild(wrap);
      }
      frag.appendChild(wordWrap);
      if (wi < arr.length - 1) frag.appendChild(document.createTextNode(" "));
    });
    el.appendChild(frag);
    return el.querySelectorAll(".ch");
  }

  function splitWords(el) {
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute("aria-label", el.textContent.trim());
    el.textContent = "";
    words.forEach(function (w, i) {
      const span = document.createElement("span");
      span.className = "w";
      span.setAttribute("aria-hidden", "true");
      span.textContent = w;
      el.appendChild(span);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
    return el.querySelectorAll(".w");
  }

  /* ---------- PRELOADER ---------- */
  const preloader = document.getElementById("preloader");
  const preCount = document.getElementById("preCount");
  const preBar = document.getElementById("preBar");
  const preWord = document.getElementById("preWord");
  const WORDS = PAGE === "loadhawk"
    ? ["COVERAGE", "RATES", "NEGOTIATING", "RELIABILITY", "CALLER", "SUPPORT", "BOOKED"]
    : ["QUOTING", "DISPATCH", "CUSTOMS", "FORECASTING", "ROUTING", "DELIVERED"];

  function runPreloader(done) {
    if (REDUCED || !preloader) {
      if (preloader) preloader.style.display = "none";
      done();
      return;
    }
    if (lenis) lenis.stop();
    const state = { v: 0 };
    let wi = 0;
    const wordTimer = setInterval(function () {
      wi = (wi + 1) % WORDS.length;
      preWord.textContent = WORDS[wi];
    }, 260);

    gsap.to(state, {
      v: 100,
      duration: 1.9,
      ease: "power3.inOut",
      onUpdate: function () {
        const n = Math.floor(state.v);
        preCount.textContent = String(n).padStart(3, "0");
        preBar.style.width = state.v + "%";
      },
      onComplete: function () {
        clearInterval(wordTimer);
        gsap.timeline()
          .to(".pre-center, .pre-count", { opacity: 0, y: -30, duration: 0.45, ease: "power2.in" })
          .to(preloader, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.9,
            ease: "expo.inOut",
            onStart: function () { if (lenis) lenis.start(); },
            onComplete: function () {
              preloader.style.display = "none";
              done();
            },
          }, "-=0.1");
      },
    });
  }

  /* ---------- HERO INTRO ---------- */
  function heroIntro() {
    const lines = document.querySelectorAll("#hero .line-inner");
    const fades = document.querySelectorAll("#hero [data-fade], .nav");
    const tl = gsap.timeline();
    tl.to(lines, {
      y: 0,
      duration: 1.3,
      ease: "expo.out",
      stagger: 0.1,
    });
    tl.to(fades, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.07,
      clearProps: "transform",
    }, "-=0.9");
    return tl;
  }

  /* ---------- SCROLL ANIMATIONS ---------- */
  function initScrollFX() {

    /* progress bar */
    gsap.to("#progressBar", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.4 },
    });

    /* generic fades (everything outside hero) */
    document.querySelectorAll("[data-fade]").forEach(function (el) {
      if (el.closest("#hero")) return;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    /* masked line reveals outside hero (footer, guarantee) */
    document.querySelectorAll(".line-inner").forEach(function (el) {
      if (el.closest("#hero")) return;
      gsap.to(el, {
        y: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: el.closest(".line"), start: "top 88%", once: true },
      });
    });

    /* char splits */
    document.querySelectorAll("[data-split]").forEach(function (el) {
      const chars = splitChars(el);
      gsap.set(chars, { yPercent: 110 });
      gsap.to(chars, {
        yPercent: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.018,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    /* manifesto word scrub */
    document.querySelectorAll("[data-words]").forEach(function (el) {
      const words = splitWords(el);
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.06,
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          end: "bottom 45%",
          scrub: 0.6,
        },
      });
    });

    /* counters */
    document.querySelectorAll("[data-counter]").forEach(function (el) {
      if (el.hasAttribute("data-instant")) return;
      const target = parseFloat(el.dataset.counter);
      const format = el.dataset.format || "int";
      const state = { v: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: function () {
          gsap.to(state, {
            v: target,
            duration: 1.8,
            ease: "power3.out",
            onUpdate: function () {
              if (format === "comma") {
                el.textContent = Math.floor(state.v).toLocaleString("en-US");
              } else if (format === "decimal") {
                el.textContent = state.v.toFixed(1);
              } else {
                el.textContent = Math.floor(state.v);
              }
            },
          });
        },
      });
    });

    /* horizontal capabilities scroll (desktop only) */
    const track = document.getElementById("capsTrack");
    if (track) {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 821px)", function () {
        const pin = document.getElementById("capsPin");
        const getDist = function () { return track.scrollWidth - window.innerWidth; };
        const counter = document.getElementById("capsCount");
        const cards = track.querySelectorAll(".cap-card").length - 1;
        const tween = gsap.to(track, {
          x: function () { return -getDist(); },
          ease: "none",
          scrollTrigger: {
            trigger: ".caps",
            start: "top top",
            end: function () { return "+=" + getDist(); },
            pin: pin,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: function (self) {
              if (counter) {
                const i = Math.min(cards, Math.floor(self.progress * cards) + 1);
                counter.textContent = String(i).padStart(2, "0");
              }
            },
          },
        });
        return function () { tween.scrollTrigger && tween.scrollTrigger.kill(); };
      });
    }

    /* pipeline fill */
    const pipeFill = document.getElementById("pipeFill");
    if (pipeFill) {
      gsap.to(pipeFill, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".pipe-track",
          start: "top 80%",
          end: "bottom 35%",
          scrub: 0.5,
        },
      });
    }

    /* footer giant parallax drift */
    document.querySelectorAll(".footer-giant").forEach(function (el) {
      gsap.fromTo(el, { yPercent: 40 }, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
      });
    });

    /* hero canvas subtle parallax out */
    const heroCanvas = document.querySelector("#heroCanvas, #radarCanvas");
    if (heroCanvas) {
      gsap.to(heroCanvas, {
        yPercent: 18,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }
  }

  /* ---------- MARQUEES (with scroll velocity) ---------- */
  function initMarquees() {
    document.querySelectorAll(".marquee").forEach(function (mq) {
      const trackEl = mq.querySelector(".marquee-track");
      const speed = parseFloat(mq.dataset.marqueeSpeed || "1");
      const tween = gsap.to(trackEl, {
        xPercent: -50,
        ease: "none",
        duration: 28 / speed,
        repeat: -1,
      });
      if (REDUCED) return;
      let proxy = { ts: 1 };
      ScrollTrigger.create({
        trigger: mq,
        start: "top bottom",
        end: "bottom top",
        onUpdate: function (self) {
          const v = Math.min(4, 1 + Math.abs(self.getVelocity()) / 900);
          gsap.to(proxy, {
            ts: v,
            duration: 0.4,
            overwrite: true,
            onUpdate: function () { tween.timeScale(proxy.ts); },
          });
        },
      });
    });
  }

  /* ---------- CURSOR ---------- */
  function initCursor() {
    if (TOUCH || REDUCED) return;
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;
    let rx = -100, ry = -100, tx = -100, ty = -100;

    window.addEventListener("pointermove", function (e) {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = "translate(" + (tx - 4) + "px," + (ty - 4) + "px)";
    });
    gsap.ticker.add(function () {
      rx += (tx - rx) * 0.14;
      ry += (ty - ry) * 0.14;
      ring.style.transform = "translate(" + (rx - ring.offsetWidth / 2) + "px," + (ry - ring.offsetHeight / 2) + "px)";
    });
    document.addEventListener("pointerdown", function () { ring.classList.add("is-down"); });
    document.addEventListener("pointerup", function () { ring.classList.remove("is-down"); });
    document.addEventListener("pointerover", function (e) {
      if (e.target.closest("[data-hover], a, button")) ring.classList.add("is-hover");
    });
    document.addEventListener("pointerout", function (e) {
      if (e.target.closest("[data-hover], a, button")) ring.classList.remove("is-hover");
    });
  }

  /* ---------- MAGNETIC ELEMENTS ---------- */
  function initMagnetic() {
    if (TOUCH || REDUCED) return;
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      const strength = 0.35;
      el.addEventListener("pointermove", function (e) {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        gsap.to(el, { x: x, y: y, duration: 0.5, ease: "power3.out" });
      });
      el.addEventListener("pointerleave", function () {
        gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
      });
    });
  }

  /* ---------- CARD SPOTLIGHT ---------- */
  function initSpotlight() {
    if (TOUCH) return;
    document.querySelectorAll(".cap-card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
      });
    });
  }

  /* ---------- NAV ---------- */
  function initNav() {
    const nav = document.getElementById("nav");
    let lastY = 0;
    function onScroll(y) {
      if (document.body.classList.contains("menu-open")) return;
      if (y > 140 && y > lastY + 4) nav.classList.add("nav-hidden");
      else if (y < lastY - 4) nav.classList.remove("nav-hidden");
      lastY = y;
    }
    if (lenis) lenis.on("scroll", function (e) { onScroll(e.scroll); });
    else window.addEventListener("scroll", function () { onScroll(window.scrollY); });

    const burger = document.getElementById("burger");
    if (burger) {
      burger.addEventListener("click", function () {
        const open = document.body.classList.toggle("menu-open");
        if (lenis) { open ? lenis.stop() : lenis.start(); }
      });
    }
    document.querySelectorAll(".menu-overlay a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        if (lenis) lenis.start();
      });
    });
  }

  /* ---------- ANCHOR SCROLL ---------- */
  function initAnchors() {
    document.querySelectorAll("[data-scrollto]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        const href = a.getAttribute("href");
        if (!href || href.charAt(0) !== "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.6 });
        else target.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  /* ---------- OPS FEED (live terminal) ---------- */
  function initOpsFeed() {
    const feed = document.getElementById("opsFeed");
    if (!feed || REDUCED) return;
    const LANES = ["CHI→ATL", "DAL→PHX", "LAX→SEA", "MEM→CLT", "HOU→DEN", "JAX→BNA", "KC→MSP", "ELP→SAT", "CMH→PIT", "STL→IND"];
    const HOME_EVENTS = [
      ["QUOTE SENT", "{lane}", "{s}s", true],
      ["LOAD COVERED", "{lane}", "{m}m {s}s", true],
      ["RATE LOCKED", "{lane}", "-${d}/load", true],
      ["DOCS CLEARED", "{lane}", "AUTO", true],
      ["INVOICE MATCHED", "#{id}", "0 ERRORS", true],
      ["FORECAST UPDATED", "{lane}", "+{p}% DEMAND", false],
      ["DISPATCH SYNCED", "{lane}", "0 HANDOFFS", false],
    ];
    const LH_EVENTS = [
      ["COVERAGE", "12 CARRIERS PINGED", "{lane}", true],
      ["RATE AGENT", "COUNTERED +${d}", "{lane}", true],
      ["CALLER", "CARRIER PICKED UP", "{s}s RING", true],
      ["RELIABILITY", "CARRIER SCORED {sc}", "{lane}", false],
      ["SUPPORT", "ETA SENT TO SHIPPER", "14s", true],
      ["SPOTTER", "LOAD +{p}% OVER MARKET", "{lane}", true],
      ["REACTIVATION", "DORMANT CARRIER REPLIED", "61 DAYS", true],
      ["COVERAGE", "5 RATES IN", "{m}m {s}s", true],
    ];
    const EVENTS = PAGE === "loadhawk" ? LH_EVENTS : HOME_EVENTS;
    const rnd = function (a, b) { return Math.floor(a + Math.random() * (b - a)); };

    function fmt(str) {
      return str
        .replace("{lane}", LANES[rnd(0, LANES.length)])
        .replace("{s}", rnd(8, 58))
        .replace("{m}", rnd(2, 9))
        .replace("{d}", rnd(40, 240))
        .replace("{p}", rnd(8, 22))
        .replace("{sc}", rnd(78, 98))
        .replace("{id}", rnd(1000, 9800));
    }

    function clock() {
      const d = new Date();
      return [d.getHours(), d.getMinutes(), d.getSeconds()]
        .map(function (n) { return String(n).padStart(2, "0"); })
        .join(":");
    }

    function push() {
      const ev = EVENTS[rnd(0, EVENTS.length)];
      const line = document.createElement("div");
      line.className = "opsfeed-line";
      line.innerHTML =
        '<span class="t">' + clock() + "</span>" +
        (ev[3] ? '<span class="ok">✦ </span>' : "") +
        fmt(ev[0]) + " — " + fmt(ev[1]) + " · " + fmt(ev[2]);
      line.style.opacity = "0";
      feed.prepend(line);
      gsap.to(line, { opacity: 1, duration: 0.4 });
      while (feed.children.length > 6) feed.removeChild(feed.lastChild);
    }

    for (let i = 0; i < 5; i++) push();
    (function loop() {
      setTimeout(function () { push(); loop(); }, rnd(1800, 4200));
    })();
  }

  /* ---------- TEXT DECODE (mono labels) ---------- */
  function initDecode() {
    if (REDUCED) return;
    const GLYPHS = "▮▯/\\|=+*#<>_–01";
    document.querySelectorAll(".section-name, .cap-status, .agent-stat").forEach(function (el) {
      const finalText = el.textContent;
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: function () {
          let frame = 0;
          const total = Math.max(14, finalText.length + 6);
          const timer = setInterval(function () {
            frame++;
            const settled = Math.floor((frame / total) * finalText.length);
            let out = "";
            for (let i = 0; i < finalText.length; i++) {
              if (i < settled || finalText[i] === " ") out += finalText[i];
              else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
            el.textContent = out;
            if (frame >= total) { el.textContent = finalText; clearInterval(timer); }
          }, 34);
        },
      });
    });
  }

  /* ---------- 3D TILT CARDS ---------- */
  function initTilt() {
    if (TOUCH || REDUCED) return;
    document.querySelectorAll(".problem-card, .impact-cell, .fit-cell, .pipe-cell").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, {
          rotateY: px * 6,
          rotateX: -py * 6,
          transformPerspective: 900,
          duration: 0.5,
          ease: "power2.out",
        });
      });
      card.addEventListener("pointerleave", function () {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });
      });
    });
  }

  /* ---------- PIPELINE RUNNER ---------- */
  function initPipeRunner() {
    if (REDUCED) return;
    const line = document.querySelector(".pipe-line");
    if (!line) return;
    const runner = document.createElement("span");
    runner.className = "pipe-runner";
    line.appendChild(runner);
    gsap.fromTo(runner, { left: "0%" }, {
      left: "100%",
      duration: 6,
      ease: "power1.inOut",
      repeat: -1,
      repeatDelay: 0.8,
    });
  }

  /* ---------- FAQ (exclusive accordion) ---------- */
  function initFaq() {
    const items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (item.open) {
          items.forEach(function (other) { if (other !== item) other.open = false; });
          const p = item.querySelector("p");
          if (p && !REDUCED) gsap.from(p, { y: 14, opacity: 0, duration: 0.5, ease: "power3.out" });
        }
      });
    });
  }

  /* ---------- CONTACT FORM ---------- */
  function initForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    const status = document.getElementById("formStatus");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      status.textContent = "TRANSMITTING…";
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("send failed");
          done();
        })
        .catch(function () {
          // fallback: hand off to email client with the details pre-filled
          const body =
            "Name: " + (data.get("name") || "") +
            "%0ACompany: " + (data.get("company") || "") +
            "%0AEmail: " + (data.get("email") || "") +
            "%0AMonthly loads: " + (data.get("volume") || "") +
            "%0A%0A" + encodeURIComponent(data.get("message") || "");
          window.location.href =
            "mailto:sales@structurelogistics.com?subject=" +
            encodeURIComponent("New inquiry — " + (data.get("company") || "Structure website")) +
            "&body=" + body;
          done();
        });
      function done() {
        form.classList.add("is-sent");
        status.textContent = "✦ RECEIVED — WE'LL BE IN TOUCH WITHIN 24H";
        const label = form.querySelector(".form-submit .btn-label");
        if (label) label.textContent = "Sent ✦";
      }
    });
  }

  /* ---------- AGENT CARDS (touch toggle) ---------- */
  function initAgents() {
    if (!TOUCH) return;
    document.querySelectorAll(".agent-card").forEach(function (card) {
      card.addEventListener("click", function () {
        card.classList.toggle("is-open");
      });
    });
  }

  /* ---------- BOOT ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initCursor();
    initNav();
    initAnchors();
    initMagnetic();
    initSpotlight();
    initAgents();
    initFaq();
    initForm();

    runPreloader(function () {
      heroIntro();
      initScrollFX();
      initMarquees();
      initOpsFeed();
      initDecode();
      initTilt();
      initPipeRunner();
      ScrollTrigger.refresh();
    });
  });
})();
