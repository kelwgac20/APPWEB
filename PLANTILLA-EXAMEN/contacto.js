document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const nombre = document.getElementById('nombre').value;
    const fechaNacimiento = new Date(document.getElementById('fecha_nacimiento').value);
    const estudios = document.getElementById('estudios').value;
    const hoy = new Date();
  
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
  
    if (edad < 18) {
      document.getElementById('error').textContent = "Debe ser mayor de edad para continuar.";
      return;
    }
  
    document.getElementById('error').textContent = "";
    document.getElementById('contactForm').style.display = "none";
    document.getElementById('bienvenida').style.display = "block";
  
    const info = `
      <h2>Datos del usuario</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Edad:</strong> ${edad}</p>
      <p><strong>Estudios:</strong> ${estudios}</p>
    `;
    document.getElementById('infoUsuario').innerHTML = info;
  });
  