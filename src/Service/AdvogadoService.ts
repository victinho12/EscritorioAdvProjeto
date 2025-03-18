//IMPORTANDO DADOS
import { Advogados } from "../Entity/Advogado";
import { AdvogadoRepository } from "../Repository/AdvogadoRepository";
//CLASSE ADVOGADO SERVICE
export class AdvogadoService {
  private repo: AdvogadoRepository;
  //CONSTRUTOR DA CLASSE
  constructor() {
    this.repo = new AdvogadoRepository();
  }


  //METODO QUE LISTA ADVOGADOS
  public async listarAdvogados(): Promise<Advogados[]> {
    return await this.repo.listaAdvogados();
  }

  //METODO QUE BUSCA ADVOGADOS
  public async buscarAdv(id: number): Promise<Advogados[]> {
    return await this.repo.buscarAdvPorId(id)
  }

  //METODOS QUE INSERE ADVOGADOS NO SISTEMA
  public async inserirAdv(nome: string, especialidade: string, email: string, telefone: number, situacao: string
  ) {
    await this.repo.inserirAdvogado(nome, especialidade, email, telefone, situacao)
  }

  //METODO QUE DELETA ADVOGADOS DO SISTEMA
  public async deletarAdv(id: number): Promise<void> {
    await this.repo.deletarAdvogado(id)
  }

  //METODO QUE ATUALIZA O NOME DO ADVOGADO
  public async atualizarNomeAdv(id: number, nome: string): Promise<void> {
    await this.repo.atualizarNome(id, nome)
  }

  //METODO QUE ATUALIZA A SUA ESPECIALIDADE
  public async atualizarEspecialidadeAdv(id: number, especialidade: string): Promise<void> {
    await this.repo.atualizarEspecialidade(id, especialidade)
  }

  //METODO QUE ATUALIZA O SEU EMAIL
  public async atualizarEmailAdv(id: number, email: string): Promise<void> {
    await this.repo.atualizarEmail(id, email)
  }

  //METODO QUE ATUALIZA O SEU TELEFONE
  public async atualizarTelefoneAdv(id: number, telefone: number): Promise<void> {
    await this.repo.atualizarTelefone(id, telefone)
  }

  //METODO QUE ATUALIZA A SUA SITUAÇÃO (EX: ATIVO, INATIVO)
  public async atualizarSituacao(id: number, situacao: string): Promise<void> {
    await this.repo.atualizarSituacao(id, situacao)
  }
}