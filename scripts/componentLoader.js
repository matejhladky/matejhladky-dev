async function loadComponent(selector, filePath) {
  const element = document.querySelector(selector);
  if (element) {
    const response = await fetch(filePath);
    const html = await response.text();
    element.innerHTML = html;

    setActiveLink();
  }
}

function setActiveLink() {
  const currentPage = window.location.pathname.split("/").pop().split(".")[0];
  const activeLink = document.querySelector(`.nav-link[data-page="${currentPage}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
}

loadComponent("#footer", "./components/footer.html");
loadComponent("#header", "./components/header.html");
loadComponent("#loader", "./components/loader.html");
