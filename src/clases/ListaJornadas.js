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

}

export default ListaJornadas;