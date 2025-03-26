function calcularPrecioFinal() {
    let precio = parseFloat(document.getElementById("precio").value);
    let descuento = parseFloat(document.getElementById("descuento").value);
    let resultado = document.getElementById("resultado");

    if (isNaN(precio) || isNaN(descuento) || precio < 0 || descuento < 0 || descuento > 100) {
        resultado.textContent = "Por favor, introduce valores válidos.";
        return;
    }

    let precioFinal = calcularDescuento(precio, descuento);
    resultado.textContent = `El precio final del producto después de aplicar un descuento del ${descuento}% es: ${precioFinal.toFixed(2)} euros.`;
}

function calcularDescuento(precio, descuento) {
    return precio - (precio * (descuento / 100));
}