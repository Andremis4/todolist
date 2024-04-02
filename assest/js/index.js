var listaDeTareas = document.querySelector("#listado");
var tareasInput = document.querySelector("#entered-list");
var btnAgregar = document.getElementById("add-list");
var tareascompletadas = 0;

let total = 0;
let tareas = [];
let ids = [];

function crearid() {
  const numerorandom = Math.floor(Math.random() * 100);
  return numerorandom;
}

function creartarea(tarea) {
  let objetotarea = new Object();
  objetotarea.id = crearid();
  objetotarea.tarea = tarea;
  objetotarea.completado = false;
  return objetotarea;
}

function obtenerDatos() {
  const valorInput = document.querySelector("#entered-list").value;
  return valorInput;
}

function borrardatos(dato) {
  const indice = tareas.filter((objeto, i) => {
    if (objeto.tarea == dato) {
      return i;
    }
  });
  tareas.splice(indice, 1);
}

function completaroeliminar(accion, e) {
  const elementitos = document.querySelectorAll("li");
  /*  const elementoclickao = e.target.parentNode.parentNode.childNodes[0].data; */
  const elementoclickao =
    e.target.parentNode.parentNode.childNodes[0].textContent;
  console.log(elementoclickao);

  for (let bananas = 0; bananas < elementitos.length; bananas++) {
    const recorrido = elementitos[bananas].textContent;

    if (recorrido == elementoclickao) {
      elementitos[bananas].parentNode.removeChild(elementitos[bananas]);

      if (accion == 0) {
        const indicetareaaceptada = tareas.forEach((tarea, i) => {
          if (tarea.tarea == elementoclickao) {
            return i;
          }
        });
        /*  tareas[indicetareaaceptada].completado = true */
        console.log(indicetareaaceptada);
        tareascompletadas = tareascompletadas + 1;
        document.getElementById("cantidad").innerHTML = tareascompletadas;
        total = tareas.length + 1;
      } else {
        borrardatos(elementoclickao);
        total = tareas.length - 1 == -1 ? 0 : tareas.length - 1;
        document.getElementById("total").innerHTML = total;
      }
    }
  }
}

function crearelemento(textoelemento) {
  const tarea = creartarea(textoelemento);

  tareas.push(tarea);

  total = tareas.length;
  const elementodelalista = document.createElement("li");
  const parrafoid = document.createElement("div");
  const aidi = document.createTextNode(tarea.id);
  parrafoid.appendChild(aidi);

  elementodelalista.classList.add("elementito");
  const textoAInsertar = document.createTextNode(tarea.tarea);

  let botoneliminar = document.createElement("button");
  /* botoneliminar.innerHTML = "<i class='fa-solid fa-xmark'></i>";
   */
  botoneliminar.innerHTML = "❌";
  let botonaceptar = document.createElement("button");
  /*  botonaceptar.innerHTML = "<i class='fa-solid fa-check'></i>"; */
  botonaceptar.innerHTML = "✔";

  elementodelalista.appendChild(parrafoid);
  elementodelalista.appendChild(textoAInsertar);
  elementodelalista.appendChild(botonaceptar);
  elementodelalista.appendChild(botoneliminar);

  document.getElementById("listado").appendChild(elementodelalista);

  botonaceptar.addEventListener("click", (e) => {
    completaroeliminar(0, e);
  });
  botoneliminar.addEventListener("click", (e) => {
    completaroeliminar(1, e);
  });
}

btnAgregar.addEventListener("click", () => {
  const datos = obtenerDatos();
  const id = crearid();

  crearelemento(datos, id);

  document.querySelector("#total").innerHTML = total;

  tareasInput.value = "";

  /*   console.log(tareas);
  console.log(ids);
  console.log(total);
  console.log(borrardatos("pasear a summer")); */

  /* const nuevaTarea = tareasInput.value
lista.push(nuevaTarea)
tareasInput.value = ""  */
});
