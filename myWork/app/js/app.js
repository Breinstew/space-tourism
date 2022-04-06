
const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

// when someone clicks the humburger
navToggle.addEventListener("click", () => {
  // if the nav is closed, open it
  const visibility = nav.getAttribute("data-visible");
  // if the nav is open, close it
  if (visibility === "false") {
    nav.setAttribute("data-visible", true)
  } else {
    nav.setAttribute("data-visible", false)
  }
})
