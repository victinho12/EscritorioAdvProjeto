
import { Advogados } from "./Lawyers"
export class Consultas{
    private cpf_clientes : string
    private id_advogado: Advogados
    private dataAgendada : Date
    private horario : Date 

    constructor(cpf_clientes : string, id_advogado: Advogados,dataAgendada:Date, horario:Date){
         this.cpf_clientes = cpf_clientes
         this.dataAgendada = dataAgendada
         this.horario = horario
         this.id_advogado = id_advogado
    }
}