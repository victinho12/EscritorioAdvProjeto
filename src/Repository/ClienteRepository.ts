//IMPORTANDO DADOS
import { Pool } from "pg";
import { Database } from "./Database";
import { Cliente } from "../Entity/Clientes";
//CLASSE CLIENTE REPOSITORI
export class ClienteRepository {
  private pool: Pool;
  //CONSTRUTOR DA CLASSE
  constructor() {
    this.pool = Database.iniciarConexao();
  }

  //METODO USADO PARA LISTAR TODOS OS CLIENTES
  public async listarClientes(): Promise<Cliente[]> {
    const query = "SELECT * FROM PUBLIC.CLIENTES order by cpf asc";
    const result = await this.pool.query(query);

    const listaClientes: Cliente[] = [];

    for (let row of result.rows) {
      let cliente = new Cliente(

        row.cpf,
        row.nome,
        row.datanascimento,
        row.observacoes
      );
      listaClientes.push(cliente);
    }
    return listaClientes;
  }


  //METODO USADO PARA BUSCAR TODOS OS CLIENTES
  public async BuscarCLientePorCpf(cpf: string): Promise<Cliente[]> {
    const query = "select * from public.clientes where cpf = $1";
    const result = await this.pool.query(query, [cpf]);

    const buscarClientes: Cliente[] = [];
    
    for (let row of result.rows) {
      console.log(row)
      let cliente = new Cliente(
        row.cpf,
        row.nome,
        row.datanascimento,
        row.observacoes
      );
      buscarClientes.push(cliente);
    }
    return buscarClientes;
  }


  //METODO USADO PARA INSERIR UM NOVO CLIENTE NO SISTEMA
  public async inserirCliente(
    cpf: string,
    nome: string,
    datanascimento: string,
    observacoes: string
  ) {
    const query =
      "insert into public.clientes (cpf,nome,datanascimento,observacoes) values ($1, $2, $3, $4)returning*";
    const valores = [cpf, nome, datanascimento, observacoes];
    const { rows } = await this.pool.query(query, valores);
    return new Cliente(
      rows[0].cpf,
      rows[0].nome,
      rows[0].datanascimento,
      rows[0].observacoes
    );
  }


  //METODO USADO PARA DELETAR UM CLIENTE DO SISTEMA
  public async deletarCliente(cpf: string):Promise<Cliente[]>{
    const query = "delete from public.clientes where clientes.cpf ilike $1";
    const result = await this.pool.query(query, [cpf]);
    return result.rows
  }


  //METODO USADO PARA MUDAR O CPF DO CLIETNE
  public async mudarCpfCliente(cpf: string, cpf2: string):Promise<Cliente[]> {
    const query = "UPDATE public.clientes SET cpf = $2 WHERE cpf = $1 "
    const result = await this.pool.query(query, [cpf, cpf2])
    return result.rows
  }

  //METODO USADO PARA MUDAR O NOME DO CLIETNE
  public async mudarNomeCliente(cpf: string, nome: string) {
    const query = "UPDATE public.clientes SET nome = $2 WHERE cpf = $1 "
    const result = await this.pool.query(query, [cpf, nome])
    return result.rows
  }


  //METODO USADO PARA MUDAR A DATA DE NASCIMENTO
  public async mudarDataNascimento(cpf: string, datanascimento: string) {
    const query = "UPDATE PUBLIC.clientes SET datanascimento = $2 WHERE cpf = $1"
    const result = await this.pool.query(query, [cpf, datanascimento])
    return result.rows
  }

  //METODO USADO PARA MUDAR AS SUAS OBS
  public async mudarObservacoes(cpf: string, observacoes: string) {
    const query = "UPDATE PUBLIC.clientes SET observacoes = $2 WHERE cpf = $1"
    const result = await this.pool.query(query, [cpf, observacoes])
    return result.rows
  }

  public async buscarConsultas(cpf: string): Promise<number[]> {
    const query = "SELECT cpf_clientes FROM clientes INNER JOIN consultas ON clientes.cpf = consultas.cpf_clientes WHERE cpf_clientes = '003.534.900-00';"
    const result = await this.pool.query(query, [cpf])

    const listaClientes: number[] = []

    for (let row of result.rows) {
      listaClientes.push(row.quantiConsultas)
    }
    return listaClientes
  }
}