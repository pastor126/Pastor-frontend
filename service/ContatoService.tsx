import  {GeralService}  from "./GeralService";



export class ContatoService extends GeralService{

    constructor(){
        super("/falecomigo");
    }

}