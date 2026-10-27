// Referencias a los elementos del DOM
const contenedorNotas = document.getElementById('contenedor-notas');
const btnAgregar = document.getElementById('btn-agregar');
const btnCalcular = document.getElementById('btn-calcular');
const btnBorrar = document.getElementById('btn-borrar');

const seccionResultado = document.getElementById('seccion-resultado');
const valorPromedio = document.getElementById('valor-promedio');
const mensajeRetroalimentacion = document.getElementById('mensaje-retroalimentacion');
const totalNotasElem = document.getElementById('total-notas');
const sumaTotalElem = document.getElementById('suma-total');

// Función para actualizar los números de las etiquetas (Nota 1, Nota 2, etc.)
function actualizarEtiquetas() {
    const grupos = contenedorNotas.querySelectorAll('.input-group');
    grupos.forEach((grupo, index) => {
        const label = grupo.querySelector('label');
        label.textContent = `Nota ${index + 1}:`;
    });
}

// 1. Agregar una nueva nota dinámicamente
btnAgregar.addEventListener('click', () => {
    const cantidadActual = contenedorNotas.querySelectorAll('.input-group').length + 1;

    const divGrupo = document.createElement('div');
    divGrupo.classList.add('input-group');

    divGrupo.innerHTML = `
        <label>Nota ${cantidadActual}:</label>
        <input type="number" class="nota-input" step="0.1" min="0" max="5" placeholder="ej. 4.0">
        <button class="btn-eliminar">X</button>
    `;

    // Evento para eliminar la nota individual
    divGrupo.querySelector('.btn-eliminar').addEventListener('click', () => {
        divGrupo.remove();
        actualizarEtiquetas();
    });

    contenedorNotas.appendChild(divGrupo);
});

// 2. Calcular Promedio
btnCalcular.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.nota-input');
    let suma = 0;
    let contadorNotasValidas = 0;

    inputs.forEach(input => {
        const valor = parseFloat(input.value);
        if (!isNaN(valor)) {
            suma += valor;
            contadorNotasValidas++;
        }
    });

    if (contadorNotasValidas === 0) {
        alert('Por favor, ingresa al menos una nota válida para realizar el cálculo.');
        return;
    }

    const promedio = suma / contadorNotasValidas;

    // Mostrar los resultados
    valorPromedio.textContent = promedio.toFixed(1);
    sumaTotalElem.textContent = suma.toFixed(1);
    totalNotasElem.textContent = contadorNotasValidas;

    // Mensaje de evaluación según el promedio
    if (promedio >= 4.0) {
        mensajeRetroalimentacion.textContent = "¡Buen Trabajo! Tu promedio es Muy Bueno.";
    } else if (promedio >= 3.0) {
        mensajeRetroalimentacion.textContent = "¡Aprobado! Puedes seguir mejorando.";
    } else {
        mensajeRetroalimentacion.textContent = "Necesitas reforzar. ¡Tú puedes!";
    }

    seccionResultado.style.display = 'block';
});

// 3. Borrar Todo
btnBorrar.addEventListener('click', () => {
    // Restablecer a 3 campos vacíos por defecto
    contenedorNotas.innerHTML = `
        <div class="input-group">
            <label>Nota 1:</label>
            <input type="number" class="nota-input" step="0.1" min="0" max="5" placeholder="ej. 4.5">
        </div>
        <div class="input-group">
            <label>Nota 2:</label>
            <input type="number" class="nota-input" step="0.1" min="0" max="5" placeholder="ej. 3.8">
        </div>
        <div class="input-group">
            <label>Nota 3:</label>
            <input type="number" class="nota-input" step="0.1" min="0" max="5" placeholder="ej. 4.2">
        </div>
    `;

    // Ocultar sección de resultados
    seccionResultado.style.display = 'none';
});