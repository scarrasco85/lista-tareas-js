import './styles.css';
import { Tarea, ListaTareas } from './classes';
import { crearTareaHTML } from './js/componentes';


export const listaTareas = new ListaTareas();

//Imprimimos las tareas en el HTML cargada previamente en el constructor de la clase ListaTareas
listaTareas.listaTareas.forEach(tarea => crearTareaHTML(tarea));

