const serverURL = "";

function loadContentPages(event, urlPage) {
  if (event) {
    event.preventDefault();
  }

  localStorage.setItem("lastPage", urlPage);

  fetch(urlPage)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load content");
      }
      return response.text();
    })
    .then((content) => {
      const main = document.getElementById("mainContent");
      main.innerHTML = content;

      const header = document.querySelector("header");
      const footer = document.querySelector("footer");

      const hideLayout = ["login.html", "secretary.html"];

      if (hideLayout.some((page) => urlPage.includes(page))) {
        header.style.display = "none";
        footer.style.display = "none";
      } else {
        header.style.display = "";
        footer.style.display = "";
      }

      // Carrega os scripts necessários
      const scriptsToLoad = [
        "scripts/secretariaBotaoTurno.js",
        "scripts/secretariaBuscaDados.js",
        "scripts/dialog.js",
        "scripts/accordion.js",
        "scripts/btnFiltro.js",
        "scripts/renderAulaSala.js",
        "scripts/renderGrade.js",
        "scripts/loadSubMenus.js",
        "scripts/csvUpload.js",
        "scripts/secretariaAulas.js",
        "scripts/dropdown-busca.js",
      ];

      loadScriptsSequentially(scriptsToLoad, () => {
        // Reanexar o listener do formulário se estiver na página da secretaria
        if (urlPage.includes("secretary.html")) {
          const form = document.getElementById("formNovaAula");
          if (form) {
            form.addEventListener("submit", submeterNovaAula);
            console.log("Listener reconectado ao formNovaAula.");
          } else {
            console.warn("formNovaAula não encontrado após carregar a página.");
          }
        }

        // Inicializa filtros se for uma das páginas de curso
        if (
          urlPage.includes("dsm.html") ||
          urlPage.includes("rh.html") ||
          urlPage.includes("geo.html")
        ) {
          initCursoFilter();
        }
      });

      // Carrega os estilos CSS necessários
      const cssToLoad = [
        "styles/curso.css",
        "styles/maps.css",
        "styles/btnMaps.css",
        "styles/horarios.css",
        "styles/secretary.css",
      ];

      cssToLoad.forEach((href) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      });
    })
    .catch((error) =>
      console.log("Erro ao carregar o conteúdo da página", error)
    );
}

function loadScriptsSequentially(scripts, callback, index = 0) {
  if (index >= scripts.length) {
    if (callback) callback();
    return;
  }
  const script = document.createElement("script");
  script.src = scripts[index];
  script.onload = () => loadScriptsSequentially(scripts, callback, index + 1);
  document.body.appendChild(script);
}

window.onload = function () {
  const lastPage = localStorage.getItem("lastPage") || "pages/main.html";
  loadContentPages(null, lastPage);
};

function initLoginPage() {
  const form = document.getElementById("loginForm");
  const toggleSenha = document.getElementById("toggleSenha");
  const senhaInput = document.getElementById("senha");
  const erroGeral = document.getElementById("erroGeral");

  if (!form) return; // previne erro se o form não existir ainda

  toggleSenha.addEventListener("click", () => {
    senhaInput.type = senhaInput.type === "password" ? "text" : "password";
    toggleSenha.classList.toggle("fa-eye-slash");
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();
    erroGeral.textContent = "";

    try {
      const response = await fetch(
        `https://devflow-1sem.up.railway.app/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuario, senha }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        erroGeral.textContent = data.erro || "Erro ao fazer login.";
        return;
      }

      // Sucesso no login
      console.log(data.mensagem);
      loadContentPages(null, "pages/secretary.html");
    } catch (error) {
      console.error(error);
      erroGeral.textContent = "Erro na conexão com o servidor.";
    }
  });
}
