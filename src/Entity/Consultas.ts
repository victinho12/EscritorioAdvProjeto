
import { Advogados } from "./Advogado"
export class Consultas {
    //ATRIBUTOS DA CLASSE 
    private id_consulta: number
    private cpf_clientes: string
    private id_advogado: number
    private dataAgendada: string
    private horario: Date
    //CONSTRUTOR DA CLASSE
    constructor(id_consulta: number, cpf_clientes: string, id_advogado: number, dataAgendada: string, horario: Date) {
        this.id_consulta = id_consulta
        this.cpf_clientes = cpf_clientes
        this.dataAgendada = dataAgendada
        this.horario = horario
        this.id_advogado = id_advogado
    }
}