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
        console.log("2-adicionar Consultas");
        console.log("3-pesquisar Consultas");
        console.log("4-deletar Consultas");
        console.log("5-Atualizar Consultas");
        console.log("6-sair");
        console.log("")
        console.log("======================================");
        let perguntaMenu = this.prompt("Qual a opção que vc deseja? ");

        switch (perguntaMenu){
            
            case "1":
            console.table(await this.consultas.listarTodasConsultas())
            this.exibirMenu()    
        }
    }
}