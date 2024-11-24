export async function loadComponent(selector, filePath) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Optional component with selector "${selector}" not found.`);
    return Promise.resolve();
  }

  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      const error = `Failed to fetch ${filePath}: ${response.statusText}`;
      console.error(error);
      return Promise.reject(new Error(error));
    }

    const html = await response.text();
    element.innerHTML = html;

    setActiveLink();
    return Promise.resolve();
  } catch (error) {
    console.error(`Error loading component from ${filePath}:`, error);
    return Promise.reject(error);
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