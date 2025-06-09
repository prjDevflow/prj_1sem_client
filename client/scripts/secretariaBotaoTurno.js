async function buscaTurno(curso) {
  try {
    const res = await fetch("http://localhost:3333/secretary/busca-turno", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ curso }),
    });

    if (!res.ok) {
      console.log("Erro na resposta da API");
      return;
    }

    const dados = await res.json();
    botaoTurno(dados);

  } catch (error) {
    console.log("Erro no catch:", error);
  }
}

async function botaoTurno(turnos) {
  const container = document.querySelector(".turnos-container");
  container.innerHTML = ""; // Limpa antes de inserir novos

  if (!Array.isArray(turnos) || turnos.length === 0) {
    container.innerHTML = "<p>Nenhum turno encontrado.</p>";
    return;
  }

  // Cria botões para cada turno
  turnos.forEach((item) => {
    const botao = document.createElement("button");
    botao.className = "outline";
    botao.textContent = item.turno;

    // Você pode adicionar onclick para carregar turmas:
    botao.addEventListener("click", () => {
      carregarTurma(item.curso, item.turno);
    });

    container.appendChild(botao);
  });
}

async function carregarTurma(curso, turno) {
  try {
    const res = await fetch("http://localhost:3333/secretary/busca-turma", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ curso, turno }),
    });

    if (!res.ok) {
      console.log("Erro na resposta da API");
      return;
    }

    const dados = await res.json();
    //botaoTurma(dados);

  } catch (error) {
    console.log("Erro no catch:", error);
  }
}

