const serverURL = "https://devflow-1sem.up.railway.app/"

function handleCSVUpload(type) {
  const input = event.target;
  const file = input.files[0];

  if (file) {
    uploadCsv(type, file);
  }
}

async function uploadCsv(type, file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`${serverURL}csv/${type}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status}`);
    }

    const resApi = await res.json();
    console.log("Resposta da API:", resApi);
  } catch (erro) {
    console.error("Erro no upload:", erro);
  }
}
