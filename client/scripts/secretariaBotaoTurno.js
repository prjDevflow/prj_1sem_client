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
    console.log(dados)

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
        painel.style.display = painel.style.display === "none" ? "block" : "none";
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
      btnEditar.setAttribute("onclick", `openDialog('dialogAula', 'idTitleAula', '${aula.nomedisciplina}')`);
      btnEditar.innerHTML = `<i class="fa-solid fa-pen"></i>`;

      const btnExcluir = document.createElement("button");
      btnExcluir.setAttribute("onclick", "pedirConfirmarExclusao(this)");
      btnExcluir.innerHTML = `<i class="fa-solid fa-trash"></i>`;

      divBotoes.appendChild(btnEditar);
      divBotoes.appendChild(btnExcluir);

      divTitle.appendChild(h2);
      divTitle.appendChild(divBotoes);

      // Horário
      const pHorario = document.createElement("p");
      pHorario.textContent = `${aula.horainicial.slice(0, 5)} - ${aula.horafinal.slice(0, 5)}`;

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
  divAddCard.setAttribute("onclick", "abrirDialogNovaAula()");
  divAddCard.innerHTML = `<i class="fa-solid fa-plus"></i>`;

  sectionMaterias.appendChild(divAddCard);

// Adiciona a nova seção ao painel (abaixo dos botões de dias)
painel.insertBefore(sectionMaterias, botoesDias.nextSibling);

}

// Função para carregar dados do banco de dados para o formulário
async function carregarDadosFormulario() {
  console.log("carregarDadosFormulario: Iniciando carregamento de dados...");
  try {
    // Carregar dados usando as funções específicas
    const dadosDisciplinas = await buscarDisciplinas();
    console.log("carregarDadosFormulario: Disciplinas carregadas.", dadosDisciplinas);
    const dadosProfessores = await buscarProfessores();
    console.log("carregarDadosFormulario: Professores carregados.", dadosProfessores);
    const dadosSalas = await buscarSalas();
    console.log("carregarDadosFormulario: Salas carregadas.", dadosSalas);
    const dadosHorarios = await buscarHorarios();
    console.log("carregarDadosFormulario: Horários carregados.", dadosHorarios);
    const dadosTurmas = await buscarTurmas();
    console.log("carregarDadosFormulario: Turmas carregadas.", dadosTurmas);

    // Preencher selects
    preencherSelect('selectDisciplina', dadosDisciplinas, 'nome', 'nome');
    preencherSelect('selectProfessor', dadosProfessores, 'nome', 'nome');
    preencherSelect('selectSala', dadosSalas, 'numero', 'numero');
    preencherSelect('selectHorario', dadosHorarios, 'horainicial', 'horainicial', (item) => `${item.horainicial.slice(0, 5)} - ${item.horafinal.slice(0, 5)}`);
    preencherSelect('selectTurma', dadosTurmas, 'nome', 'nome');
    console.log("carregarDadosFormulario: Selects preenchidos.");

  } catch (error) {
    console.error("Erro ao carregar dados do formulário:", error);
  }
}

// Função auxiliar para preencher selects
function preencherSelect(selectId, dados, valueField, textField, formatFunction = null) {
  console.log(`preencherSelect: Preenchendo ${selectId} com ${dados.length} itens.`);
  const select = document.getElementById(selectId);
  if (!select) {
    console.error(`preencherSelect: Elemento com ID ${selectId} não encontrado.`);
    return;
  }
  
  // Limpar opções existentes (exceto a primeira)
  while (select.children.length > 1) {
    select.removeChild(select.lastChild);
  }
  
  // Adicionar novas opções
  dados.forEach(item => {
    const option = document.createElement('option');
    option.value = item[valueField];
    option.textContent = formatFunction ? formatFunction(item) : item[textField];
    select.appendChild(option);
  });
  console.log(`preencherSelect: ${selectId} preenchido.`);
}

// Função para abrir o dialog e carregar dados
async function abrirDialogNovaAula() {
  console.log("abrirDialogNovaAula: Chamado.");
  await carregarDadosFormulario();
  openDialog('dialogAula', 'idTitleAula', 'Nova Aula');
  console.log("abrirDialogNovaAula: Dialog aberto.");
}

// Função para submeter o formulário de nova aula
async function submeterNovaAula(event) {
  event.preventDefault();
  console.log("submeterNovaAula: Formulário submetido.");
  
  const form = document.getElementById('formNovaAula');
  const formData = new FormData(form);
  
  const dadosAula = {
    Disciplina_idDisciplina: formData.get('disciplina'),
    Professor_idProfessor: formData.get('professor'),
    Sala_Numero: formData.get('sala'),
    Horario_idHorario: formData.get('horario'),
    Turma_idTurma: formData.get('turma'),
    Semana_idSemana: formData.get('dia')
  };

  try {
    console.log("submeterNovaAula: Enviando dados para a API...", dadosAula);
    const response = await fetch("http://localhost:3333/secretary/cria-aula", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosAula)
    });

    if (response.ok) {
      const resultado = await response.json();
      console.log("submeterNovaAula: Aula criada com sucesso!", resultado);
      alert("Aula criada com sucesso!");
      closeDialog('dialogAula');
      form.reset();
      // Recarregar a página ou atualizar a lista de aulas
      location.reload();
    } else {
      const erro = await response.json();
      console.error("submeterNovaAula: Erro ao criar aula:", erro);
      alert("Erro ao criar aula: " + erro.message);
    }
  } catch (error) {
    console.error("submeterNovaAula: Erro ao submeter nova aula:", error);
    alert("Erro ao criar aula. Verifique a conexão.");
  }
}

// Adicionar event listener ao formulário quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOMContentLoaded: Evento disparado.");
  const form = document.getElementById('formNovaAula');
  if (form) {
    form.addEventListener('submit', submeterNovaAula);
    console.log("DOMContentLoaded: Event listener para formNovaAula adicionado.");
  }
});


