function showPrepare() {
  hideAllSection();
  showIt("PrepareManager");
  cancleAllBtnActive();
}

function hideAllSection() {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.remove("visible");
    section.classList.add("hidden");
  });
}

function showIt(sectionId) {
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.remove("hidden");
    targetSection.classList.add("visible");
  }
}

function showSection(sectionId) {
  showPrepare();
  activeManagerBtn(sectionId + "Btn");
  setTimeout(function () {
    hideAllSection();
    showIt(sectionId);
  }, 1200);
}

function cancleAllBtnActive() {
  const managerBtns = document.querySelectorAll(".managerBtn");
  managerBtns.forEach((managerBtn) => {
    managerBtn.classList.remove("active");
  });
}
function activeManagerBtn(managerBtnId) {
  cancleAllBtnActive();
  const targetmanagerBtn = document.getElementById(managerBtnId);
  if (targetmanagerBtn) {
    targetmanagerBtn.classList.add("active");
  }
}

function onLoad() {}

// window.onload = function () {

// };

document.addEventListener("DOMContentLoaded", function () {
  let primaryLoaded = 0;
  let shortLinkCounter = 1;
  let links = [];
  let currentLinkId = 1;
  showPrepare();

  window.addEventListener("load", function () {
    if (primaryLoaded == 0) {
      showSection("NewManager");
      primaryLoaded = 1;
    }
    // onLoad();
  });

  setTimeout(function () {
    if (primaryLoaded == 0) {
      showSection("NewManager");
      primaryLoaded = 1;
    }
  }, 10000);
});
