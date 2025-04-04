//IMPORTANDO DADOS
import promptSync from "prompt-sync";
import { AdvogadoService } from "../Service/AdvogadoService";
import { publicDecrypt } from "crypto";

//CLASSE ADVOGADO VIEW
export class AdvogadoView {
  private Advogado: AdvogadoService;
  private prompt: promptSync;


  // CONSTRUTOR DA CLASSE 
  constructor() {
    this.prompt = promptSync();
    this.Advogado = new AdvogadoService();
  }


  // METODO QUE LISTA TODOS OS ADVOGAODS
  public async listar_advogados() {
    console.table(await this.Advogado.listarAdvogados())
  }


  


  // METODO QUE EXIBE O MENU PARA O USUARIO
  public async exibirMenu(): Promise<void> {
    console.log("======================================");
    console.log("")
    console.log("1-Ver Advogado");
    console.log("2-adicionar Advogado");
    console.log("3-pesquisar Advogado");
    console.log("4-deletar Advogado");
    console.log("5-Atualizar lista");
    console.log("6-sair");
    console.log("")
    console.log("======================================");
    let perguntaMenu = this.prompt("Qual a opção que vc deseja? ");
    switch (perguntaMenu) {


      case "1":// MOSTRA TODOS OS ADVOGADOS


        console.table(await this.Advogado.listarAdvogados());
        this.exibirMenu();
        break;


      case "2"://ADICIONA UM NOVO ADVOGADO
        let perguntaNome = this.prompt("Digite o nome do Advogado: ")
        let perguntaEspecialidade = this.prompt("Digite a Especialidade ele é: ")
        let perguntaEmail = this.prompt("Digite o Email dele: ")
        let perguntaTelefone = this.prompt("Digite o teleforne dele: ")
        let perguntaSituacao = this.prompt("Digite se ele esta nativo ou esta inativo: ")
        await this.Advogado.inserirAdv(perguntaNome, perguntaEspecialidade, perguntaEmail, perguntaTelefone, perguntaSituacao)
        this.exibirMenu()
        break;


      case "3"://PESQUISA UM ADIVOGADO
        await this.listar_advogados()
        console.log("")
        let email_advogado = this.prompt("Digite o email do Advogado: ");
        console.table(await this.Advogado.buscar_adv_email(email_advogado));
        this.exibirMenu()
        break;


      case "4"://DELETA UM ADVOGADO
        await this.listar_advogados()
        console.log("")
        let email_Deletar = this.prompt("Digite o email do adv que deseja deletar: ")
        await this.Advogado.deletarAdv(email_Deletar)
        this.exibirMenu()
        break;


      case "5"://ATUALIZA ALGUMA CARACTERISTICA DE UM ADVOGADO
        console.log("======================================");
        console.log("")
        console.log("1-Mudar nome do Advogado");
        console.log("2-Mudar especialidade do Advogado");
        console.log("3-Mudar email do Advogado");
        console.log("4-Mudar telefone do Advogado");
        console.log("5-Mudar a sua situação (Nativo | Inativo)")
        console.log("6-Voltar")
        console.log("")
        console.log("======================================");

        let perguntaAtualizarAdv = this.prompt("Digite oq vc deseja mudar de um advogado: ")
        switch (perguntaAtualizarAdv) {


          case "1":// MUDA O NOME DO ADVOGADO
            await this.listar_advogados()
            console.log("")
            let pergunta_email_Mudar1 = this.prompt("Digite o email do advogado: ")
            let perguntaMudarNome = this.prompt("Digite o nome que quer botar: ")
            await this.Advogado.atualizarNomeAdv(pergunta_email_Mudar1, perguntaMudarNome)
            this.exibirMenu()
            break;


          case "2":// MUDA A SUA ESPECIALIDADE
            await this.listar_advogados()
            console.log("")
            let pergunta_email_MudarEspecialida = this.prompt("Digite o email do advogado: ")
            let perguntaMudarEspecialidade = this.prompt("Digite a especialidade que quer botar: ")
            await this.Advogado.atualizarEspecialidadeAdv(pergunta_email_MudarEspecialida, perguntaMudarEspecialidade)
            this.exibirMenu()
            break;


          case "3":// MUDA O SEU EMAIL
            await this.listar_advogados()
            console.log("")
            let pergunta_email_Mudar3 = this.prompt("Digite o email do advogado: ")
            let perguntaMudarEmail = this.prompt("Digite o email que você quer botar: ")
            await this.Advogado.atualizarEmailAdv(pergunta_email_Mudar3, perguntaMudarEmail)
            this.exibirMenu()
            break;

          case "4":// MUDA O SEU TELEFONE
            await this.listar_advogados()
            console.log("")
            let pergunta_email_Mudar4 = this.prompt("Digite o email do advogado: ")
            let perguntaMudarTelefone = this.prompt("Digite o telefone que quer botar: ")
            await this.Advogado.atualizarTelefoneAdv(pergunta_email_Mudar4, perguntaMudarTelefone)
            this.exibirMenu()
            break;


          case "5":// MUDA A SUA SITUAÇÃO
            await this.listar_advogados()
            console.log("")
            let pergunta_email_Mudar5 = this.prompt("Digite o email do advogado: ")
            let perguntaMudarSituacao = this.prompt("Digite a situacão do advogado que quer botar: ")
            await this.Advogado.atualizarSituacao(pergunta_email_Mudar5, perguntaMudarSituacao)
            break;
          default:
            console.log("Não temos essa opção!!")
            this.exibirMenu()
          case "6"://VOLTA PARA O MENU
            this.exibirMenu()
        }
        break;
      case "6"://SAI DO SISTEMA
        process.exit()
      default:
        console.log("Não temos essa opção!!")
        this.exibirMenu()
    }
  }
}
