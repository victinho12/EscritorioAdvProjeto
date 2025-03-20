import { PagamentosService } from "../Service/PagamentosService";
//IMPORTANDO DADOS
import { ClienteService } from "../Service/ClienteService";
import { AdvogadoService } from "../Service/AdvogadoService";
import { ConsultasService } from "../Service/consultasService";
import promptSync from "prompt-sync";

//CLASSE CONSULTAS VIEW
export class ConsultasView {
    private advogados: AdvogadoService;
    private consultas: ConsultasService;
    private clientes: ClienteService;
    private pagamentos: PagamentosService;
    private prompt: promptSync;

    //CONSTRUTOR DA CLASSE
    constructor() {
        this.prompt = promptSync();
        this.consultas = new ConsultasService();
        this.advogados = new AdvogadoService();
        this.clientes = new ClienteService();
        this.pagamentos = new PagamentosService();
    }
    // METODO USADO PARA LISTAR OS CLIENTES PARA CONSULTAS
    public async listar_clientes() {
        console.table(this.clientes.listarClientes())
    }

    // METODO USADO PARA LISTAR OS ADVOGADOS PARA CONSULTAS
    public async listar_advogados() {
        console.table(this.advogados.listarAdvogados())
    }

    //METODO USADO PARA LISTAR TODAS AS CONSULTAS 
    public async listar_consultas() {
        console.table(this.consultas.listarTodasConsultas())
    }

    //METODO QUE EXIBE O MENU PARA O CLIENTE
    public async exibirMenu(): Promise<void> {
        console.log("======================================");
        console.log("")
        console.log("1-Ver Consultas");
        console.log("2-Adicionar Consultas");
        console.log("3-Pesquisar Consultas para Advogado");
        console.log("4-Pesquisar C para Cliente")
        console.log("5-deletar pagamentos");
        console.log("6-Atualizar pagamentos");
        console.log("7-sair");
        console.log("")
        console.log("======================================");
        let perguntaMenu = this.prompt("Qual a opção que vc deseja? ");

    }
}