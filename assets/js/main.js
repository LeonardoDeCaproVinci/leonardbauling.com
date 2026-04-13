const BUILD_ID = "20260413b";

const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");
const year = document.getElementById("year");
const projectGrid = document.getElementById("project-grid");
const emailAction = document.getElementById("email-action");
const emailFallback = document.getElementById("email-fallback");
const emailLink = document.getElementById("email-link");
const emailCopy = document.getElementById("email-copy");
const emailStatus = document.getElementById("email-status");

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

if ("IntersectionObserver" in window) {
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
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}

async function loadProjects() {
  if (!projectGrid) return;

  try {
    const response = await fetch(`assets/data/projects.json?v=${BUILD_ID}`, { cache: "no-store" });
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

if (window.location.hostname === "localhost" && "serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
}

if (emailAction) {
  emailAction.addEventListener("click", () => {
    const user = "leonard";
    const host = "leonardbauling.com";
    const email = `${user}@${host}`;
    const mailto = `mailto:${email}`;

    emailAction.textContent = email;
    emailAction.setAttribute("aria-label", `Email ${email}`);

    if (emailLink) {
      emailLink.href = mailto;
      emailLink.textContent = email;
    }

    if (emailFallback) {
      emailFallback.hidden = false;
    }

    if (emailStatus) {
      emailStatus.textContent = "";
    }

    window.location.href = mailto;
  });
}

if (emailCopy) {
  emailCopy.addEventListener("click", async () => {
    const email = "leonard@leonardbauling.com";

    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      if (emailStatus) {
        emailStatus.textContent = " Copy is not supported in this browser.";
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      if (emailStatus) {
        emailStatus.textContent = " Email copied.";
      }
    } catch (error) {
      if (emailStatus) {
        emailStatus.textContent = " Copy failed. Please copy the address manually.";
      }
    }
  });
}
