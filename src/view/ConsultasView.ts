//IMPORTANDO DADOS
import { AdvogadoService } from "../Service/AdvogadoService";
import { ConsultasService } from "../Service/consultasService";
import promptSync from "prompt-sync";

//CLASSE CONSULTAS VIEW
export class ConsultasView {
    private advogados: AdvogadoService
    private consultas: ConsultasService;
    private prompt: promptSync;

    //CONSTRUTOR DA CLASSE
    constructor() {
        this.prompt = promptSync();
        this.consultas = new ConsultasService();
        this.advogados = new AdvogadoService();
    }

    //METODO QUE EXIBE O MENU PARA O CLIENTE
    public async exibirMenu(): Promise<void> {
        console.log("======================================");
        console.log("")
        console.log("1-Ver Consultas");
        console.log("2-Adicionar Consultas");
        console.log("3-Pesquisar Consultas para Advogado");
        console.log("4-Pesquisar Consulta para Cliente")
        console.log("5-deletar Consultas");
        console.log("6-Atualizar Consultas");
        console.log("7-sair");
        console.log("")
        console.log("======================================");
        let perguntaMenu = this.prompt("Qual a opção que vc deseja? ");

        switch (perguntaMenu) {

            case "1"://MOSTRA TODAS AS CONSTULAS
                console.table(await this.consultas.listarTodasConsultas())
                this.exibirMenu()
                break;


            case "2":// INSERE UMA CONSULTA
                let perguntaCpfClient = this.prompt("Digite o Cpf: ")
                let perguntaIdAdvogado = this.prompt("Digite o id do advogado: ")
                let pergunta_data_para_agendar = this.prompt("Digite uma data para agendar: ")
                let pergunta_horario_para_agendar = this.prompt("Digite um horario para agendar: ")
                await this.consultas.inserirConsulta(perguntaCpfClient, perguntaIdAdvogado, pergunta_data_para_agendar, pergunta_horario_para_agendar)
                this.exibirMenu()
                break;


            case "3":// BUSCAR CONSULTA PARA O ADV
                let pergunta_consulta_advogado = this.prompt("Digite o id do advogado: ")
                console.table(await this.consultas.buscar_consultas__Adv(pergunta_consulta_advogado))
                this.exibirMenu()
                break;


            case "4":// BUSCA CONSULTA PARA O CLIENTE
                let pergunta_consultar_cliente = this.prompt("Digite o cpf do cliente: ")
                console.table(await this.consultas.buscar_consultas_Cliente(pergunta_consultar_cliente))
                this.exibirMenu();
                break;

            case "5":// DELETA AS CONSULTAS INDESEJADAS
               console.table(await this.consultas.listarTodasConsultas())
                let pergunta_consulta_deletar = this.prompt("Digite o id da consulta que quer deletar: ")
                await this.consultas.deletar_consulta(pergunta_consulta_deletar)
                this.exibirMenu();
                break;

            case "6":// MENU DE ATUALIZAÇÃO
                console.log("======================================");
                console.log("")
                console.log("1-Mudar cpf do Cliente ");
                console.log("2-Mudar advogado");
                console.log("3-Mudar data");
                console.log("4-Mudar horario");
                console.log("5-Voltar");
                console.log("======================================");
                console.log("")
                let mudarCliente = this.prompt("Qual opção do cliente deseja mudar? ");
                
                switch (mudarCliente){
                    case "1":// MUDA O CPF
                        let pergunta_mudar_cpf = this.prompt("Digite qual o cpf que deseja mudar: ")
                        let pergunta_botar_cpf = this.prompt("Digite qual cpf deseja botar: ")
                        await this.consultas.mudar_cpf_cliente(pergunta_mudar_cpf,pergunta_botar_cpf)
                        this.exibirMenu();
                        break;

                    case "2":// MUDA OS ADVOGADOS
                        console.log("Tabela de consultas")
                        console.log("")
                        console.table(await this.consultas.listarTodasConsultas())
                        console.log("")
                        console.log("Tabela de advogados")
                        console.log("")
                        console.table(await this.advogados.listarAdvogados())
                        let pergunta_mudar_advogado = this.prompt("Digite o id da consulta que deseja mudar: ")
                        let pergunta_botar_advogado = this.prompt("Digite o id do advogado para botar: ")
                        await this.consultas.mudar_advogado(pergunta_mudar_advogado,pergunta_botar_advogado)
                        this.exibirMenu()
                        break;
                    case "3":// MUDA A DATA
                        
                }
        }
    }
}