/* =========================================
   FLUXION WINGS
   Main JavaScript
========================================= */

/* =========================
   NAVBAR
========================= */

const navbar = document.getElementById("navbar");

if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");

    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");

      menuToggle.textContent = "☰";
    });
  });
}

/* =========================
   FLAVOR FILTER
========================= */

const filterButtons = document.querySelectorAll(".filter-btn");

const flavorCards = document.querySelectorAll(".flavor-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    /* Remove active state */

    filterButtons.forEach((filter) => {
      filter.classList.remove("active");
    });

    /* Activate clicked button */

    button.classList.add("active");

    const selectedFilter = button.dataset.filter;

    /* Filter cards */

    flavorCards.forEach((card) => {
      const category = card.dataset.category;

      if (selectedFilter === "all" || category === selectedFilter) {
        card.classList.remove("hidden");

        card.animate(
          [
            {
              opacity: 0,
              transform: "translateY(15px)",
            },
            {
              opacity: 1,
              transform: "translateY(0)",
            },
          ],
          {
            duration: 300,
            easing: "ease-out",
          },
        );
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

/* =========================
   FLAVOR MODAL
========================= */

const flavorModal = document.getElementById("flavorModal");

const modalClose = document.getElementById("modalClose");

const modalName = document.getElementById("modalName");

const modalPrice = document.getElementById("modalPrice");

const modalDescription = document.getElementById("modalDescription");

const modalSpice = document.getElementById("modalSpice");

/* =========================
   SPICE TEXT
========================= */

function getSpiceText(level) {
  switch (level) {
    case 1:
      return "🌶 Mild";

    case 2:
      return "🌶🌶 Sweet Heat";

    case 3:
      return "🌶🌶🌶 Medium";

    case 4:
      return "🌶🌶🌶🌶 Hot";

    case 5:
      return "🌶🌶🌶🌶🌶 Extreme";

    default:
      return "🌶 Mild";
  }
}

/* =========================
   OPEN FLAVOR MODAL
========================= */

function openFlavorModal(card) {
  const name = card.dataset.name || "";

  const price = card.dataset.price || "";

  const description = card.dataset.description || "";

  const spice = Number(card.dataset.spice) || 1;

  /* =====================================
     GET IMAGE FROM CLICKED FLAVOR CARD
  ===================================== */

  const cardImage = card.querySelector(".flavor-image img");

  const modalImage = flavorModal
    ? flavorModal.querySelector(".modal-image img")
    : null;

  /* =====================================
     USE THE EXACT CARD IMAGE
  ===================================== */

  if (cardImage && modalImage) {
    modalImage.src = cardImage.currentSrc || cardImage.src;

    modalImage.alt = cardImage.alt || name;
  }

  /* =====================================
     UPDATE MODAL INFORMATION
  ===================================== */

  if (modalName) {
    modalName.textContent = name;
  }

  if (modalPrice) {
    modalPrice.textContent = price;
  }

  if (modalDescription) {
    modalDescription.textContent = description;
  }

  if (modalSpice) {
    modalSpice.textContent = getSpiceText(spice);
  }

  /* =====================================
     SHOW MODAL
  ===================================== */

  if (flavorModal) {
    flavorModal.classList.add("show");

    flavorModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");
  }
}

/* =========================
   CLOSE FLAVOR MODAL
========================= */

function closeFlavorModal() {
  if (!flavorModal) {
    return;
  }

  flavorModal.classList.remove("show");

  flavorModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}

/* =========================
   FLAVOR CARD CLICK
========================= */

flavorCards.forEach((card) => {
  card.addEventListener("click", () => {
    openFlavorModal(card);
  });
});

/* =========================
   CLOSE BUTTON
========================= */

if (modalClose) {
  modalClose.addEventListener("click", closeFlavorModal);
}

/* =========================
   CLICK OUTSIDE MODAL
========================= */

if (flavorModal) {
  flavorModal.addEventListener("click", (event) => {
    if (event.target === flavorModal) {
      closeFlavorModal();
    }
  });
}

/* =========================
   ESCAPE KEY
========================= */

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    flavorModal &&
    flavorModal.classList.contains("show")
  ) {
    closeFlavorModal();
  }
});

/* =========================
   PREVENT MODAL BOX CLOSE
========================= */

const modalBox = document.querySelector(".modal-box");

if (modalBox) {
  modalBox.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

/* =========================================================
   ALL ORDER NOW BUTTONS → MESSENGER
========================================================= */

const MESSENGER_URL = "https://m.me/YOUR_FLUXION_WINGS_PAGE";

/* Flavor modal ORDER THIS FLAVOR button */

const modalOrder = document.getElementById("modalOrder");

if (modalOrder) {
  modalOrder.addEventListener("click", () => {
    closeFlavorModal();

    window.open(MESSENGER_URL, "_blank");
  });
}

/* Main / bottom ORDER NOW buttons */

const orderNowButtons = document.querySelectorAll(
  ".order-now, .order-now-btn, [data-order-now]",
);

orderNowButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    window.open(MESSENGER_URL, "_blank");
  });
});
/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

/* =========================
   SMOOTH NAVIGATION
========================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetID = link.getAttribute("href");

    if (!targetID || targetID === "#") {
      return;
    }

    const target = document.querySelector(targetID);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

/* =========================
   INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", () => {
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();

    if (rect.top < window.innerHeight) {
      element.classList.add("visible");
    }
  });
});
