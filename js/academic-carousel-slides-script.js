// Academic program carousel slides

const track = document.getElementById("track");
let current = 0;
let autoSlide;

/* DUPLICATE CARDS FOR INFINITE LOOP */
const cards = Array.from(track.children);

cards.forEach((card) => {
  const clone = card.cloneNode(true);
  track.appendChild(clone);
});

function getCardWidth() {
  const card = track.children[0];
  const gap = 24;
  return card.offsetWidth + gap;
}

/* SLIDE FUNCTION */

function slide(dir = 1) {
  const width = getCardWidth();
  current += dir;

  const total = cards.length;

  track.style.transform = `translateX(-${current * width}px)`;

  if (current >= total) {
    setTimeout(() => {
      track.style.transition = "none";
      current = 0;
      track.style.transform = `translateX(0px)`;

      setTimeout(() => {
        track.style.transition = "transform 0.6s ease";
      }, 50);
    }, 600);
  }

  restartAuto();
}

/* AUTO SLIDE */

function startAuto() {
  autoSlide = setInterval(() => {
    slide(1);
  }, 3500); // speed of auto slide
}

function stopAuto() {
  clearInterval(autoSlide);
}

function restartAuto() {
  stopAuto();
  startAuto();
}

startAuto();

/* TOUCH SWIPE FOR MOBILE */

let startX = 0;
let endX = 0;

track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

track.addEventListener("touchend", () => {
  if (startX - endX > 50) {
    slide(1); // swipe left
  }

  if (endX - startX > 50) {
    slide(-1); // swipe right
  }
});

/* PAUSE ON HOVER (DESKTOP) */

track.addEventListener("mouseenter", stopAuto);
track.addEventListener("mouseleave", startAuto);