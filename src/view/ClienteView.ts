// IMPORTA OS DADOS
import promptSync from "prompt-sync";
import { ClienteService } from "../Service/ClienteService";


//CLASSE CLIENTE VIEW
export class ClienteView {
  private Cliente: ClienteService;
  private prompt: promptSync;

  // CONSTRUTOR DA CLASSE
  constructor() {
    this.prompt = promptSync();
    this.Cliente = new ClienteService();
  }

   // METODO USADO PARA LISTAR OS CLIENTES PARA CONSULTAS
   public async listar_clientes(){
    console.table(await this.Cliente.listarClientes())
   }


  //METODO QUE EXIBE O MENU PARA O CLIENTE

  public async exibirMenu(): Promise<void> {
    console.log("======================================");
    console.log("")
    console.log("1-Ver clientes");
    console.log("2-adicionar cliente");
    console.log("3-pesquisar cliente");
    console.log("4-deletar cliente");
    console.log("5-Atualizar lista");
    console.log("6-sair");
    console.log("")
    console.log("======================================");
    let perguntaMenu = this.prompt("Qual a opção que vc deseja? ");
    switch (perguntaMenu) {
      case "1": //METODO USADO PARA VER TODOS OS CLIENTES
        console.table(await this.Cliente.listarClientes());
        this.exibirMenu();


        break;
      case "2": //METODO USADO PARA ADICIONAR UM CLIENTE;
        let perguntaCpf = this.prompt("Digite o Cpf: ");
        let perguntaNome = this.prompt("Digite o nome: ");
        let perguntaDataNascimento = this.prompt("Digite a data de nascimento: ");
        let perguntaMotivoConsulta = this.prompt("Digite o motivo da consulta: ");
        console.table(
          await this.Cliente.inserirCliente(
            perguntaCpf,
            perguntaNome,
            perguntaDataNascimento,
            perguntaMotivoConsulta
          )
        );
        this.exibirMenu();


        break;
      case "3": //METODO USADO PARA PESQUISAR UM CLIENTE
        let perguntaPesquisarCpf = this.prompt("Digite o cpf do cliente: ");
        console.table(
          await this.Cliente.buscarClientesPorCpf(perguntaPesquisarCpf)
        );
        this.exibirMenu();


        break;
      case "4": //METODO USADO PARA DELETAR UM CLIENTE
        await this.listar_clientes()
        let perguntaCpfDeletar = this.prompt("digite o cpf para deletar: ");
        console.log("Cliente deletado com sucesso!",
          await this.Cliente.deletarCliente(perguntaCpfDeletar)
        );
        this.exibirMenu();


        break;
      case "5":// MOSTRA O MENU DE ATUALIZAÇÃO
        console.log("======================================");
        console.log("")
        console.log("1-Mudar cpf do Cliente ");
        console.log("2-Mudar nome do Cliente");
        console.log("3-Mudar datanascimento do Cliente");
        console.log("4-Mudar observações do Cliete");
        console.log("5-Voltar");
        console.log("======================================");
        console.log("")
        let mudarCliente = this.prompt("Qual opção do cliente deseja mudar? ");

        switch (mudarCliente) {
          case "1": //MUDAR O CPF DO CLIENTE
            let perguntaCpfMudar = this.prompt("Digite o cpf que quer procurar e mudar: ");
            let perguntaCpfBotar = this.prompt("Digite o cpf que quer botar pra o cliente: ");
            await this.Cliente.mudarCpfCliente(
              perguntaCpfMudar,
              perguntaCpfBotar
            );
            this.exibirMenu();


            break;
          case "2": //MUDAR O NOME DO CLIENTE:
            let perguntaCpfMudarNome = this.prompt("Digite o cpf do cliente que quer mudar.");
            let perguntaNomeBotar = this.prompt("Digite o nome que quer botar no Cliente.");
            await this.Cliente.mudarNomeCliente(
              perguntaCpfMudarNome,
              perguntaNomeBotar
            );
            this.exibirMenu();


            break;
          case "3": //MUDAR A DATA DE NASCIMENTO DO CLIENTE:
            let perguntaCpfMudarData = this.prompt("Digite o cpf da pessoa que desaja mudar: ");
            let perguntaDataNascimento = this.prompt("Digite a data que deseja:");
            await this.Cliente.mudarDataNascimento(
              perguntaCpfMudarData,
              perguntaDataNascimento
            );


            break;
          case "4":// MUDA AS OBS DO CLIENTE
            let perguntaCpf = this.prompt("Digite o cpf do cliente: ");
            let perguntaMudarObs = this.prompt("Digite o que deseja mudar na obs: ");
            await this.Cliente.mudarObservacoes(perguntaCpf, perguntaMudarObs);
            this.exibirMenu();


            break;
          case "5":// VOLTA PARA O MENU
            this.exibirMenu();
            default:
                console.log("Não temos essa opção!!")
                this.exibirMenu()
        }


        break;
      case "6"://SAI DO SISTEMA
        process.exit();
        default:
                console.log("Não temos essa opção!!")
                this.exibirMenu()
    }
  }
}
