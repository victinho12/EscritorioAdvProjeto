//IMPORTANDO DADOS
import { Advogados } from "../Entity/Advogado";
import { ConsultasRepository } from "../Repository/ConsultaRepository";
import { Consultas } from "../Entity/Consultas";

//CLASSE CONSULTAS SERVICE
export class ConsultasService {
    private repo: ConsultasRepository

    //CONSTRUTOR DA CLASSE
    constructor() {
        this.repo = new ConsultasRepository()
    }

    //METODO QUE LISTA TODAS AS CONSULTAS
    public async listarTodasConsultas(): Promise<Consultas[]> {
        return await this.repo.listarConsultas();
    }

    // METODO INSERE CONSULTAS
    public async inserirConsulta(cpf_clientes: string, id_advogado: Advogados, dataAgendada: Date, horario: Date) {
        return await this.repo.inserirConsulta(cpf_clientes, id_advogado, dataAgendada, horario)
    }

    // METODO QUE BUSCA AS CONSULTAS DOS ADVOGADOS PARA RELATÓRIO
    public async buscar_consultas__Adv(id_advogado: number): Promise<Consultas[]> {
        return await this.repo.buscar_consulta_para_Advogado(id_advogado)
    }

    // METODO QUE BUSCA AS CONSULTAS DOS ADVOGADOS PARA RELATÓRIO
    public async buscar_consultas_Cliente(cpf: number): Promise<Consultas[]> {
        return await this.repo.buscar_consulta_Cliente(cpf)
    }

    // METODO QUE DELETA AS CONSULTAS
    public async deletar_consulta(id: number) {
        return await this.repo.deletar_consulta(id)
    }

    // MEDO QUE MUDA O CPF DO CLIENTE
    public async mudar_cpf_cliente(cpf: string, cpf2: string) {
        await this.repo.mudar_cpf_cliente(cpf, cpf2)
    }

    // METODO QUE MUDA O ID DO ADVOGADO
    public async mudar_advogado(id: number, id_advogados2: number) {
        await this.repo.mudar_advogado(id, id_advogados2)
    }

    // METODO USADO PARA MUDAR O HORARIO
    public async mudar_horario(id:number, horario:Date){
        await this.repo.mudar_horario(id,horario)
    }
    

}