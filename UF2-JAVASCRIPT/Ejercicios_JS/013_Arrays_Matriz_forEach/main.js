document.addEventListener("DOMContentLoaded", () => {
    let matriz = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    document.write("<h3>Números específicos:</h3>");
    document.write("Número en fila 1, columna 3: " + matriz[0][2] + "<br>");
    document.write("Número en fila 2, columna 2: " + matriz[1][1] + "<br><br>");

    document.write("<h3>Matriz en formato 3x3:</h3>");
    document.write("<table border='1' cellspacing='0' cellpadding='5'>");
    matriz.forEach(fila => {
        document.write("<tr>");
        fila.forEach(num => {
            document.write("<td>" + num + "</td>");
        });
        document.write("</tr>");
    });
    document.write("</table>");

    document.write("<h3>Matriz con múltiplos de 3 reemplazados por 'm':</h3>");
    document.write("<table border='1' cellspacing='0' cellpadding='5'>");
    matriz.forEach(fila => {
        document.write("<tr>");
        fila.forEach(num => {
            if (num % 3 === 0) {
                document.write("<td>m</td>");
            } else {
                document.write("<td>" + num + "</td>");
            }
        });
        document.write("</tr>");
    });
    document.write("</table>");
});
