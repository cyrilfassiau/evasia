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


const cards = document.querySelectorAll(".avis_card");
let current = 0;

function show(index) {
  cards.forEach((card) => card.classList.add("hidden"));
  cards[index].classList.remove("hidden");
}

document.querySelector(".avis_prev").addEventListener("click", () => {
  current = (current - 1 + cards.length) % cards.length;
  show(current);
});

document.querySelector(".avis_next").addEventListener("click", () => {
  current = (current + 1) % cards.length;
  show(current);
});

document.querySelectorAll(".grid-item").forEach((item) => {
  item.addEventListener("touchstart", () => {
    // Retire la classe des autres items
    document.querySelectorAll(".grid-item").forEach((el) => {
      if (el !== item) el.classList.remove("touched");
    });
    item.classList.toggle("touched");
  }, { passive: true });
});

