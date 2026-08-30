const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const progress = document.getElementById("scrollProgress");

menuToggle?.addEventListener("click", () => {
  const open = navbar.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.innerHTML = open
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

const updateScroll = () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height ? (scrollTop / height) * 100 : 0}%`;
  header.classList.toggle("scrolled", scrollTop > 20);
};

window.addEventListener("scroll", updateScroll, { passive: true });
updateScroll();

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".navbar a")];

const setActiveNav = () => {
  const y = window.scrollY + 150;
  let current = sections[0]?.id;
  sections.forEach(section => {
    if (y >= section.offsetTop) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", setActiveNav, { passive: true });
setActiveNav();

document.addEventListener("contextmenu", event => {
  const target = event.target;
  if (target instanceof HTMLImageElement && target.alt === "Kumar Reddy Kunchala") {
    event.preventDefault();
  }
});

document.addEventListener("dragstart", event => {
  const target = event.target;
  if (target instanceof HTMLImageElement && target.alt === "Kumar Reddy Kunchala") {
    event.preventDefault();
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
