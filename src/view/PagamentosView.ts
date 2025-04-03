import { PagamentosService } from "../Service/PagamentosService";
//IMPORTANDO DADOS
import { ClienteService } from "../Service/ClienteService";
import { AdvogadoService } from "../Service/AdvogadoService";
import { ConsultasService } from "../Service/ConsultasService";
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
        console.table(await this.clientes.listarClientes())
    }

    // METODO USADO PARA LISTAR OS ADVOGADOS PARA CONSULTAS
    public async listar_advogados() {
        console.table(await this.advogados.listarAdvogados())
    }

    //METODO USADO PARA LISTAR TODAS AS CONSULTAS 
    public async listar_consultas() {
        console.table(await this.consultas.listarTodasConsultas())
    }

    //METODO USADO PARA VER OS PAGAMENTOS
    public async listar_todos_pagamentos(){
        console.table(await this.pagamentos.listar_pagamento())
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

            case "3": // BUSCAR PAGAMENTO
                await this.listar_todos_pagamentos()
                let pergunta_id_consulta = this.prompt("Digite o id da consulta para achar um pagamento: ")
                console.table(await this.pagamentos.buscar_pagamentos(pergunta_id_consulta))
                this.exibirMenu()
                break;

            case "4":// DELETAR PAGAMENTO
                await this.listar_todos_pagamentos()
                let pergunta_deletar_pagamento = this.prompt("Digite o pagamento que deseja deletar: ")
                await this.pagamentos.deletar_pagamentos(pergunta_deletar_pagamento)
                this.exibirMenu()
                break;

            case "5"://  MENU ATUALIZAR PAGAMENTOS
                console.log("======================================");
                console.log("")
                console.log("1-Mudar id da consulta do pagamento ");
                console.log("2-Mudar valor");
                console.log("3-Mudar data");
                console.log("4-Mudar metodo de pagamento");
                console.log("5-Voltar");
                console.log("======================================");
                console.log("")
                let mudar_pagamento = this.prompt("Qual opção do pagamento deseja mudar? ");

                switch (mudar_pagamento){

                    case "1": // MUDAR CONSULTA
                        await this.listar_todos_pagamentos()
                        let pergunta_id_consulta_mudar = this.prompt("Digite o id do pagamento que deseja mudar: ")
                        await this.listar_consultas()
                        let pergunta_id_consulta_botar = this.prompt("Digite o id da consulta que deseja colocar: ")
                        await this.pagamentos.atualizar_id_consulta(pergunta_id_consulta_mudar, pergunta_id_consulta_botar)
                        this.exibirMenu()
                        break;

                    case "2": // MUDAR O VALOR
                    await this.listar_todos_pagamentos()
                    let pergunta_id_valor_mudar = this.prompt("Digite o id do pagamento que deseja mudar: ")
                    let pergunta_id_valor_botar = this.prompt("Digite o valor que deseja colocar: ")
                    await this.pagamentos.atualizar_valor_pagamento(pergunta_id_valor_mudar, pergunta_id_valor_botar)
                    this.exibirMenu()

                    break;

                    case "3": // MUDAR DATA DO PAGAMENTO
                    await this.listar_todos_pagamentos()
                    let pergunta_id_data_mudar = this.prompt("Digite o id do pagamento que deseja mudar: ")
                    let pergunta_id_data_botar = this.prompt("Digite a data que deseja colocar: ")
                    await this.pagamentos.atualizar_data_pagamento(pergunta_id_data_mudar, pergunta_id_data_botar)
                    this.exibirMenu()

                    break;

                    case "4": // MUDAR METODO DE PAGAMETO
                    await this.listar_todos_pagamentos()
                    let pergunta_id_metodo_mudar = this.prompt("Digite o id do pagamento que deseja mudar: ")
                    let pergunta_id_metodo_botar = this.prompt("Digite o metodo que deseja colocar: ")
                    await this.pagamentos.atualizar_metodo_pagamento(pergunta_id_metodo_mudar, pergunta_id_metodo_botar)
                    this.exibirMenu()

                    break;

                    case "5":
                        this.exibirMenu()
                    
                    break;
                    default:
                        console.log("Essa opção não existe!!")
                        process.exit()

                }   
                break;

                case "6":
                    process.exit()
                default:
                    console.log("Não temos essa opção!!")
                    this.exibirMenu()

        }
    }
}