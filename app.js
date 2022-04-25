const navbarDropdownButtons = document.querySelectorAll(
  ".navbar .dropdown-toggle"
);
const offcanvasDropdownBUttons = document.querySelectorAll(
  ".offcanvas .dropdown-toggle"
);
const header = document.querySelector("header");
const hamburgerBtn = document.querySelector(".hamburger-menu");
const closeOffcanvasBtn = document.getElementById("closeOffcanvasBtn");
const offcanvasBakcdrop = document.querySelector(".offcanvas-backdrop");

function handleClickDropdown(event) {
  event.preventDefault();
  const currentDropdownId = this.id;
  const previousDropdownMenu = document.querySelector(
    ".navbar .dropdown-menu.show"
  );
  const previousDropdownId = previousDropdownMenu
    ?.closest(".dropdown")
    .querySelector(".dropdown-toggle").id;

  // sembunyikan dropdown menu yang tampil sebelumnya
  if (
    previousDropdownMenu !== null &&
    previousDropdownId !== currentDropdownId
  ) {
    const iconArrow = previousDropdownMenu
      .closest(".dropdown")
      .querySelector(".arrow");
    iconArrow.classList.remove("arrow-up");
    previousDropdownMenu.classList.remove("show");
  }

  //
  const dropdownMenu = document.querySelector(
    `[data-dropdown-id=${currentDropdownId}]`
  );
  const iconArrow = this.querySelector(".arrow");

  iconArrow.classList.toggle("arrow-up");
  dropdownMenu.classList.toggle("show");
}

function handleClickOffcanvasDropdown(event) {
  event.preventDefault();
  const dropdownId = this.id;
  const dropdown = document.querySelector(`[data-dropdown-id=${dropdownId}]`);
  const iconArrow = dropdown.closest(".dropdown").querySelector(".arrow");

  iconArrow.classList.toggle("arrow-up");
  dropdown.classList.toggle("show");

  if (dropdown.classList.contains("show")) {
    dropdown.style.setProperty("--height", `${dropdown.scrollHeight}px`);
  } else {
    dropdown.style.setProperty("--height", 0);
  }
}

// munculkan background si header ketika jumlah scroll Y nya melebihi tinggi header
function toggleHeaderBackground() {
  const { scrollY } = window;
  if (scrollY > 25) {
    header.classList.add("fixed-top");
  } else {
    header.classList.remove("fixed-top");
  }
}

function handleToggleOffcanvas() {
  const offcanvasId = this.dataset.offcanvasTarget;
  const offcanvasTarget = document.getElementById(`${offcanvasId}`);
  const offcanvasBackdrop = document.querySelector(".offcanvas-backdrop");

  offcanvasTarget.style.visibility = "visible";
  offcanvasTarget.classList.toggle("show");
  offcanvasBackdrop.classList.toggle("show");
  document.body.style.overflow = "hidden";

  offcanvasTarget.addEventListener("transitionend", () => {
    if (!offcanvasTarget.classList.contains("show")) {
      offcanvasTarget.style.visibility = "hidden";
      document.body.style.overflow = "visible";
    }
  });
}

navbarDropdownButtons.forEach((dropdownBtn) =>
  dropdownBtn.addEventListener("click", handleClickDropdown)
);

offcanvasDropdownBUttons.forEach((dropdownBtn) =>
  dropdownBtn.addEventListener("click", handleClickOffcanvasDropdown)
);

// ketika kliknya di luar bagian dropdown menu
document.addEventListener("click", (event) => {
  const previousDropdownMenu = document.querySelector(".dropdown-menu.show");

  if (previousDropdownMenu === null) return;
  if (event.target.closest(".dropdown-toggle")) return;
  if (!previousDropdownMenu.contains(event.target)) {
    const iconArrow = previousDropdownMenu
      .closest(".dropdown")
      .querySelector(".arrow");

    iconArrow.classList.remove("arrow-up");
    previousDropdownMenu.classList.remove("show");
  }
});

window.addEventListener("scroll", () => {
  toggleHeaderBackground();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    document.querySelector(".offcanvas").classList.remove("show");
    offcanvasBakcdrop.classList.remove("show");
  }
});

hamburgerBtn.addEventListener("click", handleToggleOffcanvas);
closeOffcanvasBtn.addEventListener("click", handleToggleOffcanvas);
offcanvasBakcdrop.addEventListener("click", () => {
  offcanvasBakcdrop.classList.remove("show");
  document.querySelector(".offcanvas").classList.remove("show");
});
