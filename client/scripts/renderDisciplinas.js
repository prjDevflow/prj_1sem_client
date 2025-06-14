async function buscaTurma(salaNumero, diaSemana) {
  try {
    const res = await fetch(
      `https://devflow-1sem.up.railway.app/api/buscaSala`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ salaNumero, diaSemana }),
      }
    );

    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status}`);
    }

    const dados = await res.json();

    if (dados.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4">Nenhuma aula encontrada</td></tr>`;
      return;
    }

    RenderTabela(dados);
  } catch (erro) {
    console.error("Erro ao buscar os dados da API:", erro);
  }
}

function RenderTabela(dados) {
  document.querySelector("#grade").classList.remove("hidden");
  const thead = document.getElementById("theadTabela");
  const tbody = document.getElementById("tbodyDisciplinas");

  tbody.innerHTML = "";
  thead.innerHTML = `
    <th>Turma</th>
    <th>Dia</th>
    <th>Horário</th>
    <th>Sala</th>`;

  dados.forEach((item) => {
    const tr = document.createElement("tr");
    const horario = `${item.horainicial} - ${item.horafinal}`;

    tr.innerHTML = `
      <td>${item.turma}</td>
      <td>${item.diasemana}</td>
      <td>${horario}</td>
      <td>${item.numerosala}</td>
    `;

    tbody.appendChild(tr);
  });
}
