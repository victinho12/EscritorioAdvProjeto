//IMPORTANDO DADOS
import { Cliente } from "../Entity/Clientes";
import { ClienteRepository } from "../Repository/ClienteRepository";

//CLASSE CLIETNE SERVICE
export class ClienteService {
  private repo: ClienteRepository;

  //CONSTRUTOR DA CLASSE
  constructor() {
    this.repo = new ClienteRepository();
  }

  //METODO QUE LISTA TODOS OS CLIENTES
  public async listarClientes(): Promise<Cliente[]> {
    return await this.repo.listarClientes();
  }

  //METODO QUE BUSTAR CLIENTE
  public async buscarClientesPorCpf(cpf: string): Promise<Cliente[]> {
    let lista: Cliente[] = [];
    lista = await this.repo.BuscarCLientePorCpf(cpf);

    if (lista.length == 0) {
      throw new Error("Cpf invalido");
    }
    return lista;
  }

  //METODO QUE INSERE CLIENTES NO SISTEMA
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

  //METODO QUE DELETA CLIENTES DO SISTEMA
  public async deletarCliente(cpf: string): Promise<Cliente[]> {
    let lista: Cliente[] = [];
    lista = await this.repo.deletarCliente(cpf);
    return lista;
  }

  //METODO QUE MUDA O CPF DO CLIENTE 
  public async mudarCpfCliente(cpf: string, cpf2: string): Promise<Cliente[]> {
    let lista: Cliente[] = []
    lista = await this.repo.mudarCpfCliente(cpf, cpf2)
    return lista;
  }

  //METOD QUE MUDA O NOME DO CLIENTE
  public async mudarNomeCliente(cpf: string, nome: string): Promise<void> {
    await this.repo.mudarNomeCliente(cpf, nome)
  }

  //METODO QUE MUDAD A SUA DATA DE NASCIMENTO
  public async mudarDataNascimento(cpf: string, datanascimento: string): Promise<void> {
    await this.repo.mudarDataNascimento(cpf, datanascimento)
  }


  //METODO QUE MUDA A SUA OBSERVAÇÕES (EX; EDUARDO MATOU ALGUÉM)
  public async mudarObservacoes(cpf: string, observacoes: string): Promise<void> {
    await this.repo.mudarObservacoes(cpf, observacoes)
  }
}