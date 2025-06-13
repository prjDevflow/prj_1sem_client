const serverURL = "https://devflow-1sem.up.railway.app/"

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const toggleSenha = document.getElementById("toggleSenha");
  const senhaInput = document.getElementById("senha");

  // Mostrar/ocultar senha
  toggleSenha.addEventListener("click", () => {
    senhaInput.type = senhaInput.type === "password" ? "text" : "password";
    toggleSenha.classList.toggle("fa-eye-slash");
  });

  // Submete formulário para o backend
  async function login(e) {
    e.preventDefault(); // Impede envio padrão

    const email = document.getElementById("usuario").value.trim();
    const senha = senhaInput.value.trim();

    if (!email || !senha) {
      console.log("Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch(`${serverURL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      // if (!response.ok) {
      //   console.log("Erro:", data.erro);

      // } else {
      //   console.log("Sucesso:", data.mensagem);
      //   // Aqui você pode redirecionar ou armazenar token futuramente
      // }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
});
