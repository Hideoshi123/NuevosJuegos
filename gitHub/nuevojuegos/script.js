function conteo() {
    let juegoss = document.getElementById('juegoss');
    let cantidadJuegos = 0;
    fetch('juegos.json')
        .then(res => res.json())
        .then((salida) => {
            for (let clave in salida) {
                if (salida.hasOwnProperty(clave)) {
                    let lista = salida[clave];
                    cantidadJuegos += lista.length;
                    for (let jueguiño of lista) {
                        if (jueguiño.popular) {
                            let caja = document.createElement('div');
                            let titulo = document.createElement('p');
                            let imagenn = document.createElement('img')
                            caja.classList.add('contenidos');
                            imagenn.classList.add('cara');
                            imagenn.setAttribute('src', `${jueguiño.caratula}`)
                            titulo.textContent = jueguiño.juego;
                            caja.appendChild(titulo);
                            caja.appendChild(imagenn);
                            juegoss.appendChild(caja);
                        }
                    }
                }
            }
            let cantidad = document.getElementById('cantidad');
            cantidad.textContent = cantidadJuegos + ' JUEGOS DISPONIBLES';
        
            let continuar = document.getElementById('continuar');
            let detener = document.getElementById('detener');

            continuar.addEventListener('click', () => {
                let contenidos = document.querySelectorAll(".contenidos"); 
                contenidos.forEach((elemento) => {
                    elemento.style.animationPlayState = "running";
                });
            });
            
            detener.addEventListener('click', () => {
                let contenidos = document.querySelectorAll(".contenidos"); 
                contenidos.forEach((elemento) => {
                    elemento.style.animationPlayState = "paused";
                });
            });
        })
        .catch(error => {
            let texto = document.createElement('h1');
            texto.textContent = 'No se encontraron juego :('
            juegoss.appendChild(texto);
            juegoss.style.justifyContent = 'center';
            juegoss.style.alignContent = 'center';
            juegoss.style.textAlign = 'center'
        });

        fetch('Todojuegos.json')
        .then(response => {
        return response.json();})
        .then(data => {
        const juegos = data.fullJuegos;

        const contenedor = document.getElementById("juegosFil");

        juegos.forEach(juego => {
            const div = document.createElement('div');
            div.classList.add('juego');
            div.innerHTML = `
            <h2>${juego.juego}</h2>
            <img src="${juego.caratula}" alt="${juego.juego}" />
            <button id="hola" disabled onclick="BotonDescar()">Descargar</button>`;

        contenedor.appendChild(div);
    });
});
}
function obtenerEstado() {
    return document.getElementById('estado').textContent;
}

function comprobarEstado() {
    const comprodes = document.querySelectorAll('#hola');
    const estado = obtenerEstado();

    if (estado === 'Conectado') {
        comprodes.forEach(elemento => {
            elemento.removeAttribute('disabled');
        });
    } else {
        comprodes.forEach(elemento => {
            elemento.setAttribute('disabled', 'disabled');
        });
    }
}
comprobarEstado();
setInterval(comprobarEstado, 1000);
let iniciarSesion = document.getElementById('iniciarSesion');
let popUp = document.getElementById('modal_container');
let cerrarInicion = document.getElementById('cerrarInicio');
let cerrar = document.getElementById('cerrar');
let popUp2 = document.getElementById('modal_container2');
let creador = document.getElementById('creador');
    
iniciarSesion.addEventListener('click', ()=>{
    popUp.classList.add('mostrar');
});
cerrarInicio.addEventListener('click', ()=>{
    popUp.classList.remove('mostrar');
});

cerrar.addEventListener('click', ()=>{
    popUp2.classList.remove('mostrar');
})
creador.addEventListener('click', ()=>{
    popUp2.classList.add('mostrar');
})


let cuentas = [];

let inicio = document.getElementById('inicio');
let estado = document.getElementById('estado');

inicio.addEventListener('click', () => {
    let nombreUsuario = document.getElementById('nombreUsuario').value;
    let contraseña = document.getElementById('contraseña').value;
    let encontrada = false;

    for (let cuenta of cuentas) {
        if (nombreUsuario === cuenta.nombre && contraseña === cuenta.contraseña) {
            estado.textContent = 'Conectado';
            estado.style.color = 'green';
            estado.style.textShadow = '0 0 10px green';
            encontrada = true;
            popUp.classList.remove('mostrar');
            break;
        }
    }

    if (!encontrada) {
        alert('Ingrese una cuenta existente');
    }
})

