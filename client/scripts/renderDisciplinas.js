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
      horario: `${aula.horainicial.slice(0, 5)} - ${aula.horafinal.slice(0, 5 )}`, // "18:45 - 19:35"
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
  document.querySelector("#grade").classList.remove("hidden");
  const thead = document.getElementById("theadTabela");
  const tbody = document.getElementById("tbodyDisciplinas");

  tbody.innerHTML = "";
  thead.innerHTML = `<th>Dia / Horário</th>`;

  const horariosUnicos = [...new Set(dados.map((aula) => aula.horario))].sort();

  horariosUnicos.forEach((hora) => {
    const th = document.createElement("th");
    th.textContent = hora;
    thead.appendChild(th);
  });

  const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

  const professoresSet = new Set();

  diasSemana.forEach((dia) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="dias">${dia}</td>`;

    horariosUnicos.forEach((horario) => {
      const aula = dados.find(
        (item) => item.diaSemana === dia && item.horario === horario
      );

      const td = document.createElement("td");
      if (aula) {
        td.textContent = aula.disciplina;
        if (aula.professor) {
          professoresSet.add(`${aula.disciplina} - ${aula.professor}`);
        }
      } else {
        td.textContent = "-";
      }
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  renderProfessores(Array.from(professoresSet));
}

function renderProfessores(professores) {
  const container = document.querySelector(".professores");
  container.innerHTML = "<h3>Professores</h3>"; // Limpa e adiciona o título

  professores.forEach((info) => {
    const div = document.createElement("div");
    div.textContent = info;
    container.appendChild(div);
  });
}

async function Filtro(curso){
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
    console.log(dadosAPI)

    carregarTurnos(dadosAPI);
  } catch (error) {
    console.log(error)
  }
}

function carregarTurnos(dados) {
  const menu = document.getElementById("menuCursos");
  menu.innerHTML = "";

  Object.keys(dados).forEach((turno) => {
    const subMenu = document.createElement("div");
    subMenu.classList.add("sub-menu-curso");

    const btnTurno = document.createElement("button");
    btnTurno.classList.add("btn-periodo");
    btnTurno.setAttribute("data-periodo", turno);
    btnTurno.textContent = turno.toUpperCase();
    btnTurno.onclick = () => carregarTurmas(turno, subMenu, dados); // <- passa os dados

    subMenu.appendChild(btnTurno);
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
