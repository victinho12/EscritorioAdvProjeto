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
  public async lista_pagamento(): Promise<Pagamentos[]> {
    const query = "SELECT * FROM PUBLIC.pagamentos order by id asc";
    const result = await this.pool.query(query);
    const listaPagamento: Pagamentos[] = [];
    for (let row of result.rows) {
      let pagamento = new Pagamentos(
         row.id_consulta,
         row.valor,
         row.data_pagamento,
         row.metodo_pagamento
      );
      listaPagamento.push(pagamento);
    }
    return listaPagamento;
  }
  
}