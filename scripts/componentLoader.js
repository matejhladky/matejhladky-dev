export async function loadComponent(selector, filePath) {
  const element = document.querySelector(selector);
  if (element) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        console.error(`Failed to fetch ${filePath}: ${response.statusText}`);
        return;
      }

      const html = await response.text();
      element.innerHTML = html;

      // setActiveLink();
    } catch (error) {
      console.error(`Error loading component from ${filePath}:`, error);
    }
  } else {
    console.error(`Element with selector ${selector} not found.`);
  }
}

function setActiveLink() {
  const currentPage = window.location.pathname.split("/").pop().split(".")[0];
  const activeLink = document.querySelector(`.nav-link[data-page="${currentPage}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  } else {
    console.warn(`No active link found for page "${currentPage}"`);
  }
}
