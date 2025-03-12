import { Advogados } from "../Entity/Lawyers";
import { AdvogadoRepository } from "../Repository/AdvogadoRepository";

export class AdvogadoService {
  private repo: AdvogadoRepository;

  constructor() {
    this.repo = new AdvogadoRepository();
  }


  public async listarAdvogados(): Promise<Advogados[]> {
    return await this.repo.listaAdvogados();
  }


  public async buscarAdv(id: number): Promise<Advogados[]> {
    return await this.repo.buscarAdvPorId(id)
  }


  public async inserirAdv(name: string, especialidade: string, email: string, telefone: number, situacao: string
  ) {
    await this.repo.inserirAdvogado(name, especialidade, email, telefone, situacao)
  }


  public async deletarAdv(id: number): Promise<void> {
    await this.repo.deletarAdvogado(id)
  }


  public async atualizarNomeAdv(id: number, nome: string): Promise<void> {
    await this.repo.atualizarNome(id, nome)
  }

  
  public async atualizarEspecialidadeAdv(id: number, especialidade: string): Promise<void> {
    await this.repo.atualizarEspecialidade(id, especialidade)
  }


  public async atualizarEmailAdv(id:number, email:string):Promise<void>{
    await this.repo.atualizarEmail(id,email)
  }


  public async atualizarTelefoneAdv(id:number, telefone:number):Promise<void>{
    await this.repo.atualizarTelefone(id,telefone)
  }


  public async atualizarSituacao(id:number, situacao:string):Promise<void>{
    await this.repo.atualizarSituacao(id, situacao)
  }
}