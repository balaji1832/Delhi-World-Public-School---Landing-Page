

  document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".vmp-swiper", {
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 650,
      grabCursor: true,
      loop: false,
      autoHeight: false,
      pagination: {
        el: ".vmp-dots",
        clickable: true,
      },
      navigation: {
        nextEl: ".vmp-next",
        prevEl: ".vmp-prev",
      },
      breakpoints: {
        480: { slidesPerView: 1.08, spaceBetween: 14 },
        640: { slidesPerView: 1.12, spaceBetween: 16 },
        768: { slidesPerView: 1.35, spaceBetween: 18 },
        1024: { slidesPerView: 2, spaceBetween: 24 },
        1280: { slidesPerView: 3, spaceBetween: 28 },
      },
    });

    const toggleButtons = document.querySelectorAll(".vmp-toggle");

    toggleButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target");
        const currentExtra = document.getElementById(targetId);
        const currentCard = this.closest(".vmp-card");
        const currentLabel = this.querySelector(".btn-label");
        const isAlreadyOpen = currentExtra.classList.contains("open");

        document.querySelectorAll(".vmp-extra").forEach(function (extra) {
          extra.classList.remove("open");
        });

        document.querySelectorAll(".vmp-toggle").forEach(function (button) {
          button.classList.remove("open");
          const label = button.querySelector(".btn-label");
          if (label) label.textContent = "Read more";
        });

        document.querySelectorAll(".vmp-card").forEach(function (card) {
          card.classList.remove("is-open");
          const body = card.querySelector(".vmp-body");
          if (body) body.scrollTop = 0;
        });

        if (!isAlreadyOpen) {
          currentExtra.classList.add("open");
          currentCard.classList.add("is-open");
          this.classList.add("open");
          currentLabel.textContent = "Read less";
        }

        setTimeout(() => {
          swiper.update();
        }, 300);
      });
    });
  });
