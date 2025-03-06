import { throws } from "assert"
import { Advogados } from "./Advogado"
export class Consultas{
    private cpf : string
    private id_advogado: Advogados
    private dataAgendada : Date
    private horario : Date 

    constructor(cpf : string, id_advogado: Advogados,dataAgendada:Date, horario:Date){
         this.cpf = cpf
         this.dataAgendada = dataAgendada
         this.horario = horario
         this.id_advogado = id_advogado
    }
}