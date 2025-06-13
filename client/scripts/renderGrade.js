  async function buscaTurma(turno, turma) {
    try {
      const res = await fetch("http://localhost:3333/agenda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ turma, turno }),
      });

      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status}`);
      }

      const dadosAPI = await res.json();
      console.log(dadosAPI);
      const gradeSection = document.getElementById("grade");
      const mensagemErro = document.getElementById("mensagemErro");

      if (dadosAPI.length === 0) {
        gradeSection.classList.add("hidden");
        mensagemErro.classList.remove("hidden");
        return;
      }

      mensagemErro.classList.add("hidden");
      gradeSection.classList.remove("hidden");

      document.querySelector(".title h1").textContent = turma;
      document.querySelector(".title p").textContent = `Turno: ${turno}`;

      const dadosFormatados = dadosAPI.map((aula) => ({
        diaSemana: aula.diasemana.replace("-feira", ""),
        horario: aula.horario,
        disciplina: aula.disciplina,
        professor: aula.professor,
      }));

      RenderTabela(dadosFormatados);

    } catch (erro) {
      mensagemTexto.textContent = "Erro ao buscar dados do servidor. Tente novamente.";
      mensagemErro.classList.remove("hidden");
      document.getElementById("grade").classList.add("hidden");

      console.log(erro)
    }
  }

  function formatarHora(horario) {
    return horario.slice(0, 5);
  }
  
  async function RenderTabela(dados) {
    const thead = document.getElementById("theadTabela");
    const tbody = document.getElementById("tbodyDisciplinas");
  
    tbody.innerHTML = "";
    thead.innerHTML = "<th>Dia / Horário</th>";
  
    const horariosUnicosRaw = [...new Set(dados.map((aula) => aula.horario))];
    const horariosUnicos = horariosUnicosRaw.map(formatarHora).sort();
  
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
          (item) => item.diaSemana === dia && formatarHora(item.horario) === horario
        );
  
        const td = document.createElement("td");
  
        if (aula) {
          td.innerHTML = `<strong>${aula.disciplina}</strong><br><small>${aula.professor}</small>`;
        } else {
          td.textContent = "-";
        }
  
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
  
    const formatarTurno = (texto) =>
      texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  
    Object.entries(dados).forEach(([turno, turmas]) => {
      const subMenu = document.createElement("div");
      subMenu.classList.add("sub-menu-curso");
  
      const turnoFormatado = formatarTurno(turno);
  
      const btnTurno = document.createElement("button");
      btnTurno.classList.add("btn-periodo");
      btnTurno.setAttribute("data-periodo", turno);
      btnTurno.textContent = turnoFormatado;
  
      const subSubMenu = document.createElement("div");
      subSubMenu.id = `drop_${turno.toLowerCase()}`;
      subSubMenu.classList.add("sub-sub-menu-curso"); // começa oculta
  
      turmas.forEach((turma) => {
        const btnTurma = document.createElement("button");
        btnTurma.classList.add("button-periodo");
        btnTurma.textContent = turma;
        btnTurma.onclick = () => buscaTurma(turnoFormatado, turma);
        subSubMenu.appendChild(btnTurma);
      });
  
      subMenu.appendChild(btnTurno);
      subMenu.appendChild(subSubMenu);
      menu.appendChild(subMenu);
  
      // Evento para abrir/fechar submenu
      btnTurno.addEventListener("click", () => {
        if (subSubMenu.classList.contains("active")) {
          subSubMenu.classList.remove("active");
        } else {
          // opcional: fechar outros submenus
          document.querySelectorAll(".sub-sub-menu-curso.active").forEach((el) =>
            el.classList.remove("active")
          );
          subSubMenu.classList.add("active");
        }
      });
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
