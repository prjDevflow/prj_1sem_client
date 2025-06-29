// Função para buscar disciplinas
window.buscarDisciplinas = async function () {
  try {
    const response = await fetch(
      `https://devflow-1sem.up.railway.app/secretary/busca-disciplinas`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Erro ao buscar disciplinas:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Erro na requisição de disciplinas:", error);
    return [];
  }
};

// Função para buscar professores
window.buscarProfessores = async function () {
  try {
    const response = await fetch(
      `https://devflow-1sem.up.railway.app/secretary/busca-professores`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Erro ao buscar professores:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Erro na requisição de professores:", error);
    return [];
  }
};

// Função para buscar salas
window.buscarSalas = async function () {
  try {
    const response = await fetch(
      `https://devflow-1sem.up.railway.app/secretary/busca-salas`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Erro ao buscar salas:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Erro na requisição de salas:", error);
    return [];
  }
};

// Função para buscar horários
window.buscarHorarios = async function () {
  try {
    const response = await fetch(
      `https://devflow-1sem.up.railway.app/secretary/busca-horarios`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Erro ao buscar horários:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Erro na requisição de horários:", error);
    return [];
  }
};

// Função para buscar turmas
window.buscarTurmas = async function () {
  try {
    const response = await fetch(
      `https://devflow-1sem.up.railway.app/secretary/busca-turmas`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Erro ao buscar turmas:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Erro na requisição de turmas:", error);
    return [];
  }
};
