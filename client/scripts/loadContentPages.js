const serverURL = "";

function loadContentPages(event, urlPage) {
  if (event) event.preventDefault();
  localStorage.setItem("lastPage", urlPage);

  fetch(urlPage)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load content");
      return res.text();
    })
    .then((content) => {
      document.getElementById("mainContent").innerHTML = content;
      const header = document.querySelector("header");
      const footer = document.querySelector("footer");
      const hideLayout = ["login.html", "secretary.html"];

      if (hideLayout.some((p) => urlPage.includes(p))) {
        header.style.display = "none";
        footer.style.display = "none";
      } else {
        header.style.display = "";
        footer.style.display = "";
      }

      // Se for login.html, aguarda um pouco e inicializa
      if (urlPage.includes("login.html")) {
        setTimeout(() => {
          initLoginPage();
          console.log("initLoginPage executado.");
        }, 100);
      }

      // Carrega scripts em sequência
      const scripts = [
        "scripts/accordion.js",
        "scripts/baixarpdf.js",
        "scripts/btnFiltro.js",
        "scripts/csvUpload.js",
        "scripts/deleteAula.js",
        "scripts/dialog.js",
        "scripts/dropdown-busca.js",
        "scripts/loadSubMenus.js",
        "scripts/renderAulaSala.js",
        "scripts/renderGrade.js",
        "scripts/secretariaBotaoTurno.js",
        "scripts/secretariaBuscaDados.js",
      ];
      loadScriptsSequentially(scripts, () => {
        if (urlPage.includes("secretary.html")) {
          const formNova = document.getElementById("formNovaAula");
          if (formNova) {
            formNova.addEventListener("submit", submeterNovaAula);
            console.log("Listener reconectado ao formNovaAula.");
          }
        }
        if (["dsm.html","rh.html","geo.html"].some(p => urlPage.includes(p))) {
          initCursoFilter();
        }
      });

      // Carrega CSS
      ["styles/curso.css", "styles/maps.css", "styles/btnMaps.css", "styles/horarios.css", "styles/secretary.css"]
        .forEach((href) => {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = href;
          document.head.appendChild(link);
        });
    })
    .catch((err) => console.log("Erro ao carregar a página", err));
}

function loadScriptsSequentially(scripts, callback, idx = 0) {
  if (idx >= scripts.length) return callback && callback();
  const s = document.createElement("script");
  s.src = scripts[idx];
  s.onload = () => loadScriptsSequentially(scripts, callback, idx + 1);
  document.body.appendChild(s);
}

window.onload = () => {
  const last = localStorage.getItem("lastPage") || "pages/main.html";
  loadContentPages(null, last);
};

function initLoginPage() {
  const form = document.getElementById("loginForm");
  const toggleSenha = document.getElementById("toggleSenha");
  const senhaInput = document.getElementById("senha");
  const erroGeral = document.getElementById("erroGeral");

  if (!form) {
    console.warn("loginForm não encontrado.");
    return;
  }
  if (toggleSenha && senhaInput) {
    toggleSenha.addEventListener("click", () => {
      senhaInput.type = senhaInput.type === "password" ? "text" : "password";
      toggleSenha.classList.toggle("fa-eye-slash");
    });
  } else {
    console.warn("toggleSenha ou senhaInput não encontrados — pulando toggle.");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value.trim();
    const senha = senhaInput.value.trim();
    erroGeral.textContent = "";

    try {
      const res = await fetch(`https://devflow-1sem.up.railway.app/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
      });
      const data = await res.json();
      if (!res.ok) {
        erroGeral.textContent = data.erro || "Erro ao fazer login.";
        return;
      }
      console.log(data.mensagem);
      loadContentPages(null, "pages/secretary.html");
    } catch (err) {
      console.error(err);
      erroGeral.textContent = "Erro na conexão com o servidor.";
    }
  });
}
