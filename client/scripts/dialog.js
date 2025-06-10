// Mapeamento de dias abreviados para nomes por extenso
const nomesDiasPorExtenso = {
  "Seg": "Segunda-feira",
  "Ter": "Terça-feira",
  "Qua": "Quarta-feira",
  "Qui": "Quinta-feira",
  "Sex": "Sexta-feira",
  "Sáb": "Sábado",
  "Dom": "Domingo"
};

let diaSelecionado = ''; // Guarda o dia da semana selecionado

// Função para abrir o modal e colocar o título com o dia
function openDialog(idDialog, idTitle, title) {
  const dialog = document.getElementById(idDialog);
  dialog.showModal();

  // Define título principal
  const titleElement = document.getElementById(idTitle);
  if (titleElement) titleElement.innerHTML = title;

  // Mostra o dia por extenso abaixo do título
  const diaElement = document.getElementById('diaSemanaSelecionado');
  if (diaElement) {
    diaElement.textContent = diaSelecionado ? `(${diaSelecionado})` : '';
  }

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

// Fecha o modal
function closeDialog(idDialog) {
  const dialog = document.getElementById(idDialog);
  dialog.close();
}

// --- EXCLUSÃO ---
let elementoParaExcluir = null;

function pedirConfirmarExclusao(botao) {
  elementoParaExcluir = botao.closest('.materia');
  const dialog = document.getElementById('dialogConfirmarExclusao');
  dialog.showModal();
}

function fecharDialogConfirmacao() {
  const dialog = document.getElementById('dialogConfirmarExclusao');
  dialog.close();
}

function confirmarExclusao() {
  if (elementoParaExcluir) {
    elementoParaExcluir.remove();
    elementoParaExcluir = null;
  }

  fecharDialogConfirmacao();
}

// --- SELEÇÃO DOS DIAS DA SEMANA ---
const botoes = document.querySelectorAll('.dias-da-semana button');

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    if (botao.classList.contains('ativo')) {
      botao.classList.remove('ativo');
      diaSelecionado = '';
      return;
    }

    botoes.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    const textoBotao = botao.textContent.trim();
    diaSelecionado = nomesDiasPorExtenso[textoBotao] || textoBotao;
  });
});
