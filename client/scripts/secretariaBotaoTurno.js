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
    console.log(dados);
  } catch (error) {
    console.log("Erro no catch:", error);
  }
}

const diasSemana = [
  { nome: "Segunda-feira", abreviado: "Seg" },
  { nome: "Terça-feira", abreviado: "Ter" },
  { nome: "Quarta-feira", abreviado: "Qua" },
  { nome: "Quinta-feira", abreviado: "Qui" },
  { nome: "Sexta-feira", abreviado: "Sex" },
];

// Cria botões de turno
async function botaoTurno(turnos) {
  const container = document.querySelector(".turnos-container");
  container.innerHTML = "";

  if (!Array.isArray(turnos) || turnos.length === 0) {
    container.innerHTML = "<p>Nenhum turno encontrado.</p>";
    return;
  }

  turnos.forEach((item) => {
    const botao = document.createElement("button");
    botao.className = "outline";
    botao.textContent = item.turno;

    botao.addEventListener("click", () => {
      carregarTurmasComBotoesDeDias(item.curso, item.turno);
    });

    container.appendChild(botao);
  });
}

// Carrega todas as turmas e cria botões de dias para cada uma
async function carregarTurmasComBotoesDeDias(curso, turno) {
  const container = document.getElementById("botoes-turmas");
  container.innerHTML = "";

  try {
    // Carregar todas as aulas da semana (para saber quais turmas existem)
    const resultadosPorDia = await Promise.all(
      diasSemana.map(async ({ nome }) => {
        const res = await fetch("http://localhost:3333/secretary/busca-turma", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ curso, turno, dia: nome }),
        });

        if (!res.ok) return [];

        const dados = await res.json();
        return Array.isArray(dados) ? dados : [dados];
      })
    );

    const todasAulas = resultadosPorDia.flat();

    // Agrupar todas as aulas por turma
    const turmasUnicas = {};
    todasAulas.forEach((aula) => {
      const turma = aula.nometurma;
      if (!turmasUnicas[turma]) {
        turmasUnicas[turma] = { curso: aula.nomecurso, turno: aula.turno };
      }
    });

    // Criar UI para cada turma
    Object.entries(turmasUnicas).forEach(([turmaNome]) => {
      // Botão da turma
      const botaoTurma = document.createElement("button");
      botaoTurma.className = "accordion";
      botaoTurma.textContent = turmaNome;

      // Container para botões de dias da semana e aulas
      const painel = document.createElement("div");
      painel.className = "painel";
      painel.style.display = "none";

      const divDias = document.createElement("div");
      divDias.className = "dias-da-semana";

      diasSemana.forEach(({ nome, abreviado }) => {
        const botaoDia = document.createElement("button");
        botaoDia.textContent = abreviado;

        botaoDia.addEventListener("click", async () => {
          const aulas = await buscarAulasPorDia(curso, turno, nome, turmaNome);
          exibirAulasNaTurma(aulas, painel);
        });

        divDias.appendChild(botaoDia);
      });

      painel.appendChild(divDias);

      // Toggle painel ao clicar no botão da turma
      botaoTurma.addEventListener("click", () => {
        painel.style.display =
          painel.style.display === "none" ? "block" : "none";
      });

      container.appendChild(botaoTurma);
      container.appendChild(painel);
    });
  } catch (error) {
    console.error("Erro ao carregar turmas com botões de dias:", error);
  }
}

// Busca as aulas por curso, turno, dia e turma específica
async function buscarAulasPorDia(curso, turno, dia, turmaFiltrada) {
  try {
    const res = await fetch("http://localhost:3333/secretary/busca-turma", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ curso, turno, dia }),
    });

    if (!res.ok) return [];

    const dados = await res.json();
    const aulas = Array.isArray(dados) ? dados : [dados];

    return aulas.filter((aula) => aula.nometurma === turmaFiltrada);
  } catch (error) {
    console.error("Erro ao buscar aulas por dia:", error);
    return [];
  }
}

// Renderiza as aulas no painel com o layout solicitado
function exibirAulasNaTurma(aulas, painel) {
  // Garante que os botões de dias fiquem no topo
  const botoesDias = painel.querySelector(".dias-da-semana");

  // Remove qualquer conteúdo anterior de aulas (mas mantém os botões de dias)
  const antigaSection = painel.querySelector(".materiasTurma");
  if (antigaSection) antigaSection.remove();

  // Cria uma nova seção para exibir as aulas
  const sectionMaterias = document.createElement("section");
  sectionMaterias.className = "materiasTurma";

  if (aulas.length === 0) {
    const aviso = document.createElement("p");
    aviso.textContent = "Nenhuma aula para esse dia.";
    sectionMaterias.appendChild(aviso);
  } else {
    aulas.forEach((aula) => {
      const divMateria = document.createElement("div");
      divMateria.className = "materia";

      // Título e botões de ação
      const divTitle = document.createElement("div");
      divTitle.className = "title";

      const h2 = document.createElement("h2");
      h2.textContent = aula.nomedisciplina;

      const divBotoes = document.createElement("div");
      divBotoes.className = "botoes-acoes";

      const btnEditar = document.createElement("button");
      btnEditar.setAttribute(
        "onclick",
        `openDialog('dialogAula', 'idTitleAula', '${aula.nomedisciplina}')`
      );
      btnEditar.innerHTML = `<i class="fa-solid fa-pen"></i>`;

      const btnExcluir = document.createElement("button");
      btnExcluir.setAttribute(
        "onclick",
        `pedirConfirmarExclusao(this, '${aula.idaula}')`
      );
      btnExcluir.innerHTML = `<i class="fa-solid fa-trash"></i>`;

      divBotoes.appendChild(btnEditar);
      divBotoes.appendChild(btnExcluir);

      divTitle.appendChild(h2);
      divTitle.appendChild(divBotoes);

      // Horário
      const pHorario = document.createElement("p");
      pHorario.textContent = `${aula.horainicial.slice(
        0,
        5
      )} - ${aula.horafinal.slice(0, 5)}`;

      // Professor
      const pProfessor = document.createElement("p");
      pProfessor.textContent = `Professor: ${aula.nomeprofessor}`;

      // Sala
      const pSala = document.createElement("p");
      pSala.textContent = `Sala ${aula.nomesala}`;

      divMateria.appendChild(divTitle);
      divMateria.appendChild(pHorario);
      divMateria.appendChild(pProfessor);
      divMateria.appendChild(pSala);

      sectionMaterias.appendChild(divMateria);
    });
  }

  // Card para adicionar nova aula
  const divAddCard = document.createElement("div");
  divAddCard.className = "materia add-card";
  divAddCard.setAttribute(
    "onclick",
    "openDialog('dialogAula', 'idTitleAula', 'Nova Aula')"
  );
  divAddCard.innerHTML = `<i class="fa-solid fa-plus"></i>`;

  sectionMaterias.appendChild(divAddCard);

  // Adiciona a nova seção ao painel (abaixo dos botões de dias)
  painel.insertBefore(sectionMaterias, botoesDias.nextSibling);
}
