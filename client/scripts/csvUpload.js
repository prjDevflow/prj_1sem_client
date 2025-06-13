const serverURL = "https://devflow-1sem.up.railway.app/csv/"

function handleCSVUpload(tipo, event) {
  const status = document.getElementById(`upload-status-${tipo.toLowerCase()}`);
  const badge = document.getElementById(`badge-${tipo.toLowerCase()}`);
  if (!status || !badge) return;

  const input = event.target;
  const file = input.files[0];

  status.classList.remove("success", "error");
  status.classList.add("visible");

  if (!file) {
    status.innerHTML = `<i class="fas fa-times-circle"></i> Nenhum arquivo selecionado.`;
    status.classList.add("error");
    badge.classList.remove("success");
    badge.classList.add("initial");
    badge.innerHTML = `<i class="fas fa-times-circle" style="color: red; font-size: 1rem;"></i>`;
    return;
  }

  // Feedback visual inicial
  status.innerHTML = `<i class="fas fa-spinner spinner"></i> Enviando arquivo...`;
  badge.classList.remove("success");
  badge.classList.add("initial");
  badge.innerHTML = `<i class="fas fa-spinner spinner" style="color: white; font-size: 0.8rem;"></i>`;

  // Prepara FormData
  const formData = new FormData();
  formData.append('file', file);

  // Faz o upload para a API
  fetch(`${serverURL}${tipo}`, {
    method: 'POST',
    body: formData
  })
    .then(async (res) => {
      const resposta = await res.json();

      if (!res.ok) {
        throw new Error(resposta.message || `Erro ${res.status}`);
      }

      // Sucesso visual
      status.innerHTML = ` ${resposta.message || "Arquivo enviado com sucesso."}`;
      status.classList.remove("error");
      status.classList.add("success");

      input.disabled = true;
      input.parentElement.classList.add("disabled");

      const card = input.closest(".upload-card");
      if (card) {
        card.classList.add("completed"); 
      }

      badge.classList.remove("initial");
      badge.classList.add("success");
      badge.innerHTML = `<i class="fas fa-check-circle" style="color: green; font-size: 1rem;"></i>`;
    })
    .catch((erro) => {
      console.error("Erro no upload:", erro);

      status.innerHTML = ` ${erro.message}`;
      status.classList.remove("success");
      status.classList.add("error");

      badge.classList.remove("success");
      badge.classList.add("initial");
      badge.innerHTML = `<i class="fas fa-times-circle" style="color: red; font-size: 1rem;"></i>`;
    });
}
