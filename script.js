
document.getElementById("diagnosticoForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const form = e.target;
    const respostas = [...form.querySelectorAll("select")].map(s => s.value);
    const totalSim = respostas.filter(r => r === "sim").length;
    let resultadoTexto = "";

    if (totalSim >= 6) {
        resultadoTexto = "<h2>Parabéns! Cultura de Gestão com <strong>Alta Maturidade</strong></h2><p>Sua empresa tem uma base sólida de cultura e práticas de pessoas — continue fortalecendo!</p>";
    } else if (totalSim >= 3) {
        resultadoTexto = "<h2>Cultura de Gestão com <strong>Média Maturidade</strong></h2><p>Você está no caminho, mas existem pontos que podem estar impedindo um crescimento sustentável.</p>";
    } else {
        resultadoTexto = "<h2>Cultura de Gestão com <strong>Baixa Maturidade</strong></h2><p>É hora de estruturar sua cultura e gestão de pessoas para garantir o sucesso da empresa.</p>";
    }

    document.getElementById("resultado").style.display = "block";
    document.getElementById("resultado").innerHTML = `
        ${resultadoTexto}
        <p style='margin-top: 1rem;'><a href='https://api.whatsapp.com/send?phone=5519998162919' target='_blank' style='text-decoration:none;color:white;background:#25D366;padding:10px 15px;border-radius:6px;'>Fale com um especialista no WhatsApp</a></p>
    `;

    // Enviar para Google Sheets
    fetch("https://script.google.com/macros/s/AKfycby7ajM5xkmuwzWIHfpk1MPEtNPIPyOzNM9WUxLxDnwRz1r_DQy7IddcPNap8O3iNoVn/exec", {
        method: "POST",
        body: new FormData(form)
    });
    form.reset();
});
