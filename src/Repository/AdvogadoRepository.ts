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
    const query = "SELECT * FROM PUBLIC.advogados";
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
  public async buscarAdvPorId(id: number): Promise<Advogados[]> {
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
  public async deletarAdvogado(id: number): Promise<void> {
    const query = "delete from public.advogados where advogados.id = $1";
    const result = await this.pool.query(query, [id]);
  }

  //METODO USADO PARA ATUALIZAR ALGO DO ADVOGADO
  public async atualizarNome(id: number, nome: string): Promise<void> {
    const query = "UPDATE public.advogados SET nome = $2 WHERE id = $1 "
    const result = await this.pool.query(query, [id, nome])
  }

  //METODO QUE ATUALIZA ESPECIALIDADE
  public async atualizarEspecialidade(id: number, especialidade: string): Promise<void> {
    const query = "UPDATE public.advogados SET especialidade = $2 WHERE id = $1 "
    const result = await this.pool.query(query, [id, especialidade])
  }

  //METODO QUE ATUALIZA O SEU EMAIL
  public async atualizarEmail(id: number, email: string): Promise<void> {
    const query = "UPDATE public.advogados SET email = $2 WHERE id = $1"
    const result = await this.pool.query(query, [id, email])
  }

  //METODO QUE ATUALIZA O SEU TELEFONE
  public async atualizarTelefone(id: number, telefone: number): Promise<void> {
    const query = "UPDATE public.advogados SET telefone = $2 WHERE id = $1"
    const result = await this.pool.query(query, [id, telefone])
  }

  //METODO QUE ATUALIZA A SUA SITUAÇÃO, (EX: ATIVO OU INATIVO)
  public async atualizarSituacao(id: number, situacao: string): Promise<void> {
    const query = "UPDATE public.advogados SET situacao = $2 WHERE id = $1"
    const result = await this.pool.query(query, [id, situacao])
  }
}