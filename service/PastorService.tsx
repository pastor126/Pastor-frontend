import  GeralService  from "./GeralService";



export class PastorService extends GeralService{

    constructor(){
        super("/pastores");
    }

}