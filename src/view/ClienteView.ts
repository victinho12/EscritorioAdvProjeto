// IMPORTA OS DADOS
import promptSync from "prompt-sync";
import { ClienteService } from "../Service/ClienteService";
import { executionAsyncId } from "async_hooks";

//CLASSE CLIENTE VIEW
export class ClienteView {
  private Cliente: ClienteService;
  private prompt: promptSync;

  // CONSTRUTOR DA CLASSE
  constructor() {
    this.prompt = promptSync();
    this.Cliente = new ClienteService();
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
        this.validarCpf(perguntaCpf);
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
            this.validarCpf(perguntaCpfBotar);
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
        }


        break;
      case "6"://SAI DO SISTEMA
        process.exit;
    }
  }



  
  private validarCpf(cpf: string): boolean {
    // Remover caracteres não numéricos
    cpf = cpf.replace(/\D/g, "");

    // Verificar se tem 11 dígitos e não é uma sequência repetida (ex: "111.111.111-11")
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      console.log("CPF está inválido, tente novamente");
      this.exibirMenu()
      return false;
    }

    // Função para calcular os dígitos verificadores
    const calcularDigito = (baseCpf: string, pesoInicial: number): number => {
      let soma = 0;
      for (let i = 0; i < baseCpf.length; i++) {
        soma += parseInt(baseCpf[i]) * (pesoInicial - i);
      }
      let resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    // Calcular os dois dígitos verificadores
    const digito1 = calcularDigito(cpf.substring(0, 9), 10);
    const digito2 = calcularDigito(cpf.substring(0, 10), 11);

    // Verificar se os dígitos calculados batem com os fornecidos no CPF
    if (digito1 === parseInt(cpf[9]) && digito2 === parseInt(cpf[10])) {
      console.log("CPF válido!");
      return true;
    } else {
      console.log("CPF está inválido, tente novamente");
      this.exibirMenu()
      return false;
    }
  }
}
