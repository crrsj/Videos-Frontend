const API_URL = "http://localhost:8080/videos"; // Substitua pela URL da sua API

// Seletores
const videoForm = document.getElementById("video-form");
const videoGallery = document.getElementById("video-gallery");

// Função para cadastrar vídeo na API
async function postVideo(videoData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videoData),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar o vídeo.");
    }

    const result = await response.json();
    alert("Vídeo cadastrado com sucesso!");
    fetchAndDisplayVideos(); // Atualizar a galeria após o cadastro
  } catch (error) {
    console.error("Erro ao cadastrar vídeo:", error);
    alert("Ocorreu um erro ao cadastrar o vídeo. Tente novamente.");
  }
}

// Função para buscar e exibir vídeos
async function fetchAndDisplayVideos() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Erro ao buscar vídeos.");
    }

    const videos = await response.json();

    // Limpar a galeria antes de exibir os vídeos
    videoGallery.innerHTML = "";

    // Adicionar cada vídeo como um card
    videos.forEach((video) => {
      createVideoCard(video.url, video.title, video.description);
    });
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
    alert("Ocorreu um erro ao carregar os vídeos.");
  }
}

// Função para criar um novo card
function createVideoCard(url, title, description) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <iframe src="${url}" allowfullscreen></iframe>
    <div class="card-content">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  `;

  videoGallery.appendChild(card);
}

// Evento de submissão do formulário
videoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obter os valores dos campos
  const videoUrl = document.getElementById("video-url").value.trim();
  const videoTitle = document.getElementById("video-title").value.trim();
  const videoDescription = document.getElementById("video-description").value.trim();

  // Criar o objeto com os dados do vídeo
  const videoData = {
    url: videoUrl,
    title: videoTitle,
    description: videoDescription,
  };

  // Enviar os dados para a API
  postVideo(videoData);

  // Limpar os campos do formulário
  videoForm.reset();
});

// Carregar os vídeos ao iniciar a página
fetchAndDisplayVideos();