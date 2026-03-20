document.addEventListener("DOMContentLoaded", function () {

  /* ===============================
     NAVBAR ACTIVE SECTION
  =============================== */

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.remove("after:w-full", "text-green-600");
        });
        const activeLink = document.querySelector('.nav-link[href="#' + id + '"]');
        if (activeLink) {
          activeLink.classList.add("after:w-full", "text-green-600");
        }
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(section => observer.observe(section));


  /* ===============================
     MOBILE MENU TOGGLE
  =============================== */

  const menuBtn    = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("hidden");
    });
  }


  /* ===============================
     MOBILE DISCLOSURE ACCORDION
  =============================== */

  const disclosureBtn   = document.getElementById("mobileDisclosureBtn");
  const disclosureMenu  = document.getElementById("mobileDisclosureMenu");
  const disclosureArrow = document.getElementById("mobileDisclosureArrow");

  if (disclosureBtn && disclosureMenu) {
    disclosureBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = disclosureMenu.classList.contains("hidden");
      disclosureMenu.classList.toggle("hidden", !isHidden);
      disclosureMenu.classList.toggle("flex", isHidden);
      disclosureArrow.classList.toggle("rotate-180", isHidden);
    });
  }


  /* ===============================
     CLOSE MOBILE MENU ON LINK CLICK
  =============================== */

  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      // Also reset accordion
      if (disclosureMenu) {
        disclosureMenu.classList.add("hidden");
        disclosureMenu.classList.remove("flex");
      }
      if (disclosureArrow) {
        disclosureArrow.classList.remove("rotate-180");
      }
    });
  });


  /* ===============================
     CLOSE MOBILE MENU ON OUTSIDE CLICK
  =============================== */

  document.addEventListener("click", (e) => {
    if (
      mobileMenu &&
      !mobileMenu.classList.contains("hidden") &&
      !mobileMenu.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      // Close menu
      mobileMenu.classList.add("hidden");

      // Reset accordion
      if (disclosureMenu && !disclosureMenu.classList.contains("hidden")) {
        disclosureMenu.classList.add("hidden");
        disclosureMenu.classList.remove("flex");
        disclosureArrow.classList.remove("rotate-180");
      }
    }
  });

});