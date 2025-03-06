import { ConsultasRepository } from "../Repository/ConsultaRepository";
import { Consultas } from "../Entity/Consultas";

export class ConstultaService{
    repo : ConsultasRepository

    constructor(){
        this.repo = new ConsultasRepository()
    }

    async buscarConsulta(){
        
    }
}