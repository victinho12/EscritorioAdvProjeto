import { Pool } from "pg";
import { Database } from "./Database";
import { Advogados } from "../Entity/Advogado";
import { NumberLiteralType } from "typescript";

export class AdvogadoRepository {
  private pool: Pool;

  constructor() {
    this.pool = Database.iniciarConexao();
  }

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
  public async deletarAdvogado(id: number): Promise<void> {
    const query = "delete from public.advogados where advogados.id = $1";
    const result = await this.pool.query(query, [id]);
  }


  public async atualizarNome(id: number, nome: string): Promise<void> {
    const query = "UPDATE public.advogados SET nome = $2 WHERE id = $1 "
    const result = await this.pool.query(query, [id, nome])
  }


  public async atualizarEspecialidade(id: number, especialidade: string): Promise<void> {
    const query = "UPDATE public.advogados SET especialidade = $2 WHERE id = $1 "
    const result = await this.pool.query(query, [id, especialidade])
  }


  public async atualizarEmail(id: number, email: string): Promise<void> {
    const query = "UPDATE public.advogados SET email = $2 WHERE id = $1"
    const result = await this.pool.query(query, [id, email])
  }


  public async atualizarTelefone(id: number, telefone: number): Promise<void> {
    const query = "UPDATE public.advogados SET telefone = $2 WHERE id = $1"
    const result = await this.pool.query(query, [id, telefone])
  }


  public async atualizarSituacao(id: number, situacao: string): Promise<void> {
    const query = "UPDATE public.advogados SET situacao = $2 WHERE id = $1"
    const result = await this.pool.query(query, [id, situacao])
  }
}