async function buscaTurno(curso) {
  document.getElementById("botoes-turmas").innerHTML = "";
  try {
    const res = await fetch(
      `https://devflow-1sem.up.railway.app/secretary/busca-turno`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ curso }),
      }
    );

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
        const res = await fetch(
          `https://devflow-1sem.up.railway.app/secretary/busca-turma`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ curso, turno, dia: nome }),
          }
        );

        if (!res.ok) return console.log(res);

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

    // Ordenar os nomes das turmas numericamente antes de exibir
    const turmasOrdenadas = Object.entries(turmasUnicas).sort(([a], [b]) => {
      const numA = parseInt(a); // extrai número do nome da turma (ex: "1 DSM" -> 1)
      const numB = parseInt(b);
      return numA - numB;
    });

    // Criar UI para cada turma
    turmasOrdenadas.forEach(([turmaNome]) => {
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
          // Verifica se já existe uma seção de aulas aberta para este dia
          const sectionExistente = painel.querySelector(".materiasTurma");

          // Se já existe e o usuário clicou no mesmo dia novamente, REMOVE as aulas
          if (sectionExistente && botaoDia.dataset.lastClicked === "true") {
            sectionExistente.remove();
            botaoDia.dataset.lastClicked = "false";
            return; // Sai da função
          }

          // Se não existe ou é outro dia, BUSCA as aulas
          const aulas = await buscarAulasPorDia(curso, turno, nome, turmaNome);
          exibirAulasNaTurma(aulas, painel);

          // Marca que este botão foi clicado
          botaoDia.dataset.lastClicked = "true";

          // Remove a marcação dos outros botões (opcional)
          painel.querySelectorAll(".dias-da-semana button").forEach((btn) => {
            if (btn !== botaoDia) {
              btn.dataset.lastClicked = "false";
            }
          });
        });

        divDias.appendChild(botaoDia);
      });

      painel.appendChild(divDias);

      // Toggle painel ao clicar no botão da turma
      botaoTurma.addEventListener("click", () => {
        // PASSO 1: Fecha todos os outros painéis
        document.querySelectorAll(".accordion").forEach((outroBotao) => {
          if (outroBotao !== botaoTurma) {
            outroBotao.classList.remove("active"); // Remove a classe 'active'
            outroBotao.nextElementSibling.style.display = "none"; // Fecha o painel
          }
        });

        // PASSO 2: Abre/fecha o painel clicado
        const estaAberto = painel.style.display === "block";
        painel.style.display = estaAberto ? "none" : "block";
        botaoTurma.classList.toggle("active", !estaAberto);
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
    const res = await fetch(
      `https://devflow-1sem.up.railway.app/secretary/busca-turma`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ curso, turno, dia }),
      }
    );

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

      const btnExcluir = document.createElement("button");
      btnExcluir.innerHTML = `<i class="fa-solid fa-trash"></i>`;
      btnExcluir.onclick = (event) =>
        pedirConfirmarExclusao(event.currentTarget, aula.idaula);

      const btnEditar = document.createElement("button");
      btnEditar.innerHTML = `<i class="fa-solid fa-pen"></i>`;
      btnEditar.onclick = () => abrirDialogAtualizarAula(aula);

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

  // Adiciona a nova seção ao painel (abaixo dos botões de dias)
  painel.insertBefore(sectionMaterias, botoesDias.nextSibling);
}

// Função para carregar dados do banco de dados para o formulário
async function carregarDadosFormulario(sufixo = "") {
  try {
    const dadosDisciplinas = await buscarDisciplinas();
    const dadosProfessores = await buscarProfessores();
    const dadosSalas = await buscarSalas();
    const dadosHorarios = await buscarHorarios();
    const dadosTurmas = await buscarTurmas();

    preencherSelect(
      `selectDisciplina${sufixo}`,
      dadosDisciplinas,
      "iddisciplina",
      "nome"
    );
    preencherSelect(
      `selectProfessor${sufixo}`,
      dadosProfessores,
      "idprofessor",
      "nome"
    );
    preencherSelect(`selectSala${sufixo}`, dadosSalas, "numero", "nome");
    preencherSelect(
      `selectHorario${sufixo}`,
      dadosHorarios,
      "idhorario",
      "horainicial",
      (item) =>
        `${item.horainicial.slice(0, 5)} - ${item.horafinal.slice(0, 5)}`
    );
    preencherSelect(`selectTurma${sufixo}`, dadosTurmas, "idturma", "nome");
  } catch (error) {
    console.error("Erro ao carregar dados do formulário:", error);
  }
}

function preencherSelect(
  selectId,
  dados,
  valueField,
  textField,
  formatFunction = null
) {
  const select = document.getElementById(selectId);
  if (!select) {
    console.error(`Elemento com ID ${selectId} não encontrado.`);
    return;
  }

  // Limpar opções existentes (exceto a primeira)
  while (select.children.length > 1) {
    select.removeChild(select.lastChild);
  }

  // Adicionar novas opções
  dados.forEach((item) => {
    const option = document.createElement("option");
    option.value = item[valueField]; // Usar ID quando disponível
    option.textContent = formatFunction
      ? formatFunction(item)
      : item[textField];
    select.appendChild(option);
  });
}

// Função para abrir o dialog e carregar dados
async function abrirDialogNovaAula() {
  openDialog("dialogAula", "idTitleAula", "Nova Aula");
  await carregarDadosFormulario();
}

