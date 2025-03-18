//IMPORTANDO DADOS
import { Pool } from "pg";
import { Database } from "./Database";
import { Pagamentos } from "../Entity/Pagamentos";
//CRIANDO A CLASSE PAGAMENTOS REPOSITORY
export class PagamentosRepository {
  private pool: Pool;
  //CONSTRUTOR DA CLASSE 
  constructor() {
    this.pool = Database.iniciarConexao();
  }

  //METODO QUE LISTA TODOS OS PAGAMENTOS
  public async listar_pagamentos(): Promise<Pagamentos[]> {
    const query = "SELECT * FROM PUBLIC.pagamentos";
    const result = await this.pool.query(query);
  }
}