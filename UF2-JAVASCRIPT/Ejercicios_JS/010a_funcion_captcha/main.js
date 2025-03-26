function captcharecursiva() {
    const primerNum = Math.floor(Math.random() * 10) + 1;
    const segundoNum = Math.floor(Math.random() * 10) + 1;
    let intentos = 3;

    while (intentos > 0) {
        let respuestaUsuario = parseInt(prompt(`¿Cuál es la suma de: ${primerNum} + ${segundoNum}?`));

        if (!isNaN(respuestaUsuario)) {
            if (respuestaUsuario === (primerNum + segundoNum)) {
                document.write("<h1>Bienvenido a mi página</h1>");
                return;
            } else {
                intentos--;
                if (intentos > 0) {
                    alert(`Respuesta incorrecta. Te quedan ${intentos} intento(s).`);
                } else {
                    alert("Demasiados intentos incorrectos. Serás redirigido...");
                    window.location.href = "https://mossos.gencat0.cat/ca/inici";
                }
            }
        } else {
            alert("Debes escribir un número válido.");
        }
    }
}


captcharecursiva();