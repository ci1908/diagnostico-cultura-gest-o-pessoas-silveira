
const perguntas = [
  "Sua empresa possui valores organizacionais claros e divulgados para toda a equipe?",
  "Os líderes da sua empresa têm tempo e preparo para desenvolver suas equipes além das demandas operacionais?",
  "Existe uma cultura estruturada de feedbacks constantes e alinhamento entre líderes e liderados?",
  "As decisões sobre pessoas (promoções, desligamentos, reconhecimentos) são baseadas em dados e critérios claros?",
  "Os colaboradores têm clareza sobre o papel que desempenham na estratégia da empresa?",
  "A empresa tem um plano de desenvolvimento individual ou trilhas de carreira para os colaboradores?",
  "Existe uma estratégia ativa para retenção de talentos e manutenção de um bom clima organizacional?"
];

window.onload = () => {
  const perguntasDiv = document.getElementById("perguntas");
  perguntas.forEach((texto, i) => {
    const item = document.createElement("div");
    item.innerHTML = `
      <label>${texto}</label><br/>
      <label><input type="radio" name="pergunta${i}" value="Sim" required /> Sim</label>
      <label><input type="radio" name="pergunta${i}" value="Não" required /> Não</label>
    `;
    perguntasDiv.appendChild(item);
  });
};

document.getElementById("diagnosticoForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const respostas = perguntas.map((_, i) => formData.get(`pergunta${i}`));
  const simCount = respostas.filter(r => r === "Sim").length;
  let resultadoTexto = "";

  if (simCount >= 6) {
    resultadoTexto = "<h2>Parabéns! Cultura de Gestão com <strong>Alta Maturidade</strong></h2><p>Sua empresa tem uma base sólida de cultura e práticas de pessoas — continue fortalecendo!</p>";
  } else if (simCount >= 3) {
    resultadoTexto = "<h2>Cultura de Gestão com <strong>Média Maturidade</strong></h2><p>Você está no caminho, mas existem pontos que podem estar impedindo um crescimento sustentável.</p>";
  } else {
    resultadoTexto = "<h2>Cultura de Gestão com <strong>Baixa Maturidade</strong></h2><p>É hora de estruturar sua cultura e gestão de pessoas para garantir o sucesso da empresa.</p>";
  }

  document.getElementById("resultado").classList.remove("hidden");
  document.getElementById("resultado").innerHTML = `
    ${resultadoTexto}
    <p style='margin-top: 1rem;'><a href='https://api.whatsapp.com/send?phone=5519998162919' target='_blank' style='text-decoration:none;color:white;background:#25D366;padding:10px 15px;border-radius:6px;'>Fale com um especialista no WhatsApp</a></p>
  `;

  await fetch("https://script.google.com/macros/s/AKfycby7ajM5xkmuwzWIHfpk1MPEtNPIPyOzNM9WUxLxDnwRz1r_DQy7IddcPNap8O3iNoVn/exec", {
    method: "POST",
    body: formData
  });
  form.reset();
});
