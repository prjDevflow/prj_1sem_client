// Função única para mostrar dropdown (versão atualizada)
function mostrarDropdown(input) {
  // Fecha todos os outros dropdowns primeiro
  document.querySelectorAll('.dropdown-opcoes').forEach(dropdown => {
    if (dropdown !== input.nextElementSibling) {
      dropdown.style.display = 'none';
    }
  });
  
  // Mostra o dropdown correspondente
  const dropdown = input.nextElementSibling;
  dropdown.style.display = 'block';
  
  // Mostra todas as opções
  const options = dropdown.querySelectorAll('div');
  options.forEach(option => {
    option.style.display = 'block';
  });

  // Ajusta a posição do dialog
  ajustarDialog();
}

function filtrarDropdown(input) {
  const filter = input.value.toUpperCase();
  const dropdown = input.nextElementSibling;
  const options = dropdown.querySelectorAll('div');

  options.forEach(option => {
    const txtValue = option.textContent || option.innerText;
    option.style.display = txtValue.toUpperCase().includes(filter) ? 'block' : 'none';
  });
}

function selecionarOpcao(elemento) {
  const input = elemento.closest('.custom-select').querySelector('.select-input');
  input.value = elemento.textContent;
  elemento.closest('.dropdown-opcoes').style.display = 'none';
}

function ajustarDialog() {
  const dialog = document.getElementById('dialogAula');
  if (!dialog) return; // Segurança caso o dialog não exista
  
  const dropdownsAbertos = dialog.querySelectorAll('.dropdown-opcoes[style="display: block;"], .dropdown-opcoes[style="display: block; display: block;"]');
  
  if (dropdownsAbertos.length > 0) {
    // Calcula a altura necessária
    const ultimoDropdown = dropdownsAbertos[dropdownsAbertos.length - 1];
    const alturaNecessaria = ultimoDropdown.getBoundingClientRect().bottom + 20;
    
    // Aplica a altura com um mínimo garantido
    dialog.style.minHeight = 'auto';
    dialog.style.maxHeight = '90vh';
    
    // Se precisar de mais espaço, ajusta
    if (alturaNecessaria > window.innerHeight * 0.9) {
      dialog.style.maxHeight = `${window.innerHeight - 40}px`;
      dialog.style.overflowY = 'auto';
    }
  }
}

// Fechar dropdowns ao clicar fora
document.addEventListener('click', function(event) {
  if (!event.target.closest('.custom-select')) {
    document.querySelectorAll('.dropdown-opcoes').forEach(dropdown => {
      dropdown.style.display = 'none';
    });
  }
});

// Adiciona evento de resize para ajustar quando a janela muda de tamanho
window.addEventListener('resize', ajustarDialog);