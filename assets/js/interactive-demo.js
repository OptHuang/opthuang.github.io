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

  if (reduceMotion || !("IntersectionObserver" in window)) {
    return;
  }

  const revealTargets = document.querySelectorAll([
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
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.1 });

  revealTargets.forEach((target) => observer.observe(target));
})();
