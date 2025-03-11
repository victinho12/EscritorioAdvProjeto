import { ConsultasService } from "../Service/consultasService";
import promptSync from "prompt-sync";

export class ConsultasView {
    private consultas: ConsultasService;
    private prompt: promptSync;
    constructor() {
        this.prompt = promptSync();
        this.consultas = new ConsultasService();
    }

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

        switch (perguntaMenu){
            
            case "1":
            console.table(await this.consultas.listarTodasConsultas())
            this.exibirMenu()
            break;
            
            
            case "2":
                let perguntaCpfClient = this.prompt("Digite o Cpf: ")
                let perguntaIdAdvogado = this.prompt("Digite o id do advogado: ")
                let pergunta_data_para_agendar = this.prompt("Digite uma data para agendar: ")
                let pergunta_horario_para_agendar = this.prompt("Digite um horario para agendar: ")
                await this.consultas.inserirConsulta(perguntaCpfClient,perguntaIdAdvogado,pergunta_data_para_agendar,pergunta_horario_para_agendar)
                this.exibirMenu()
                break;


            case "3":
                let pergunta_consulta_advogado = this.prompt("Digite o id do advogado: ")
                console.table(await this.consultas.buscar_consultas__Adv(pergunta_consulta_advogado))
                this.exibirMenu()
                break;


            case "4":
                let pergunta_consultar_cliente = this.prompt("Digite o cpf do cliente: ")
                console.table(await this.consultas.buscar_consultas_Cliente(pergunta_consultar_cliente))
                this.exibirMenu();
                break;

            case "5":
                let pergunta_consulta_deletar = this.prompt("Digite o id da consulta que quer deletar: ")
                await this.consultas.deletar_consulta(pergunta_consulta_deletar)
        }
    }
}