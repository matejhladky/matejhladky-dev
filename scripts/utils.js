export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export function setActiveLink() {
  const currentPage = window.location.pathname === '/'
    ? 'index'
    : window.location.pathname.split("/").pop().split(".")[0];

  const activeLink = document.querySelector(`.nav-link[data-page="${currentPage}"]`);

  if (activeLink) {
    activeLink.classList.add("active");
  } else {
    console.warn(`No active link found for page "${currentPage}"`);
  }
}