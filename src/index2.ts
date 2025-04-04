import * as readline from 'readline';
import { AdvogadoView } from "./view/AdvogadoView";
import { ClienteView } from "./view/ClienteView";
import { PagamentosView } from "./view/PagamentosView";
import { ConsultasView } from "./view/ConsultasView";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export class MenuPrincipal {
    private clienteView: ClienteView;
    private advogadoView: AdvogadoView;
    private consultasView: ConsultasView;
    private pagamentosView: PagamentosView;

    constructor() {
        this.clienteView = new ClienteView();
        this.advogadoView = new AdvogadoView();
        this.consultasView = new ConsultasView();
        this.pagamentosView = new PagamentosView();
    }

    public exibirMenu(): void {
        console.clear();
        console.log("==========================");
        console.log("      MENU PRINCIPAL      ");
        console.log("==========================");
        console.log("1 - Cliente");
        console.log("2 - Advogado");
        console.log("3 - Consultas");
        console.log("4 - Pagamentos");
        console.log("5 - Sair");
        console.log("==========================");

        rl.question("Escolha uma opção: ", (opcao) => {
            this.processarOpcao(opcao);
        });
    }s

    private processarOpcao(opcao: string): void {
        switch (opcao) {
            case '1':
                this.clienteView.exibirMenu();
                break;
            case '2':
                this.advogadoView.exibirMenu();
                break;
            case '3':
                this.consultasView.exibirMenu();
                break;
            case '4':
                this.pagamentosView.exibirMenu();
                break;
            case '5':
                console.log("Saindo do sistema...");
                rl.close();   
                return;
            default:
                console.log("Opção inválida! Tente novamente.");
        }

        setTimeout(() => this.exibirMenu(), 2000);
    }
}

const menu = new MenuPrincipal();
menu.exibirMenu();

