const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");
const year = document.getElementById("year");
const projectGrid = document.getElementById("project-grid");
const emailAction = document.getElementById("email-action");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((anchor) => {
    anchor.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

async function loadProjects() {
  if (!projectGrid) return;

  try {
    const response = await fetch("assets/data/projects.json");
    if (!response.ok) throw new Error("Failed to load projects.json");
    const projects = await response.json();

    projectGrid.innerHTML = projects
      .map(
        (project) => `
        <article class="project-card">
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <div class="project-meta">
            ${project.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}
          </div>
        </article>
      `
      )
      .join("");
  } catch (error) {
    projectGrid.innerHTML = `
      <article class="project-card">
        <h3>Projects coming in soon</h3>
        <p>Project cards are configured through <code>assets/data/projects.json</code>.</p>
      </article>
    `;
  }
}

loadProjects();

if (emailAction) {
  emailAction.addEventListener("click", () => {
    const user = "hello";
    const host = "leonardbauling.com";
    const email = `${user}@${host}`;
    emailAction.textContent = email;
    emailAction.setAttribute("aria-label", `Email ${email}`);
    window.location.href = `mailto:${email}`;
  });
}
