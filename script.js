document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav_links");

  if (!burger || !navLinks) return; // sécurité

  // Au clic sur le burger -> toggle des classes actives
  burger.addEventListener("click", () => {
    burger.classList.toggle("toggle"); // animation du burger
    navLinks.classList.toggle("active"); // ouverture du menu
  });

  // Ferme le menu quand on clique sur un lien
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      burger.classList.remove("toggle");
    });
  });

  // Optionnel : ferme le menu si on redimensionne l’écran
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      navLinks.classList.remove("active");
      burger.classList.remove("toggle");
    }
  });
});