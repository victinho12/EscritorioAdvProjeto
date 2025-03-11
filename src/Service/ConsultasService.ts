import { Advogados } from "../Entity/Advogado";
import { Client } from "pg";
import { ConsultasRepository } from "../Repository/ConsultaRepository";
import { Consultas } from "../Entity/Consultas";

export class ConsultasService {
    private repo: ConsultasRepository


    constructor() {
        this.repo = new ConsultasRepository()
    }


    public async listarTodasConsultas(): Promise<Consultas[]> {
        return await this.repo.listarConsultas();
    }


    public async inserirConsulta(cpf_clientes : string, id_advogado: Advogados,dataAgendada:Date, horario:Date) {
        return await this.repo.inserirConsulta(cpf_clientes, id_advogado,dataAgendada, horario)
    }


    public async buscar_consultas__Adv(id_advogado:number):Promise<Consultas[]>{
        return await this.repo.buscar_consulta_para_Advogado(id_advogado)
    }


    public async buscar_consultas_Cliente(cpf: number):Promise<Consultas[]>{
        return await this.repo.buscar_consulta_Cliente(cpf)
    }


    public async deletar_consulta(id:number){
        return await this.repo.deletar_consulta(id)
    }




}