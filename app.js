// Seleccionar elementos del DOM
const inputTarea = document.getElementById('ingresar-tarea');
const botonAgregar = document.getElementById('boton-agregar');
const listaTareas = document.getElementById('lista-tareas');

// Obtener tareas del localStorage
function obtenerTareasLocalStorage() {
  const tareas = localStorage.getItem('tareas');
  return tareas ? JSON.parse(tareas) : [];
}

// Guardar tareas en localStorage
function guardarTareasLocalStorage(tareas) {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Renderizar la lista de tareas en el DOM
function mostrarTareas() {
  const tareas = obtenerTareasLocalStorage();
  listaTareas.innerHTML = ''; // Limpiar lista
  tareas.forEach((tarea, index) => {
    const tareaDiv = document.createElement('div');
    tareaDiv.classList.add('tarea');

    const textoP = document.createElement('p');
    textoP.classList.add('texto-tarea');
    textoP.textContent = tarea.texto;
    if (tarea.completada) {
      textoP.style.textDecoration = 'line-through';
    }

    const botonesDiv = document.createElement('div');
    botonesDiv.classList.add('botones-tarea');

    const btnOk = document.createElement('button');
    btnOk.classList.add('btn_ok');
    btnOk.textContent = '✔';
    btnOk.onclick = () => completarTarea(index);

    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('btn_eliminar');
    btnEliminar.textContent = '❌';
    btnEliminar.onclick = () => eliminarTarea(index);

    botonesDiv.appendChild(btnOk);
    botonesDiv.appendChild(btnEliminar);

    tareaDiv.appendChild(textoP);
    tareaDiv.appendChild(botonesDiv);
    listaTareas.appendChild(tareaDiv);
  });
}

// Marcar la Tarea como completada
function completarTarea(index) {
  const tareas = obtenerTareasLocalStorage();
  tareas[index].completada = !tareas[index].completada;
  guardarTareasLocalStorage(tareas);
  mostrarTareas();
}

// Eliminar la Tarea correspondiente
function eliminarTarea(index) {
  const tareas = obtenerTareasLocalStorage();
  tareas.splice(index, 1);
  guardarTareasLocalStorage(tareas);
  mostrarTareas();
}

// Crear una nueva Tarea
function nuevaTarea() {
  const texto = inputTarea.value.trim();
  if (texto === '') return alert('Por favor, escribe una tarea.');

  const tareas = obtenerTareasLocalStorage();
  tareas.push({ texto, completada: false });
  guardarTareasLocalStorage(tareas);
  inputTarea.value = '';
  mostrarTareas();
}

// Escuchar eventos
botonAgregar.addEventListener('click', nuevaTarea);
inputTarea.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    nuevaTarea();
  }
});

// Mostrar tareas al iniciar
mostrarTareas();