async function abrirDialogAtualizarAula(aula) {
  // Aguarda os selects serem preenchidos
  await carregarDadosFormulario("Update");

  openDialog("dialogAulaUpdate", "idTitleAulaUpdate", "Atualizar Aula");

  // Busca reversa pelos nomes e define o valor dos selects
  setSelectByText("selectDisciplinaUpdate", aula.nomedisciplina);
  setSelectByText("selectProfessorUpdate", aula.nomeprofessor);
  setSelectByText("selectSalaUpdate", aula.nomesala);
  setSelectByHorario("selectHorarioUpdate", aula.horainicial, aula.horafinal);
  setSelectByText("selectTurmaUpdate", aula.nometurma);
  setSelectByText("selectDiaUpdate", aula.diasemana); // Supondo que o dia esteja escrito como no select

  const title = document.getElementById("idTitleAulaUpdate");
  if (title) title.textContent += ` (${aula.idaula})`;
}

// Função para selecionar option com base no texto visível
function setSelectByText(selectId, texto) {
  const select = document.getElementById(selectId);
  for (const option of select.options) {
    if (option.textContent.trim() === texto.trim()) {
      select.value = option.value;
      break;
    }
  }
}

// Função especial para horário (com dois campos comparando)
function setSelectByHorario(selectId, horainicial, horafinal) {
  const select = document.getElementById(selectId);
  const horarioFormatado = `${horainicial.slice(0, 5)} - ${horafinal.slice(
    0,
    5
  )}`;
  for (const option of select.options) {
    if (option.textContent.trim() === horarioFormatado) {
      select.value = option.value;
      break;
    }
  }
}

async function submeterNovaAula(event) {
  event.preventDefault();

  const form = document.getElementById("formNovaAula");
  const formData = new FormData(form);

  // Obter valores diretamente dos selects
  const dadosAula = {
    Disciplina_idDisciplina: parseInt(
      document.getElementById("selectDisciplina").value
    ),
    Professor_idProfessor: parseInt(
      document.getElementById("selectProfessor").value
    ),
    Sala_Numero: parseInt(document.getElementById("selectSala").value),
    Horario_idHorario: parseInt(document.getElementById("selectHorario").value),
    Turma_idTurma: parseInt(document.getElementById("selectTurma").value),
    Semana_idSemana: parseInt(document.getElementById("selectDia").value),
  };

  // Validar se todos os campos têm valores numéricos válidos
  if (Object.values(dadosAula).some(isNaN)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  try {
    const response = await fetch(
      `https://devflow-1sem.up.railway.app/secretary/cria-aula`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAula),
      }
    );

    if (response.ok) {
      const resultado = await response.json();
exibirMensagem("Aula criada com sucesso!", "sucesso");
form.reset();

// Desativa o botão "Salvar" enquanto reinicia
const botaoSalvar = document.getElementById("btnSalvarAula");
botaoSalvar.disabled = true;
botaoSalvar.textContent = "Salvando...";

setTimeout(() => {
  closeDialog("dialogAula");
  location.reload();
}, 2500);

    } else {
      const erro = await response.text();
      console.error("Erro ao criar aula:", erro);
      exibirMensagem(`Erro ao criar aula: ${erro}`, "erro");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    exibirMensagem("Erro ao conectar com o servidor.", "erro");
  }
}

async function submeterAtualizacaoAula(event) {
  event.preventDefault();

  console.log("Função de atualização foi chamada");

  const form = document.getElementById("formAtualizarAula");

  // Pegue o ID da aula pelo título (ou guarde em um campo oculto no futuro)
  const idTexto = document.getElementById("idTitleAulaUpdate").textContent;
  const match = idTexto.match(/\((\d+)\)/); // extrai o número entre parênteses
  const idAula = match ? parseInt(match[1]) : null;

  if (!idAula) {
    alert("ID da aula não encontrado.");
    return;
  }

  const dadosAtualizados = {
    turma: document.getElementById("selectTurmaUpdate").value,
    disciplina: document.getElementById("selectDisciplinaUpdate").value,
    professor: document.getElementById("selectProfessorUpdate").value,
    sala: document.getElementById("selectSalaUpdate").value,
    diaSemana: document.getElementById("selectDiaUpdate").value,
    horario: document.getElementById("selectHorarioUpdate").value,
  };

  console.log(dadosAtualizados);

  // Validação
  if (Object.values(dadosAtualizados).some(isNaN)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  try {
    const response = await fetch(
      `https://devflow-1sem.up.railway.app/secretary/update-aula/${idAula}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAtualizados),
      }
    );

    if (response.ok) {
      alert("Aula atualizada com sucesso!");
      closeDialog("dialogAulaUpdate");
      form.reset();
      location.reload();
    } else {
      const erro = await response.text();
      console.error("Erro ao atualizar aula:", erro);
      alert(`Erro ao atualizar aula: ${erro}`);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro ao conectar com o servidor.");
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("formAtualizarAula");
//   form.addEventListener("submit", submeterAtualizacaoAula);
// });
function exibirMensagem(texto, tipo = "sucesso") {
  const divMensagem = document.getElementById("mensagemStatus");
  divMensagem.textContent = texto;
  divMensagem.style.color = tipo === "erro" ? "red" : "green";

  setTimeout(() => {
    divMensagem.textContent = "";
  }, 4000); // limpa após 4 segundos
}
