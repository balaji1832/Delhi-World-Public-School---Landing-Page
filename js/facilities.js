// Facilities slider script
(function () {

  const section = document.querySelector(".fac9-section");
  if (!section) return;

  const facTrack = section.querySelector(".fac9-track");
  const facItems = section.querySelectorAll(".fac9-item");
  const nextBtn  = section.querySelector(".fac9-next");
  const prevBtn  = section.querySelector(".fac9-prev");

  let facIndex   = 0;
  let autoSlide  = null;

  let startX     = 0;
  let currentX   = 0;
  let isDragging = false;

  /* ---------- UPDATE POSITION ---------- */

  function updateSlider(offset = 0) {
    facTrack.style.transform =
      `translateX(calc(-${facIndex * 100}% + ${offset}px))`;
  }

  /* ---------- GO TO SLIDE ---------- */

  function goTo(index) {
    facIndex = ((index % facItems.length) + facItems.length) % facItems.length;

    facTrack.style.transition =
      "transform 1.8s cubic-bezier(0.4,0,0.2,1)";

    updateSlider();
  }

  /* ---------- AUTOPLAY ---------- */

  function startAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      goTo(facIndex + 1);
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  /* ---------- BUTTONS ---------- */

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goTo(facIndex + 1);
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goTo(facIndex - 1);
      startAutoSlide();
    });
  }

  /* ---------- HOVER PAUSE ---------- */

  facTrack.addEventListener("mouseenter", stopAutoSlide);

  facTrack.addEventListener("mouseleave", () => {
    if (!isDragging) startAutoSlide();
  });

  /* ---------- DRAG START ---------- */

  function dragStart(x) {
    isDragging = true;
    startX = x;
    currentX = x;

    stopAutoSlide();
    facTrack.style.transition = "none";
  }

  /* ---------- DRAG MOVE ---------- */

  function dragMove(x) {
    if (!isDragging) return;

    currentX = x;
    updateSlider(currentX - startX);
  }

  /* ---------- DRAG END ---------- */

  function dragEnd() {
    if (!isDragging) return;

    isDragging = false;

    const diff = currentX - startX;
    const threshold = facItems[0].offsetWidth * 0.25;

    if (diff < -threshold) goTo(facIndex + 1);
    else if (diff > threshold) goTo(facIndex - 1);
    else {
      facTrack.style.transition =
        "transform 1.8s cubic-bezier(0.4,0,0.2,1)";
      updateSlider();
    }

    startAutoSlide();
  }

  /* ---------- TOUCH EVENTS ---------- */

  facTrack.addEventListener(
    "touchstart",
    (e) => dragStart(e.touches[0].clientX),
    { passive: true }
  );

  facTrack.addEventListener(
    "touchmove",
    (e) => dragMove(e.touches[0].clientX),
    { passive: true }
  );

  facTrack.addEventListener("touchend", dragEnd);

  /* ---------- MOUSE EVENTS ---------- */

  facTrack.addEventListener("mousedown", (e) => {
    e.preventDefault();
    dragStart(e.clientX);
  });

  window.addEventListener("mousemove", (e) => {
    if (isDragging) dragMove(e.clientX);
  });

  window.addEventListener("mouseup", dragEnd);

  /* ---------- TRACKPAD SWIPE ---------- */

  let wheelTimer = null;
  let wheelAccum = 0;

  facTrack.addEventListener(
    "wheel",
    (e) => {

      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;

      e.preventDefault();

      stopAutoSlide();

      wheelAccum += e.deltaX;

      clearTimeout(wheelTimer);

      wheelTimer = setTimeout(() => {

        if (wheelAccum > 60) goTo(facIndex + 1);
        else if (wheelAccum < -60) goTo(facIndex - 1);

        wheelAccum = 0;

        startAutoSlide();

      }, 80);

    },
    { passive: false }
  );

  /* ---------- READ MORE / READ LESS ---------- */

  const readBtns = section.querySelectorAll(".read-more-btn");

  readBtns.forEach((btn) => {

    btn.addEventListener("click", function () {

      const text = this.previousElementSibling;

      if (!text.classList.contains("expanded")) {

        text.classList.add("expanded");
        this.innerText = "Read Less ▲";

      } else {

        text.classList.remove("expanded");
        this.innerText = "Read More ▼";

      }

    });

  });

  /* ---------- INIT ---------- */

  startAutoSlide();

})();