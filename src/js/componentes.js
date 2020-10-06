import { Tarea } from '../classes/tarea.class';
import { listaTareas } from '../index';
import {} from '../classes/tareas-list.class';

//Referencias en el HTML
const divTareasList          = document.querySelector('.tareas-list');
const txtInput               = document.querySelector('.nueva-tarea');
const checkbox               = document.querySelector('.toggle');
const btnEliminarCompletados = document.querySelector('.clear-completed');
const ulFiltros              = document.querySelector('.filters');
const enlacesFiltros         = document.querySelectorAll('.filtro');

//Función que añade la tarea en el HTML
export const crearTareaHTML = ( tarea ) => {

    //Si la tarea está completada se le añade la clase completed y la propiedad checked al checkbox
    const tareaHtml = `
    <li class="${ (tarea.completado) ? "completed" : '' }" data-id="${ tarea.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (tarea.completado) ? "checked" : ''}>
            <label> ${ tarea.tarea } </label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    //creamos un div donde añadiremos el elemento
    const div = document.createElement('div');
    div.innerHTML = tareaHtml;
    //Al div que muestra la lista de tareas le añadimos sólo el primer hijo, que será la etiqueta <li> completa de la tarea
    //así evitamos meter otro div dentro del div de Lista de tareas
    divTareasList.append( div.firstElementChild);

}

//************** Eventos *******************
//Evento que captura un enter en el input para añadir una nueva tarea
txtInput.addEventListener('keyup', ( event ) => {

    //keyCode = 13 es el Enter
    if( event.keyCode === 13 && txtInput.value.length > 0 ) {

        const nuevaTarea = new Tarea( txtInput.value );
        listaTareas.nuevaTarea (nuevaTarea);
        crearTareaHTML( nuevaTarea );
        txtInput.value = "";
    }
});

//Capturamos cada vez que se hace click en el div que contiene la lista de tareas. Y si el click ha sido en el
//checkbox llamamos al método marcarCompletado() de la clase tareas-list y, añadimos o quitamos la clase "completed"
//que es la que tacha el label de la tarea.
divTareasList.addEventListener('click', ( event ) => {

    
    const nombreElemento = event.target.localName;//Input, label, button
    //Guardamos el div padre del div donde están las tareas, ya que en este elemento tenemos el id de la 
    //tarea
    const divTarea = event.target.parentElement.parentElement;
    //recogemos el id del elemento seleccionado
    const tareaId = divTarea.getAttribute('data-id');
    console.log(divTarea);

    //Si incluye 'input' es porque hemos dado al checkbox que controla si una tarea se marca como completada o se
    //quita
    if( nombreElemento.includes('input')) {
        
        //Cambiamos el estado de la propiedad completado
        listaTareas.marcarCompletada( tareaId );
        //Con el método .toggle() eliminamos o añadimos del <li> la tarea la clase 'completed'
        divTarea.classList.toggle('completed');

    //Si incluye 'button' es que se ha pulsado en boton de eliminar tarea
    }else if( nombreElemento.includes('button')){

        //eliminamos la tarea del array
        listaTareas.eliminarTarea(tareaId);
        //Eliminamos el elemento <li> de la tarea del div de las Tareas
        divTareasList.removeChild(divTarea);
        
    }
  
});

//Capturamos cuando se hace click en el botón Eliminar Completados para eliminar las tareas marcadas como completadas
//de la lista de tareas
btnEliminarCompletados.addEventListener('click', ( ) => {
    
    //Eliminamos las tareas completadas del array
    listaTareas.eliminarCompletadas();

    //recorremos el div de tareas y eliminamos el elemento <li> que contenga la clase 'completed'. 
    for( let i = divTareasList.children.length -1; i >= 0; i-- ) {
      
        const elemento = divTareasList.children[i];
        console.log('elemento',elemento);
        if(elemento.classList.contains('completed')){
            divTareasList.removeChild(elemento);
        }
    }
   
});

//Capturamos los click que se producen dentro de la lista donde están los filtros(pendientes, todos y completados) y con la clase
//'hidden del styles.css ocultamos las que interesen según el filtro seleccionado
ulFiltros.addEventListener('click', (event) => {

    //Guardamos el texto del enlace seleccionado. Si se hace click entre enlace y enlace event.target.text devolverá 'undefined' del
    //elemento ul donde están los distintos filtros
    const filtro = event.target.text;
    
    //Si se hizo click entre dos enlaces salimos
    if(!filtro) { return };

    //quitamos la clase selected a todos los enlaces para después añadirsela al filtro que se haya hecho click
    enlacesFiltros.forEach( elem => elem.classList.remove('selected') );
    //En el event.target hace referencia al enlace que se ha hecho click, por lo que le añadimos la clase 
    //selected. 
    event.target.classList.add('selected');

    //Recorremos cada <li> del div de las tareas, y le añadimos la clase hidden o no según el filtro en el que seleccionado
    for( const elemento of divTareasList.children ) {

        
        //Eliminamos la clase hidden a todos los elementos por si antes se ha seleccionado en otro filtro, por
        elemento.classList.remove('hidden');

        //guardamos si el elemento que está recorriendo está completado
        const completado = elemento.classList.contains('completed');

        
        switch ( filtro ) {
            //Si el filtro es 'Pendientes' y el elemento actual es completado le asignamos la clase hidden
            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add( 'hidden' );
                }
            break;
            //Si el filtro es 'Completados y el elemento actual no está completado lo ocultamos con la clase hidden
            case 'Completados':
                if( !completado ){
                    elemento.classList.add( 'hidden' );
                }
            break;
            //Para el filtro Todos no hace falta ya que si no entra en ningún caso anterior ya hemos eliminado
            //la clase hidden a cada elemento antes de entrar en el switch.
        }

    }
});