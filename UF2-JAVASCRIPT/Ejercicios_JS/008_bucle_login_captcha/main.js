const primerNum = Math.floor(Math.random() * 10) + 1;
const segundoNum = Math.floor(Math.random() * 10) + 1;
let intentos = 3;

while (intentos > 0) {
    let respuestaUsuario = parseInt(prompt(`¿Cuál es la suma de: ${primerNum} + ${segundoNum}?`));

    if (respuestaUsuario === (primerNum + segundoNum)) {
        document.write("<h1>Bienvenido a mi página</h1>");
        break;
    } else if (isNaN(respuestaUsuario)) {
        alert("Debes escribir un número.");
    } else {
        intentos--;
        if (intentos > 0) {
            alert(`Respuesta incorrecta. Te quedan ${intentos} intento(s).`);
        } else {
            alert("Demasiados intentos incorrectos. Serás redirigido...");
            window.location.href = "https://mossos.gencat.cat/ca/inici"
        }
    }
}
