//IMPORTANDO DADOS
import { error } from "console";
import { Advogados } from "../Entity/Advogado";
import { AdvogadoRepository } from "../Repository/AdvogadoRepository";
import { Validacoes } from "../Util/Verificacoes";


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
  public async buscarAdv(email: string): Promise<Advogados[]> {
    let lista : Advogados[] = [] 
    lista = await this.repo.buscarAdvPorId(email)

    if (lista.length === 0 ){
      throw new error ("Esse advogado não existe!!")
    }else{
      return lista
    }
  }


  //METODOS QUE INSERE ADVOGADOS NO SISTEMA
  public async inserirAdv(nome: string, especialidade: string, email: string, telefone: number, situacao: string
  ) {

    if(!Validacoes.validar_email(email)){
      throw new error ("Email invalido!!")
    }
    await this.repo.inserirAdvogado(Validacoes.arrumar_texto(nome), Validacoes.arrumar_texto(especialidade), email, telefone,  Validacoes.arrumar_texto(situacao))
  }


  //METODO QUE DELETA ADVOGADOS DO SISTEMA
  public async deletarAdv(email: string): Promise<void> {
    let advogado = this.buscarAdv(email)

    if(!advogado){
      throw new error ("Esse advogado não existe!!")
    }
    await this.repo.deletarAdvogado(email)
  }


  //METODO QUE ATUALIZA O NOME DO ADVOGADO
  public async atualizarNomeAdv(email: string, nome: string): Promise<void> {
    let advogado = this.buscarAdv(email)
    if(!advogado){
      throw new error ("Esse advogado não existe")
    }

    await this.repo.atualizarNome(email, Validacoes.arrumar_texto(nome))
  }


  //METODO QUE ATUALIZA A SUA ESPECIALIDADE
  public async atualizarEspecialidadeAdv(email: string, especialidade: string): Promise<void> {
    let advogado = this.buscarAdv(email)

    if(!advogado){
      throw new error ("Esse advogado não existe!!")
    }
    await this.repo.atualizarEspecialidade(email, Validacoes.arrumar_texto(especialidade))
  }


  //METODO QUE ATUALIZA O SEU EMAIL
  public async atualizarEmailAdv(email: string, email2: string): Promise<void> {
    let advogado = this.buscarAdv(email)

    if(!Validacoes.validar_email(email || email2)){
      throw new error ("Esse advogado não existe!!")
    }
    await this.repo.atualizarEmail(email, email2)
  }


  //METODO QUE ATUALIZA O SEU TELEFONE
  public async atualizarTelefoneAdv(email: string, telefone: number): Promise<void> {
    let advogado = this.buscarAdv(email)

    if(!advogado){
      throw new error ("Esse advogado não existe!!")
    }
    await this.repo.atualizarTelefone(email, telefone)
  }


  //METODO QUE ATUALIZA A SUA SITUAÇÃO (EX: ATIVO, INATIVO)
  public async atualizarSituacao(email: string, situacao: string): Promise<void> {
    let advogado = this.buscarAdv(email)

    if(!advogado){
      throw new error ("Esse advogado não existe!!")
    }
    await this.repo.atualizarSituacao(email, Validacoes.arrumar_texto(situacao))
  }



}