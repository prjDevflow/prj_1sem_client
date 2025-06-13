const serverURL = "https://devflow-1sem.up.railway.app/secretary/"

console.log("secretariaBuscaDados.js carregado.");

// Arquivo para funções de busca de dados do banco para preencher formulários

// Função para buscar disciplinas
window.buscarDisciplinas = async function() {
  try {
    console.log("Buscando disciplinas...");
    const response = await fetch(`${serverURL}busca-disciplinas`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("Disciplinas recebidas:", data);
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
window.buscarProfessores = async function() {
  try {
    console.log("Buscando professores...");
    const response = await fetch(`${serverURL}busca-professores`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("Professores recebidos:", data);
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
window.buscarSalas = async function() {
  try {
    console.log("Buscando salas...");
    const response = await fetch(`${serverURL}busca-salas`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("Salas recebidas:", data);
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
window.buscarHorarios = async function() {
  try {
    console.log("Buscando horários...");
    const response = await fetch(`${serverURL}busca-horarios`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("Horários recebidos:", data);
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
window.buscarTurmas = async function() {
  try {
    console.log("Buscando turmas...");
    const response = await fetch(`${serverURL}busca-turmas`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("Turmas recebidas:", data);
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