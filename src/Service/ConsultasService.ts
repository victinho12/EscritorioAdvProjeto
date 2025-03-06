import { Client } from "pg";
import { ConsultasRepository } from "../Repository/ConsultaRepository";
import { Consultas } from "../Entity/Consultas";

export class ConsultasService {
    private repo: ConsultasRepository


    constructor() {
        this.repo = new ConsultasRepository()
    }

     public async listarTodasConsultas():Promise<Consultas[]> {
        return await this.repo.listarConsultas();
     }
}