import { Pool } from "pg";
import { Database } from "./Database";
import { Pagamentos } from "../Entity/Pagamentos";

export class PagamentosRepository{
    private pool: Pool;

    constructor() {
      this.pool = Database.iniciarConexao();
    }


    public async listar_pagamentos(): Promise<Pagamentos[]> {
        const query = "SELECT * FROM PUBLIC.pagamentos";
        const result = await this.pool.query(query);
    }
}