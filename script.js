const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const metricObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const number = entry.target;
      const target = Number(number.dataset.count || "0");
      const start = performance.now();
      const duration = 1200;

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        number.textContent = Math.round(target * eased).toLocaleString("zh-CN");

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
      metricObserver.unobserve(number);
    });
  },
  { threshold: 0.55 }
);

document.querySelectorAll("[data-count]").forEach((number) => metricObserver.observe(number));
