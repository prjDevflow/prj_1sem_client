
function togglePeriodoDropdown(periodo) {
  const dropdown = document.getElementById(`drop_${periodo}`);
  const isCurrentlyVisible = dropdown && dropdown.style.display === 'block';
  const cardSection = document.querySelector('.card-grade');

  // Esconde todos os dropdowns
  const allDropdowns = document.querySelectorAll('.sub-sub-menu-curso');
  allDropdowns.forEach(d => d.style.display = 'none');

  // Remove a classe de expansão do período de todas as seções
  if (cardSection) {
    cardSection.classList.remove('card-grade-period-expanded');
  }

  // Se não estava visível, mostramos e expandimos a seção
  if (!isCurrentlyVisible && dropdown) {
    dropdown.style.display = 'block';
    if (cardSection) {
      cardSection.classList.add('card-grade-period-expanded');
    }
  }
}

function initCursoFilter() {
  // Adiciona o evento ao botão "FILTRO"
  const btnMenu = document.querySelector('.btn-menu');
  if (btnMenu) {
    btnMenu.addEventListener('click', function() {
      const menuCurso = document.querySelector('.menu-curso');
      // Find the parent card-grade section
      const cardSection = this.closest('.card-grade');
      
      if (menuCurso) {
        const isMenuVisible = menuCurso.style.display === 'block';

        // Alterna visibilidade do menu
        menuCurso.style.display = isMenuVisible ? 'none' : 'block';
        
        // Toggle the expanded class on the card-grade section
        if (cardSection) {
          if (isMenuVisible) {
            cardSection.classList.remove('card-grade-expanded');
            cardSection.classList.remove('card-grade-period-expanded');
          } else {
            cardSection.classList.add('card-grade-expanded');
          }
        }

        // Sempre que o menu for aberto, esconda todos os dropdowns de período
        if (!isMenuVisible) {
          const allDropdowns = document.querySelectorAll('.sub-sub-menu-curso');
          allDropdowns.forEach(d => d.style.display = 'none');
        }
      }
    });
  }

  // Adiciona eventos para os botões de "Diurno" e "Noturno"
  const periodoButtons = document.querySelectorAll('.btn-periodo');
  periodoButtons.forEach(button => {
    button.addEventListener('click', function() {
      const periodo = button.getAttribute('data-periodo');
      togglePeriodoDropdown(periodo);
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.dropdown-curso')) {
        const menuCurso = document.querySelector('.menu-curso');
        const cardSection = document.querySelector('.card-grade');
        
        if (menuCurso && menuCurso.style.display === 'block') {
          menuCurso.style.display = 'none';
          if (cardSection) {
            cardSection.classList.remove('card-grade-expanded');
            cardSection.classList.remove('card-grade-period-expanded');
          }
        }
        
        const allDropdowns = document.querySelectorAll('.sub-sub-menu-curso');
        allDropdowns.forEach(d => d.style.display = 'none');
      }
    });
  });
}

// Inicializa os filtros quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initCursoFilter);