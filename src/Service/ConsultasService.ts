//IMPORTANDO DADOS
import { Advogados } from "../Entity/Advogado";
import { ConsultasRepository } from "../Repository/ConsultaRepository";
import { ClienteRepository } from "../Repository/ClienteRepository";
import { Consultas } from "../Entity/Consultas";
import { AdvogadoService } from "./AdvogadoService";
import { Validacoes } from "../Util/Verificacoes";


//CLASSE CONSULTAS SERVICE
export class ConsultasService {
    private servi_cliente: ClienteRepository
    private servi_adv: AdvogadoService
    private repo: ConsultasRepository


    //CONSTRUTOR DA CLASSE
    constructor() {
        this.servi_cliente = new ClienteRepository()
        this.servi_adv = new AdvogadoService()
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
            throw new Error("Consulta não encontrada")
        }
        return consulta;
    }



    // METODO INSERE CONSULTAS
    public async inserirConsulta(cpf_clientes: string, id_advogado: number, dataAgendada: string, horario: Date) {
        let lista2 = await this.servi_cliente.BuscarCLientePorCpf(cpf_clientes)
        if (lista2.length === 0 ) {
            throw new Error("Esse cliente não existe!!")
        }
        let lista: Advogados[] = []
        lista = await this.servi_adv.buscar_adv_id(id_advogado)

        if (lista.length === 0 || lista === undefined) {
            throw new Error("Esse advogado não existe!!")
        }


        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataAgendada)) {
            console.log('Data de consulta está inválida. Use o formato DD/MM/AAAA.');
            return
        }
        const [dia, mes, ano] = dataAgendada.split('/');
        const nascimentoFormatado = `${ano}-${mes}-${dia}`;

        const nascimento = new Date(nascimentoFormatado);

        if (isNaN(nascimento.getTime())) {
            console.log('Data de consulta inválida. Certifique-se de que a data inserida é válida.');
            return
        }

        const hoje = new Date();
        if (nascimento < hoje) {
            console.log('A data de consulta não pode ser menor que a data de hoje.');
            return
        }



        return await this.repo.inserirConsulta(cpf_clientes, id_advogado, dataAgendada, horario)
    }


    // METODO QUE BUSCA AS CONSULTAS DOS ADVOGADOS PARA RELATÓRIO
    public async buscar_consultas__Adv(id_advogado: number): Promise<Consultas[]> {
        let adv_consultas: Consultas[] = []
        adv_consultas = await this.repo.buscar_consulta_para_Advogado(id_advogado)
        if (adv_consultas.length === 0) {
            throw new Error("Advogado não encontrada")
        }

        return await this.repo.buscar_consulta_para_Advogado(id_advogado)
    }



    // METODO QUE BUSCA AS CONSULTAS DOS ADVOGADOS PARA RELATÓRIO
    public async buscar_consultas_Cliente(cpf: string) {
        let cliente_consultas: Consultas[] = []
        cliente_consultas = await this.repo.buscar_consulta_Cliente(cpf)
        if (cliente_consultas.length === 0) {
            throw new Error("Cliente não encontrada")
        }
        return await this.repo.buscar_consulta_Cliente(cpf)
    }



    // METODO QUE DELETA AS CONSULTAS
    public async deletar_consulta(id: number) {
        let consulta: Consultas[] = []
        consulta = await this.repo.buscar_consulta(id)
        if (consulta.length === 0) {
            throw new Error("Consulta não encontrada")
        }
        await this.repo.deletar_consulta(id)
    }



    // MEDO QUE MUDA O CPF DO CLIENTE
    public async mudar_cpf_cliente(cpf: string, cpf2: string) {
        if (!Validacoes.validar_CPF(cpf2)) {
            throw new Error("Cpf não existe")
        }

        await this.repo.mudar_cpf_cliente(cpf, cpf2)
    }



    // METODO QUE MUDA O ID DO ADVOGADO
    public async mudar_advogado(id: number, id_advogados2: number) {
        let consulta = this.buscar_consultas(id)
        let advogado = this.servi_adv.buscar_adv_id(id_advogados2)
        if (!consulta) {
            throw new Error("Id não encontrado!!")
        }
        if (!advogado) {
            throw new Error("Advogado não encontrado")
        }
        await this.repo.mudar_advogado(id, id_advogados2)
    }


    // METODO QUE MUDA A DATA
    public async mudar_data(id: number, data_agendada: string) {
        let consulta = this.buscar_consultas(id)
        if (!consulta) {
            throw new Error("Id não encontrado!!")
        }
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data_agendada)) {
            console.log('Data de consulta está inválida. Use o formato DD/MM/AAAA.');
            return
        }
        const [dia, mes, ano] = data_agendada.split('/');
        const nascimentoFormatado = `${ano}-${mes}-${dia}`;

        const nascimento = new Date(nascimentoFormatado);

        if (isNaN(nascimento.getTime())) {
            console.log('Data de consulta inválida. Certifique-se de que a data inserida é válida.');
            return
        }

        const hoje = new Date();
        if (nascimento < hoje) {
            console.log('A data de consulta não pode ser menor que a data de hoje.');
            return
        }
        await this.repo.mudar_data(id, data_agendada)
    }



    // METODO USADO PARA MUDAR O HORARIO
    public async mudar_horario(id: number, horario: string) {
        await this.repo.mudar_horario(id, horario)
    }

    public validar_data(data: string) {


    }
}