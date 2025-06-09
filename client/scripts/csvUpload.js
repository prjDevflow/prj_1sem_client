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

  status.innerHTML = `<i class="fas fa-spinner spinner"></i> Carregando arquivo...`;

  badge.classList.remove("success");
  badge.classList.add("initial");
  badge.innerHTML = `<i class="fas fa-spinner spinner" style="color: white; font-size: 0.8rem;"></i>`;

  const reader = new FileReader();
  reader.onload = function (e) {
    const contents = e.target.result;

    setTimeout(() => {
      console.log(`Conteúdo do CSV (${tipo}):`, contents);
      status.innerHTML = `</i> Arquivo carregado!`;
      status.classList.remove("error");
      status.classList.add("success");

      // Atualiza o badge
      badge.classList.remove("initial");
      badge.classList.add("success");
      badge.innerHTML = `<i class="fas fa-check-circle" style="color: green; font-size: 1rem;"></i>`;
    }, 3000);
  };

  reader.onerror = function () {
    status.innerHTML = `<i class="fas fa-times-circle"></i> Erro ao ler o arquivo.`;
    status.classList.remove("success");
    status.classList.add("error");

    badge.classList.remove("success");
    badge.classList.add("initial");
    badge.innerHTML = `<i class="fas fa-times-circle" style="color: red; font-size: 1rem;"></i>`;
  };

  reader.readAsText(file);
}