function cuenta(nombre,contraseña) {
    this.nombre = nombre;
    this.contraseña = contraseña;
}

let creara = document.getElementById('crear');

creara.addEventListener('click', ()=>{
        let nombre = document.getElementById("nombreUsuarioNuevo").value;
        let contraseña = document.getElementById("contraseñaNueva").value;
        const existe =  cuentas.some(cuenta => cuenta.nombre === nombre);
        let tamaño = contraseña.length;
        if (existe) {
            alert('Ese nombre de usuario ya existe \n Puebre con otro');        
        } else {
            if (tamaño >= 7) {
                let cuentaa = new cuenta(nombre,contraseña);
                cuentas.push(cuentaa);
                document.getElementById("nombreUsuarioNuevo").value = "";
                document.getElementById("contraseñaNueva").value = "";
                alert('Cuenta creada')
            } else {
                alert('Contraseña muy corta (minimo 7 caracteres)')
            }
        }
})
function Filtroos() {
    fetch('juegos.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const selectCategoria = document.getElementById("categorias");
        const valorCategoria = selectCategoria.value;
        const selectEdad = document.getElementById("edades");
        const valorEdad = selectEdad.value;
  
        const juegosFil = document.getElementById("juegosFil");
        juegosFil.innerHTML = '';
  
        const juegosCategoria = data[valorCategoria];
  
        const juegosEdad = juegosCategoria.filter(juego => juego.clasificacionpg <= valorEdad);
  
        if (juegosEdad.length === 0) {
          const mensajeError = document.createElement('h1');
          mensajeError.textContent = 'No se han encontrado juegos para su edad :(';
          juegosFil.appendChild(mensajeError);
        } else {
          juegosEdad.forEach(juego => {
            const div = document.createElement('div');
            div.classList.add('juego');
            div.innerHTML = `
              <h2>${juego.juego}</h2>
              <img src="${juego.caratula}" alt="${juego.juego}" />
              <button id="hola" disabled onclick="BotonDescar()">Descargar</button>`;
            juegosFil.appendChild(div);
          });
        }
      });
  }
    let buscar = document.getElementById('buscar');
    buscar.addEventListener('click', () => {
      fetch('Todojuegos.json')
        .then(response => {
          return response.json();
        })
        .then(data => {
          const juegos = data.fullJuegos;
  
          const contenedor = document.getElementById("juegosFil");
          contenedor.innerHTML = '';
  
          juegos.forEach(juego => {
            const div = document.createElement('div');
            div.classList.add('juego');
            div.innerHTML = `
            <h2>${juego.juego}</h2>
            <img src="${juego.caratula}" alt="${juego.juego}" />
            <button id="hola" disabled onclick="BotonDescar()">Descargar</button>`;
  
            contenedor.appendChild(div);
          });
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Obtener elementos del DOM
        let barra = document.getElementById('Barra');
        let porcentaje = document.getElementById('Porcentaje');
        let descargarBtn = document.getElementById('Descargar');
        let pausarBtn = document.getElementById('Pausar');
        let cancelarBtn = document.getElementById('Cancelar');
      
        let progreso = 0; // Inicializar el progreso
        let intervalo; // Variable para almacenar el intervalo de progreso
      
        // Función para iniciar la descarga
        descargarBtn.addEventListener('click', function() {
            alert('Descarga en progreso...'); // Mostrar alerta de descarga en progreso
            intervalo = setInterval(function() {
                if (progreso < 100) {
                    progreso += 1;
                    barra.value = progreso;
                    porcentaje.textContent = progreso + '%';
                } else {
                    clearInterval(intervalo); // Detener el intervalo al completar la descarga
                    alert('Descarga completada.'); // Mostrar alerta de descarga completada
                }
            }, 100);
        });
      
        // Función para pausar la descarga
        pausarBtn.addEventListener('click', function() {
            clearInterval(intervalo); // Detener el intervalo (pausar la descarga)
            alert('Descarga pausada.'); // Mostrar alerta de descarga pausada
        });
      
        // Función para cancelar la descarga
        cancelarBtn.addEventListener('click', function() {
            clearInterval(intervalo); // Detener el intervalo
            progreso = 0; // Reiniciar el progreso
            barra.value = progreso; // Actualizar la barra de progreso
            porcentaje.textContent = progreso + '%'; // Actualizar el porcentaje de progreso
            alert('Descarga cancelada.'); // Mostrar alerta de descarga cancelada
        });
      });
      
function BotonDescar(){
    contenidoDescarga.style.display = "block";
}
function BotonCerrar(){
    contenidoDescarga.style.display = "none";
}