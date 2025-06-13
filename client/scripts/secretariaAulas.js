
const serverURL = "https://devflow-1sem.up.railway.app/secretary/"
async function excluirAula(id) {
    try {
      const response = await fetch(`${serverURL}remove-aula/${id}`, {
        method: "DELETE",
      });
  
      const resultado = await response.json();
  
      if (!response.ok) {
        console.log("Erro ao excluir aula:", resultado);
      } else {
        console.log("Resposta do servidor:", resultado);
      }
  
    } catch (error) {
      console.error("Erro de conexão ao tentar excluir a aula:", error);
      alert("Erro de conexão ao tentar excluir a aula");
    } finally {
      // ✅ Fecha o <dialog> corretamente
      const dialog = document.getElementById("dialogConfirmarExclusao");
      if (dialog && typeof dialog.close === "function") {
        dialog.close();
      }
    }
  }
  