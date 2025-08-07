
document.getElementById("diagnosticoForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;
  const respostas = [
    form.q1.value,
    form.q2.value,
    form.q3.value,
    form.q4.value,
    form.q5.value,
  ];
  const nome = form.nome.value;
  const telefone = form.telefone.value;

  const totalSim = respostas.filter((r) => r === "Sim").length;
  let mensagem = "";

  if (totalSim >= 4) {
    mensagem = "Parabéns! Sua empresa apresenta uma cultura organizacional bem estruturada.";
  } else if (totalSim >= 2) {
    mensagem = "Sua empresa possui aspectos positivos, mas ainda há pontos de melhoria.";
  } else {
    mensagem = "Atenção! É necessário desenvolver melhor a cultura organizacional da sua empresa.";
  }

  document.getElementById("mensagemResultado").innerText = mensagem;
  document.getElementById("resultado").style.display = "block";

  // Enviar para Google Apps Script
  fetch("https://script.google.com/macros/s/AKfycby7ajM5xkmuwzWIHfpk1MPEtNPIPyOzNM9WUxLxDnwRz1r_DQy7IddcPNap8O3iNoVn/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome,
      telefone,
      respostas,
      resultado: mensagem
    }),
  });
});
