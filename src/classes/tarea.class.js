
export class Tarea {

    //Método que recibe una tarea de tipo objeto y la devuelve recuperando su tipo clase Tarea
    static fromJson( {id, tarea, completado, creado} ) {

        const tempTarea = new Tarea( tarea );
        
        tempTarea.id         = id;
        tempTarea.completado = completado;
        tempTarea.creado     = creado;

        return tempTarea;
    }

    constructor ( tarea ) {

        this.tarea      = tarea;
        this.id         = new Date().getTime();
        this.completado = false;
        this.creado     = new Date();
    }
}