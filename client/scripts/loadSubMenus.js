// Dados dos submenus do dropdown "Mapa Interativo"
const mapaItens = [
  { label: "Térreo", url: "pages/mapGround.html" },
  { label: "1º Andar", url: "pages/mapOne.html" },
  { label: "2º Andar", url: "pages/mapTwo.html" },
];

window.addEventListener("DOMContentLoaded", () => {
  const submenuContainer = document.getElementById("mapaSubmenu");

  mapaItens.forEach((item) => {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = item.label;
    link.onclick = (event) => {
      event.preventDefault();
      loadContentPages(event, item.url); // Usa a função correta do outro script
    };
    submenuContainer.appendChild(link);
  });
});


  function toggleMenu() {
    const dropdown = document.getElementById("hamburgerDropdown");
    dropdown.style.display =
      dropdown.style.display === "flex" ? "none" : "flex";
  }

  // Fecha o menu ao clicar fora
  window.addEventListener("click", function (event) {
    const dropdown = document.getElementById("hamburgerDropdown");
    const button = document.querySelector(".hamburger-btn");

    if (!button.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.style.display = "none";
    }
  });
// Abre ou fecha o menu hamburguer
function toggleMenu() {
  const dropdown = document.getElementById("hamburgerDropdown");
  dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
}

// Abre ou fecha os submenus ao clicar
function toggleSubmenu(id) {
  const submenu = document.getElementById(id);
  submenu.style.display = submenu.style.display === "flex" ? "none" : "flex";
}

// Fecha o menu quando clicar fora dele
window.addEventListener("click", function (event) {
  const dropdown = document.getElementById("hamburgerDropdown");
  const button = document.querySelector(".hamburger-btn");

  if (!button.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.style.display = "none";
  }
});

// Fecha o menu dropdown ao clicar em uma opção
function closeDropdown() {
  const dropdown = document.getElementById("hamburgerDropdown");
  dropdown.style.display = "none"; // Fecha o menu
}

// Adiciona o fechamento do dropdown ao clicar nas opções do menu
document.querySelectorAll(".hamburger-dropdown a").forEach((item) => {
  item.addEventListener("click", closeDropdown);
});

// Adiciona o fechamento do submenu ao clicar nas opções do submenu
document.querySelectorAll(".submenu-items a").forEach((item) => {
  item.addEventListener("click", closeDropdown);
});
