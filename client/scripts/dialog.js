// Mapeamento de dias abreviados para nomes por extenso
// const nomesDiasPorExtenso = {
//   Seg: "Segunda-feira",
//   Ter: "Terça-feira",
//   Qua: "Quarta-feira",
//   Qui: "Quinta-feira",
//   Sex: "Sexta-feira",
//   Sáb: "Sábado",
//   Dom: "Domingo",
// };

let diaSelecionado = ""; // Guarda o dia da semana selecionado

// Função para abrir o modal e colocar o título com o dia
function openDialog(idDialog, idTitle, title) {
  const dialog = document.getElementById(idDialog);
  dialog.showModal();

  // Define título principal
  const titleElement = document.getElementById(idTitle);
  if (titleElement) titleElement.innerHTML = title;

  // Mostra o dia por extenso abaixo do título
  const diaElement = document.getElementById("diaSemanaSelecionado");
  if (diaElement) {
    diaElement.textContent = diaSelecionado ? `(${diaSelecionado})` : "";
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

// --- EXCLUSÃO DINÂMICA ---
let elementoParaExcluir = null;
let idAulaParaExcluir = null;

function pedirConfirmarExclusao(botao, idAula) {
  elementoParaExcluir = botao.closest(".materia");
  idAulaParaExcluir = idAula;

  const dialog = document.getElementById("dialogConfirmarExclusao");
  dialog.showModal();
}

function fecharDialogConfirmacao() {
  const dialog = document.getElementById("dialogConfirmarExclusao");
  dialog.close();
}

async function confirmarExclusao() {
  if (!elementoParaExcluir || !idAulaParaExcluir) return;

  try {
    // Remove visualmente
    elementoParaExcluir.remove();

    // Envia exclusão ao backend (ID na URL)
    const res = await fetch(
      `https://devflow-1sem.up.railway.app/secretary/remove-aula/${idAulaParaExcluir}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      console.error("Erro ao excluir aula no servidor.");
    }
  } catch (error) {
    console.error("Erro ao excluir aula:", error);
  } finally {
    elementoParaExcluir = null;
    idAulaParaExcluir = null;
    fecharDialogConfirmacao();
  }
}
