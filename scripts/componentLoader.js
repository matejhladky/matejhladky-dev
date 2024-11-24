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

    return Promise.resolve();
  } catch (error) {
    console.error(`Error loading component from ${filePath}:`, error);
    return Promise.reject(error);
  }
}