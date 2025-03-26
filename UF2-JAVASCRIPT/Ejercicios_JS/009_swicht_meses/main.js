function convertirMes() {
    let numero = parseInt(document.getElementById("numeroMes").value);
    let resultado = document.getElementById("resultado");
    let mes;

    switch (numero) {
        case 1: mes = "Enero"; break;
        case 2: mes = "Febrero"; break;
        case 3: mes = "Marzo"; break;
        case 4: mes = "Abril"; break;
        case 5: mes = "Mayo"; break;
        case 6: mes = "Junio"; break;
        case 7: mes = "Julio"; break;
        case 8: mes = "Agosto"; break;
        case 9: mes = "Septiembre"; break;
        case 10: mes = "Octubre"; break;
        case 11: mes = "Noviembre"; break;
        case 12: mes = "Diciembre"; break;
        default: mes = "Número inválido. Debe ser entre 1 y 12";
    }
    
    resultado.textContent = `El mes correspondiente al número ${numero} es: ${mes}`;
}
