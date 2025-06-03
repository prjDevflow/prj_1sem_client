async function buscaAulaSala(sala, diaSemana) {
  try {
    const res = await fetch('https://6823c8c065ba05803397e110.mockapi.io/api/buscaSala', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sala, dia: diaSemana }),
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

async function RenderTabelaSala(dados) {
  const tbody = document.getElementById("tbodyAulas");
  tbody.innerHTML = ""; // Limpa o conteúdo anterior da tabela

  if (dados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">Nenhuma aula encontrada.</td></tr>`;
    return;
  }

  dados.forEach((aula) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${aula.turma}</td>
          <td>${aula.turno}</td>
          <td>${aula.disciplina}</td>
          <td>${aula.horario}</td>
        `;
    tbody.appendChild(tr);
  });
}
