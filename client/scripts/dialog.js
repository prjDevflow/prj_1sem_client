function openDialog(idDialog, idTitle, title) {
  const dialog = document.getElementById(idDialog);
  dialog.showModal();

  const titleElement = document.getElementById(idTitle);
  if (titleElement) titleElement.innerHTML = title;

  dialog.addEventListener(
    "click",
    function (event) {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!isInDialog) {
        dialog.close();
      }
    },
    { once: true }
  );
}

function closeDialog(idDialog) {
  const dialog = document.getElementById(idDialog);
  dialog.close();
}

// EXCLUSÃO 

function pedirConfirmarExclusao(botao) {
  elementoParaExcluir = botao.closest('.materia');
  const dialog = document.getElementById('dialogConfirmarExclusao');
  dialog.showModal(); // Em vez de classList.add('open')
}

function fecharDialogConfirmacao() {
  const dialog = document.getElementById('dialogConfirmarExclusao');
  dialog.close(); // Em vez de classList.remove('open')
}


function confirmarExclusao() {
  if (elementoParaExcluir) {
    elementoParaExcluir.remove(); // Remove a matéria
    elementoParaExcluir = null;
  }

  fecharDialogConfirmacao(); // Fecha o modal depois de excluir
}

// BOTÃO FIXO

const botoes = document.querySelectorAll('.dias-da-semana button');

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    // Se já está ativo, remove e sai
    if (botao.classList.contains('ativo')) {
      botao.classList.remove('ativo');
      return;
    }

    // Remove 'ativo' de todos os outros
    botoes.forEach(b => b.classList.remove('ativo'));

    // Adiciona no clicado
    botao.classList.add('ativo');
  });
});
