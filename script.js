
const perguntas = [
  "A empresa possui um processo estruturado de recrutamento e seleção?",
  "Há integração e treinamento para novos colaboradores?",
  "Os líderes promovem feedbacks periódicos com suas equipes?",
  "Existe um plano de desenvolvimento individual (PDI) na empresa?",
  "A cultura organizacional é claramente comunicada aos colaboradores?",
  "A empresa realiza avaliações de desempenho?",
  "As decisões da gestão consideram o bem-estar das pessoas?"
];

const form = document.getElementById("diagnosticoForm");
const perguntasDiv = document.getElementById("perguntas");
const resultadoDiv = document.getElementById("resultado");

window.onload = () => {
  perguntas.forEach((pergunta, i) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <label>${pergunta}</label><br/>
      <label><input type="radio" name="pergunta${i}" value="Sim" required /> Sim</label>
      <label><input type="radio" name="pergunta${i}" value="Não" required /> Não</label>
    `;
    perguntasDiv.appendChild(wrapper);
  });
};

form.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const respostas = perguntas.map((_, i) => formData.get(`pergunta${i}`));
  const simCount = respostas.filter(r => r === "Sim").length;
  let classificacao = "";
  let mensagem = "";

  if (simCount >= 6) {
    classificacao = "Alta Maturidade";
    mensagem = "Sua empresa tem uma base sólida de cultura e práticas de pessoas — continue fortalecendo!";
  } else if (simCount >= 3) {
    classificacao = "Média Maturidade";
    mensagem = "Você está no caminho, mas existem pontos que podem estar impedindo um crescimento sustentável.";
  } else {
    classificacao = "Baixa Maturidade";
    mensagem = "Sua empresa ainda tem pontos de atenção importantes relacionados à cultura e pessoas.";
  }

  resultadoDiv.classList.remove("hidden");
  resultadoDiv.innerHTML = `
    <p><strong>Parabéns!</strong> Cultura de Gestão com <strong>${classificacao}</strong><br>${mensagem}</p>
    <p><a href="https://api.whatsapp.com/send?phone=5519998162919" target="_blank">Fale com um especialista no WhatsApp</a></p>
  `;

  await fetch("https://script.google.com/macros/s/AKfycby7ajM5xkmuwzWIHfpk1MPEtNPIPyOzNM9WUxLxDnwRz1r_DQy7IddcPNap8O3iNoVn/exec", {
    method: "POST",
    body: formData
  });
};
