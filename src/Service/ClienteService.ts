//IMPORTANDO DADOS
import { error } from "console";
import { Cliente } from "../Entity/Clientes";
import { ClienteRepository } from "../Repository/ClienteRepository";
import { Validacoes } from "../Util/Verificacoes";
import { ConsultasService } from "./ConsultasService";

//CLASSE CLIETNE SERVICE
export class ClienteService {
  private servi_consulta: ConsultasService;
  private repo: ClienteRepository;


  //CONSTRUTOR DA CLASSE
  constructor() {
    this.servi_consulta = new ConsultasService()
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
    if (lista.length === 0) {
      throw new Error("Cpf invalido");
    } else {
      return lista
    }
  }


  //METODO QUE INSERE CLIENTES NO SISTEMA
  public async inserirCliente(
    cpf: string,
    nome: string,
    datanascimento: string,
    observacoes: string
  ) {
    // VALIDAR CPF
    if (Validacoes.validar_CPF(cpf) === false) {
      throw new Error("Cpf invalido");
    }

    // VALIDAR DATA DE NASCIMENTO
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(datanascimento)) {
      console.log('Data de nascimento inválida. Use o formato DD/MM/AAAA.');

    }
    const [dia, mes, ano] = datanascimento.split('/');
    const nascimentoFormatado = `${ano}-${mes}-${dia}`;

    const nascimento = new Date(nascimentoFormatado);

    if (isNaN(nascimento.getTime())) {
      console.log('Data de nascimento inválida. Certifique-se de que a data inserida é válida.');

    }

    const hoje = new Date();
    if (nascimento > hoje) {
      console.log('A data de nascimento não pode ser maior que a data de hoje.');

    }

    return await this.repo.inserirCliente(
      cpf,
      Validacoes.arrumar_texto(nome),
      datanascimento,
      Validacoes.arrumar_texto(observacoes)
    );
  }


  //METODO QUE DELETA CLIENTES DO SISTEMA
  public async deletarCliente(cpf: string) {
      let lista: Cliente[] = await this.repo.deletarCliente(cpf);
      if (lista.length === 0) {
        throw new Error("Cliente não encontrado!!")
      }
      let consulta = await this.servi_consulta.buscar_consultas_Cliente(cpf)
      if (consulta.length > 0) {
        throw new Error("Cliente não pode ser deletado pois tem consultas agendadas")
      }
      await this.repo.deletarCliente(cpf)
  
  }
  
  
  //METODO QUE MUDA O CPF DO CLIENTE 
  public async mudarCpfCliente(cpf: string, cpf2: string) {
    let cliente = this.buscarClientesPorCpf(cpf)
    if (!cliente) {
      throw new error("Cliente não encontrado!!")
    }
    if (!Validacoes.validar_CPF(cpf2)) {
      throw new error("Cliente não pode ser adicionado pois não existe")
    }
    await this.repo.mudarCpfCliente(cpf, cpf2)

  }


  //METOD QUE MUDA O NOME DO CLIENTE
  public async mudarNomeCliente(cpf: string, nome: string): Promise<void> {
    let cliente = this.buscarClientesPorCpf(cpf)
    if (!cliente) {
      throw new error("Cliente não encontrado!!")
    }
    await this.repo.mudarNomeCliente(cpf, Validacoes.arrumar_texto(nome))
  }


  //METODO QUE MUDAD A SUA DATA DE NASCIMENTO
  public async mudarDataNascimento(cpf: string, datanascimento: string): Promise<void> {
    let cliente = this.buscarClientesPorCpf(cpf)
    if (!cliente) {
      throw new error("Cliente não encontrado!!")
    }
    // VALIDAR DATA DE NASCIMENTO
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(datanascimento)) {
      console.log('Data de nascimento inválida. Use o formato DD/MM/AAAA.');

    }
    const [dia, mes, ano] = datanascimento.split('/');
    const nascimentoFormatado = `${ano}-${mes}-${dia}`;

    const nascimento = new Date(nascimentoFormatado);

    if (isNaN(nascimento.getTime())) {
      console.log('Data de nascimento inválida. Certifique-se de que a data inserida é válida.');
    }

    const hoje = new Date();
    if (nascimento > hoje) {
      console.log('A data de nascimento não pode ser maior que a data de hoje.');

    }
    await this.repo.mudarDataNascimento(cpf, datanascimento)
  }



  //METODO QUE MUDA A SUA OBSERVAÇÕES (EX; EDUARDO MATOU ALGUÉM)
  public async mudarObservacoes(cpf: string, observacoes: string): Promise<void> {
    let cliente = this.buscarClientesPorCpf(cpf)
    if (!cliente) {
      throw new error("Cliente não encontrado!!")
    }
    await this.repo.mudarObservacoes(cpf, Validacoes.arrumar_texto(observacoes))
  }



}