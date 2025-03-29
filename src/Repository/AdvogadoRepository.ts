//IMPORTAÇÕES
import { Pool } from "pg";
import { Database } from "./Database";
import { Advogados } from "../Entity/Advogado";

//CLASSE DO REPOSITORIO
export class AdvogadoRepository {
  private pool: Pool;
  //CONSTRUTOR DO REPOSITORIO
  constructor() {
    this.pool = Database.iniciarConexao();
  }
  //METODO LISTAR ADVOGADO
  async listaAdvogados(): Promise<Advogados[]> {
    const query = "SELECT * FROM PUBLIC.advogados order by id asc";
    const result = await this.pool.query(query);

    const listaAdvogados: Advogados[] = [];
    for (let row of result.rows) {
      let Advogado = new Advogados(
        row.id,
        row.nome,
        row.especialidade,
        row.email,
        row.telefone,
        row.situacao
      );
      listaAdvogados.push(Advogado);
    }
    return listaAdvogados;
  }


  

//METODO PARA BUSCAR UM ADVOGADO NA TABELA DO BANCO DE DADOS
public async buscarAdv_Por_Id(id: number): Promise<Advogados[]> {
  const query = "select * from public.advogados where id = $1";
  const result = await this.pool.query(query, [id]);

  const listaAdv: Advogados[] = [];

  for (let row of result.rows) {
    let advogado = new Advogados(
      row.id,
      row.nome,
      row.especialidade,
      row.email,
      row.telefone,
      row.situacao
    );
    listaAdv.push(advogado);
  }
  return listaAdv;
}


  //METODO PARA BUSCAR UM ADVOGADO NA TABELA DO BANCO DE DADOS
  public async buscarAdv_Por_cpf(email: string): Promise<Advogados[]> {
    const query = "select * from public.advogados where email = $1";
    const result = await this.pool.query(query, [email]);

    const listaAdv: Advogados[] = [];

    for (let row of result.rows) {
      let advogado = new Advogados(
        row.id,
        row.nome,
        row.especialidade,
        row.email,
        row.telefone,
        row.situacao
      );
      listaAdv.push(advogado);
    }
    return listaAdv;
  }
  //METODO PARA INSERIR UM NOVO ADVOGADO NO SISTEMA
  public async inserirAdvogado(
    nome: string,
    especialidade: string,
    email: string,
    telefone: number,
    situacao: string
  ) {
    const query =
      "insert into public.advogados (nome, especialidade, email, telefone, situacao) values ($1, $2, $3, $4, $5)returning*";
    const valores = [nome, especialidade, email, telefone, situacao];
    const { rows } = await this.pool.query(query, valores);
    return new Advogados(
      rows[0].id,
      rows[0].nome,
      rows[0].especialidade,
      rows[0].email,
      rows[0].telefone,
      rows[0].situacao
    );
  }


  //METODO USADO PARA DELETAR UM ADVOGADO DO SISTEMA
  public async deletarAdvogado(email: string): Promise<void> {
    const query = "delete from public.advogados where advogados.email = $1";
    const result = await this.pool.query(query, [email]);
  }


  //METODO USADO PARA ATUALIZAR ALGO DO ADVOGADO
  public async atualizarNome(email: string, nome: string): Promise<void> {
    const query = "UPDATE public.advogados SET nome = $2 WHERE email = $1 "
    const result = await this.pool.query(query, [email, nome])
  }


  //METODO QUE ATUALIZA ESPECIALIDADE
  public async atualizarEspecialidade(email: string, especialidade: string): Promise<void> {
    const query = "UPDATE public.advogados SET especialidade = $2 WHERE email = $1 "
    const result = await this.pool.query(query, [email, especialidade])
  }


  //METODO QUE ATUALIZA O SEU EMAIL
  public async atualizarEmail(email: string, email2: string): Promise<void> {
    const query = "UPDATE public.advogados SET email = $2 WHERE email = $1"
    const result = await this.pool.query(query, [email, email2])
  }


  //METODO QUE ATUALIZA O SEU TELEFONE
  public async atualizarTelefone(email: string, telefone: number): Promise<void> {
    const query = "UPDATE public.advogados SET telefone = $2 WHERE email = $1"
    const result = await this.pool.query(query, [email, telefone])
  }


  //METODO QUE ATUALIZA A SUA SITUAÇÃO, (EX: ATIVO OU INATIVO)
  public async atualizarSituacao(email: string, situacao: string): Promise<void> {
    const query = "UPDATE public.advogados SET situacao = $2 WHERE email = $1"
    const result = await this.pool.query(query, [email, situacao])
  }
}