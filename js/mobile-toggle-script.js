
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

  }, {
    threshold: 0.6
  });

  sections.forEach(section => {
    observer.observe(section);
  });


  /* ===============================
     MOBILE MENU TOGGLE
  =============================== */

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if(menuBtn && mobileMenu){
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

});
