function convertirMes() {
    let numero = parseInt(document.getElementById("numeroMes").value);
    let resultado = document.getElementById("resultado");
    
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    if (numero >= 1 && numero <= 12) {
        resultado.textContent = `El mes correspondiente al número ${numero} es: ${meses[numero - 1]}`;
    } else {
        resultado.textContent = "Número inválido. Debe ser entre 1 y 12";
    }
}
