let salaSelecionada = "";

function abrirSala(nomeSala) {
  salaSelecionada = nomeSala; // guarda a sala clicada
  openDialog("dialogSala", "idTitleSala", nomeSala); // abre modal e atualiza título
  const select = document.querySelector("select");
  buscaAulaSala(nomeSala, select.value); // busca aula com dia atual do select
}

async function buscaAulaSala(salaNome, diaSemana) {
  try {
    console.log(salaNome);
    console.log(diaSemana);
    const res = await fetch(`https://devflow-1sem.up.railway.app/mapa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ salaNome, diaSemana }),
    });

    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status}`);
    }
    const dados = await res.json();
    console.log(dados);

    RenderTabelaSala(dados);
  } catch (erro) {
    console.error("Erro ao buscar os dados da API:", erro);
  }
}
function RenderTabelaSala(dados) {
  const tbody = document.getElementById("tbodyAulas");
  tbody.innerHTML = "";

  if (dados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">Nenhuma aula encontrada.</td></tr>`;
    return;
  }

  dados.forEach((aula) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td id="turma_sala">${aula.turma}</td>
          <td>${aula.turno}</td>
          <td>${aula.disciplina}</td>
          <td>${aula.horafinal}</td>
        `;
    tbody.appendChild(tr);
  });
}
