import { Tarea } from "./tarea.class";


export class ListaTareas {

    constructor ( ) {

        //Llamamos al método que carga la lista de tareas del Local Storage
        this.cargarLocalStorage();
    }

    //Método que inserta una nueva tarea la lista de tareas
    nuevaTarea( tarea ){

        this.listaTareas.push( tarea );
        //Actualizamos el array en el localStorage
        this.guardarLocalStorage();

    }

    //Método que elimina una tarea de la lista de tareas 
    eliminarTarea( id ) {

        this.listaTareas = this.listaTareas.filter( tarea => tarea.id != id);
        //Actualizamos el array en el localStorage
        this.guardarLocalStorage();
    }

    //Método que cambia el estado de la propiedad "Completado" de la tarea
    marcarCompletada( id ) {

        for( const tarea of this.listaTareas) {

            
            if( tarea.id == id ) {

                tarea.completado = !tarea.completado;
                //Actualizamos el array en el localStorage
                this.guardarLocalStorage();
                break;
            }
        }
    }

    //Método que elimina las tareas completadas de la lista de tareas.
    eliminarCompletadas( ) {
        
        //Nos quedamos con las tareas donde la propiedad completado es false
        this.listaTareas = this.listaTareas.filter( tarea => !this.completado);
        //Actualizamos el array en el localStorage
        this.guardarLocalStorage();
    }

    //Método que guarda las tareas en el Local Storage
    guardarLocalStorage() {

        localStorage.setItem('tareas', JSON.stringify(this.listaTareas));
    }

    //Método que carga las tareas del Local Storage
    cargarLocalStorage() {
        
        this.listaTareas = (localStorage.getItem('tareas')) ? JSON.parse( localStorage.getItem('tareas')) : [];

        //Para cada tarea llamamos al método fromJson para recuperar el tipo de cada tarea(al guardar en el localStorage se
        //ha guardadao como un objeto) a tipo clase Tarea
        this.listaTareas = this.listaTareas.map( obj => Tarea.fromJson( obj ));
       
    }
}