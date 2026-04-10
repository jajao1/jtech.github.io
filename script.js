const sections = [...document.querySelectorAll(".doc-section")];
const navLinks = [...document.querySelectorAll(".sidebar-nav a")];
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

const setActiveLink = () => {
  const current = sections.findLast((section) => window.scrollY + 160 >= section.offsetTop);
  navLinks.forEach((link) => {
    link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
  });
};

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
};

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("load", setActiveLink);

menuToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 1080) {
      closeMenu();
    }
  });
});

document.addEventListener("click", (event) => {
  if (
    window.innerWidth <= 1080 &&
    document.body.classList.contains("menu-open") &&
    !sidebar.contains(event.target) &&
    event.target !== menuToggle
  ) {
    closeMenu();
  }
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;

    await navigator.clipboard.writeText(target.innerText.trim());
    const previous = button.textContent;
    button.textContent = "Copied";

    window.setTimeout(() => {
      button.textContent = previous;
    }, 1200);
  });
});
