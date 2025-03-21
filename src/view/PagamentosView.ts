import { PagamentosService } from "../Service/PagamentosService";
//IMPORTANDO DADOS
import { ClienteService } from "../Service/ClienteService";
import { AdvogadoService } from "../Service/AdvogadoService";
import { ConsultasService } from "../Service/consultasService";
import promptSync from "prompt-sync";

//CLASSE CONSULTAS VIEW
export class PagamentosView {
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
        return this.consultas.listarTodasConsultas()
    }

    //METODO QUE EXIBE O MENU PARA O CLIENTE
    public async exibirMenu(): Promise<void> {
        console.log("======================================");
        console.log("")
        console.log("1-Ver Pagamentos");
        console.log("2-Adicionar Pagamento");
        console.log("3-Pesquisar Pagamento para Cliente")
        console.log("4-deletar pagamentos");
        console.log("5-Atualizar pagamentos");
        console.log("6-sair");
        console.log("")
        console.log("======================================");
        let perguntaMenu = this.prompt("Qual a opção que vc deseja? ");

        switch (perguntaMenu){
            case "1":// VER PAGAMENTOS
                console.table(await this.pagamentos.listar_pagamento())
                this.exibirMenu()
                break;


            case "2":// INSERIR PAGAMENTOS
                console.table(await this.consultas.listarTodasConsultas())
                console.log("")
                let pergunta_id = this.prompt("Digite o id da consulta: ")
                let pergunta_valor = this.prompt("Digite o valor da consulta: ")
                let pergunta_data_pagamento = this.prompt("Digite a data de pagamento: ")
                let pergunta_metodo_pagamento = this.prompt("Digite o metodo de pagamento: ")
                await this.pagamentos.adicionar_pagamentos(pergunta_id, pergunta_valor, pergunta_data_pagamento, pergunta_metodo_pagamento)
                this.exibirMenu()
                break;

            case "3":
                await this.consultas.listarTodasConsultas()
                let pergunta_id_consulta = this.prompt("Digite o id da consulta para achar um pagamento: ")
                console.table(await this.pagamentos.buscar_pagamentos(pergunta_id_consulta))
                this.exibirMenu()
                break;

            case "4":
                
        }
    }
}