//IMPORTANDO DADOS
import { Advogados } from "../Entity/Advogado";
import { ConsultasRepository } from "../Repository/ConsultaRepository";
import { ClienteService } from "./ClienteService";
import { Consultas } from "../Entity/Consultas";
import { Cliente } from "../Entity/Clientes";
import { Validacoes } from "../Util/Verificacoes";

//CLASSE CONSULTAS SERVICE
export class ConsultasService {
    private repo_cliente: ClienteService
    private repo: ConsultasRepository

    //CONSTRUTOR DA CLASSE
    constructor() {
        this.repo_cliente = new ClienteService()
        this.repo = new ConsultasRepository()
    }

    //METODO QUE LISTA TODAS AS CONSULTAS
    public async listarTodasConsultas(): Promise<Consultas[]> {
        return await this.repo.listarConsultas();
    }

    // METODO QUE BUSCA TODAS AS CONSULTAS
    public async buscar_consultas(id: number): Promise<Consultas[]> {
        let consulta: Consultas[] = []
        consulta = await this.repo.buscar_consulta(id)
        if (consulta.length === 0) {
            throw new Error("Consulta não encontrado")
        } else {
            return consulta
        }
    }


    // METODO INSERE CONSULTAS
    public async inserirConsulta(cpf_clientes: string, id_advogado: Advogados, dataAgendada: Date, horario: Date) {
        if (!Validacoes.validar_CPF(cpf_clientes)) {
            throw new Error("Cpf invalido")
        }
        return await this.repo.inserirConsulta(cpf_clientes, id_advogado, dataAgendada, horario)
    }

    // METODO QUE BUSCA AS CONSULTAS DOS ADVOGADOS PARA RELATÓRIO
    public async buscar_consultas__Adv(id_advogado: number): Promise<Consultas[]> {
        let consultas: Consultas[] = []

        if (consultas.length === 0) {
            throw new Error("Advogado não encontrado")
        }
        return await this.repo.buscar_consulta_para_Advogado(id_advogado)
    }

    // METODO QUE BUSCA AS CONSULTAS DOS ADVOGADOS PARA RELATÓRIO
    public async buscar_consultas_Cliente(cpf: string): Promise<Consultas[]> {
        let consultas_cliente: Consultas[] = []

        if (consultas_cliente.length === 0) {
            throw new Error("Cliente não encontrado")
        }

        return await this.repo.buscar_consulta_Cliente(cpf)
    }

    // METODO QUE DELETA AS CONSULTAS
    public async deletar_consulta(id: number): Promise<void> {
        let consultas = this.buscar_consultas(id)

        if (!consultas) {
            throw new Error("Consulta não encontrada")
        }
        await this.repo.deletar_consulta(id)
    }

    // MEDO QUE MUDA O CPF DO CLIENTE
    public async mudar_cpf_cliente(cpf: string, cpf2: string) {
        let clientes = this.repo_cliente.buscarClientesPorCpf(cpf)
        if (!clientes) {
            throw new Error("Cliente não encontrado")
        }
        if (!Validacoes.validar_CPF(cpf)) {
            throw new Error("Cpf não existe")
        }
        
        await this.repo.mudar_cpf_cliente(cpf, cpf2)
    }

    // METODO QUE MUDA O ID DO ADVOGADO
    public async mudar_advogado(id: number, id_advogados2: number) {
        let consulta = this.buscar_consultas(id || id_advogados2)
        if (!consulta) {
            throw new Error("Id não encontrado!!")
        }
    
        await this.repo.mudar_advogado(id, id_advogados2)
    }

    // METODO QUE MUDA A DATA
    public async mudar_data(id: number, data_agendada: Date) {
        await this.mudar_data(id, data_agendada)
    }


    // METODO USADO PARA MUDAR O HORARIO
    public async mudar_horario(id: number, horario: Date) {
        await this.repo.mudar_horario(id, horario)
    }

}