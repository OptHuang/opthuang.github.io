(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ticking = false;

  const updateScroll = () => {
    const maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
    const ratio = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    root.style.setProperty("--scroll-ratio", ratio.toFixed(4));
    root.style.setProperty("--atmosphere-shift", `${Math.round(window.scrollY * -0.035)}px`);
    ticking = false;
  };

  const requestScrollUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScroll);
      ticking = true;
    }
  };

  updateScroll();
  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate);

  const focusTargets = document.querySelectorAll("[data-home-focus]");
  const setHomeFocus = (focus) => {
    root.dataset.homeFocus = focus;
    focusTargets.forEach((target) => {
      target.classList.toggle("is-active", target.dataset.homeFocus === focus);
    });
  };

  if (focusTargets.length) {
    setHomeFocus("intro");
  }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    return;
  }

  const revealTargets = document.querySelectorAll([
    ".home-reveal",
    ".home-body > *",
    ".blog-cards .card",
    ".page article > h2",
    ".page article > p",
    ".page article > ul",
    ".post-content > *"
  ].join(","));

  revealTargets.forEach((target) => target.classList.add("scroll-reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });

  revealTargets.forEach((target) => observer.observe(target));

  if (focusTargets.length) {
    const focusObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setHomeFocus(entry.target.dataset.homeFocus);
        }
      });
    }, { rootMargin: "-38% 0px -48% 0px", threshold: 0 });

    focusTargets.forEach((target) => focusObserver.observe(target));
  }
})();
