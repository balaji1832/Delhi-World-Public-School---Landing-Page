// Facilities script
(function () {
  const section  = document.querySelector(".fac9-section");
  const facTrack = section.querySelector(".fac9-track");
  const facItems = section.querySelectorAll(".fac9-item");
  const nextBtn  = section.querySelector(".fac9-next");
  const prevBtn  = section.querySelector(".fac9-prev");

  let facIndex   = 0;
  let autoSlide;
  let startX     = 0;
  let currentX   = 0;
  let isDragging = false;

  function updateSlider(offset = 0) {
    facTrack.style.transform = `translateX(calc(-${facIndex * 100}% + ${offset}px))`;
  }

  function goTo(index) {
    facIndex = ((index % facItems.length) + facItems.length) % facItems.length;
    facTrack.style.transition = "transform 1.8s cubic-bezier(0.4, 0.0, 0.2, 1)";
    updateSlider();
  }

  function startAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => goTo(facIndex + 1), 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  // Buttons
  nextBtn.onclick = () => { goTo(facIndex + 1); startAutoSlide(); };
  prevBtn.onclick = () => { goTo(facIndex - 1); startAutoSlide(); };

  // Hover pause
  facTrack.addEventListener("mouseenter", stopAutoSlide);
  facTrack.addEventListener("mouseleave", () => { if (!isDragging) startAutoSlide(); });

  /* ── TOUCH & MOUSE DRAG ── */
  function dragStart(x) {
    isDragging = true;
    startX = x;
    currentX = x;
    stopAutoSlide();
    facTrack.style.transition = "none";
  }

  function dragMove(x) {
    if (!isDragging) return;
    currentX = x;
    updateSlider(currentX - startX);
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    const diff      = currentX - startX;
    const threshold = facItems[0].offsetWidth * 0.25;
    if      (diff < -threshold) goTo(facIndex + 1);
    else if (diff >  threshold) goTo(facIndex - 1);
    else {
      facTrack.style.transition = "transform 1.8s cubic-bezier(0.4, 0.0, 0.2, 1)";
      updateSlider();
    }
    startAutoSlide();
  }

  facTrack.addEventListener("touchstart", (e) => dragStart(e.touches[0].clientX), { passive: true });
  facTrack.addEventListener("touchmove",  (e) => dragMove(e.touches[0].clientX),  { passive: true });
  facTrack.addEventListener("touchend",   () => dragEnd());

  facTrack.addEventListener("mousedown",  (e) => { e.preventDefault(); dragStart(e.clientX); });
  facTrack.addEventListener("mousemove",  (e) => dragMove(e.clientX));
  facTrack.addEventListener("mouseup",    () => dragEnd());

  /* ── TRACKPAD SWIPE ── */
  let wheelTimer = null;
  let wheelAccum = 0;

  facTrack.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
    e.preventDefault();
    stopAutoSlide();
    wheelAccum += e.deltaX;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      if      (wheelAccum >  60) goTo(facIndex + 1);
      else if (wheelAccum < -60) goTo(facIndex - 1);
      wheelAccum = 0;
      startAutoSlide();
    }, 80);
  }, { passive: false });

  // Init
  startAutoSlide();
})();
