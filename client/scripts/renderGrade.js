async function buscaTurma(turno, turma) {
  try {
    const res = await fetch("http://localhost:3333/agenda", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ turno, turma }),
    });

    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status}`);
    }

    const dadosAPI = await res.json();
    console.log("Resposta da API:", dadosAPI);
    const gradeSection = document.getElementById("grade");
    const mensagemErro = document.getElementById("mensagemErro");
    const mensagemTexto = document.getElementById("mensagemTexto");

    if (dadosAPI.length === 0) {
      gradeSection.classList.add("hidden");
      mensagemTexto.textContent = "Nenhuma aula encontrada.";
      mensagemErro.classList.remove("hidden");
      return;
    }

    mensagemErro.classList.add("hidden"); // oculta erro se houver dados
    gradeSection.classList.remove("hidden"); // mostra a grade normalmente

    // Atualiza o título da página com a turma e turno
    document.querySelector(".title h1").textContent = turma;
    document.querySelector(".title p").textContent = `Turno: ${turno}`;

    // Mapeia os dados da API para o formato desejado
    const dadosFormatados = dadosAPI.map((aula) => ({
      diaSemana: aula.diasemana.replace("-feira", ""), // "Segunda-feira" -> "Segunda"
      horario: aula.horario, // já vem no formato correto
      disciplina: aula.disciplina,
      professor: aula.professor,
    }));

    RenderTabela(dadosFormatados);

    // console.log("busca turma chamada");
  } catch (erro) {
    mensagemTexto.textContent = "Erro ao buscar dados do servidor. Tente novamente.";
mensagemErro.classList.remove("hidden");
document.getElementById("grade").classList.add("hidden");

  }
}

async function RenderTabela(dados) {
  console.log("oi")
  const thead = document.getElementById("theadTabela");
  const tbody = document.getElementById("tbodyDisciplinas");
  tbody.innerHTML = "";
  thead.innerHTML = "<th>Dia / Horário</th>";

  const horariosUnicos = [...new Set(dados.map((aula) => aula.horario))].sort();

  horariosUnicos.forEach((hora) => {
    const th = document.createElement("th");
    th.textContent = hora;
    thead.appendChild(th);
  });

  const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

  diasSemana.forEach((dia) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="dias">${dia}</td>`;

    horariosUnicos.forEach((horario) => {
      const aula = dados.find(
        (item) => item.diaSemana === dia && item.horario === horario
      );

      const td = document.createElement("td");
      td.textContent = aula ? aula.disciplina : "-";
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
    
  });
  
}


async function Filtro(curso) {
  try {
    const res = await fetch("http://localhost:3333/busca-turma", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ curso }),
    });

    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status}`);
    }

    const dadosAPI = await res.json();
    console.log(dadosAPI);

    carregarTurnos(dadosAPI);
  } catch (error) {
    console.log(error);
  }
}

// Torna a função global
// window.Filtro = Filtro;

function carregarTurnos(dados) {
  const menu = document.getElementById("menuCursos");
  menu.innerHTML = "";

  // Iterar sobre os turnos
  Object.entries(dados).forEach(([turno, turmas]) => {
    const subMenu = document.createElement("div");
    subMenu.classList.add("sub-menu-curso");

    // Botão do turno (ex: NOTURNO, VESPERTINO)
    const btnTurno = document.createElement("button");
    btnTurno.classList.add("btn-periodo");
    btnTurno.setAttribute("data-periodo", turno);
    btnTurno.textContent = turno.toUpperCase();

    // Submenu das turmas
    const subSubMenu = document.createElement("div");
    subSubMenu.id = `drop_${turno.toLowerCase()}`;
    subSubMenu.classList.add("sub-sub-menu-curso");

    turmas.forEach((turma) => {
      const btnTurma = document.createElement("button");
      btnTurma.classList.add("button-periodo");
      btnTurma.textContent = turma;

      // Chamada da função com turno e turma
      btnTurma.onclick = () => buscaTurma(turno, turma);

      subSubMenu.appendChild(btnTurma);
    });

    subMenu.appendChild(btnTurno);
    subMenu.appendChild(subSubMenu);
    menu.appendChild(subMenu);
  });
}


function carregarTurmas(turno, subMenuContainer, dados) {
  let subSubMenu = subMenuContainer.querySelector(".sub-sub-menu-curso");

  if (subSubMenu) {
    subSubMenu.remove();
    return;
  }

  subSubMenu = document.createElement("div");
  subSubMenu.classList.add("sub-sub-menu-curso");

  dados[turno].forEach((turma) => {
    const btnTurma = document.createElement("button");
    btnTurma.classList.add("button-periodo");
    btnTurma.textContent = turma;
    btnTurma.onclick = () => buscaTurma(turno, turma);
    subSubMenu.appendChild(btnTurma);
  });

  subMenuContainer.appendChild(subSubMenu);
}
