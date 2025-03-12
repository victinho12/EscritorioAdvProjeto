import { Cliente } from "../Entity/Custumers";
import { ClienteRepository } from "../Repository/Clienterepository";

export class ClienteService {
  private repo: ClienteRepository;

  constructor() {
    this.repo = new ClienteRepository();
  }


  public async listarClientes(): Promise<Cliente[]> {
    return await this.repo.listarClientes();
  }


  public async buscarClientesPorCpf(cpf: string): Promise<Cliente[]> {
    let lista: Cliente[] = [];
    lista = await this.repo.BuscarCLientePorCpf(cpf);

    if (lista.length == 0) {
      throw new Error("Cpf invalido");
    }
    return lista;
  }


  public async inserirCliente(
    cpf: string,
    nome: string,
    datanascimento: string,
    observacoes: string
  ) {
    return await this.repo.inserirCliente(
      cpf,
      nome,
      datanascimento,
      observacoes
    );
  }


  public async deletarCliente(cpf: string): Promise<Cliente[]> {
    let lista: Cliente[] = [];
    lista = await this.repo.deletarCliente(cpf);
    return lista;
  }
  

  public async mudarCpfCliente(cpf: string, cpf2:string):Promise<Cliente[]>{
    let lista: Cliente[] = []
    lista = await this.repo.mudarCpfCliente(cpf,cpf2)
    return lista;
  }


  public async mudarNomeCliente(cpf:string, nome:string):Promise<void>{
    await this.repo.mudarNomeCliente(cpf,nome)
  }

  
  public async mudarDataNascimento(cpf:string, datanascimento:string):Promise<void>{
    await this.repo.mudarDataNascimento(cpf,datanascimento)
  }
  

  public async mudarObservacoes(cpf:string, observacoes:string):Promise<void>{
    await this.repo.mudarObservacoes(cpf,observacoes)
  }
}