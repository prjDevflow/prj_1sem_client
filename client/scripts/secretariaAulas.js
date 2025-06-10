async function excluirAula(id) {
    try {
      const response = await fetch(`http://localhost:3333/secretary/remove-aula/${id}`, {
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
  