//Clase que representa todas las jornadas de trabajo
class ListaJornadas{
    
    //Constructor
    constructor(){
        this.arrayJornadas=[];//Array que almacena las jornadas
    }
    //Metodo que añade una jornada al array de jornadas
    addJornada(jornada){
        this.arrayJornadas.push(jornada);
    }

    //Método que comprueba si existe una jornada
    existeJornada(fechaString){
        let existe=false;
        this.arrayJornadas.forEach(element => {
            if (element.getFechaInicio().toLocaleDateString() ===fechaString){
                existe=true;
            }
        });
        return existe;
    }

}

export default ListaJornadas;