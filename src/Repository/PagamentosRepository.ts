//IMPORTANDO DADOS
import { Pool } from "pg";
import { Database } from "./Database";
import { Pagamentos } from "../Entity/Pagamentos";
import { Consultas } from "../Entity/Consultas";
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
        row.id_pagamento,
        row.id_consulta,
        row.valor,
        row.data_pagamento,
        row.metodo_pagamento
      );
      listaPagamento.push(pagamento);
    }
    return listaPagamento;
  }

  //METODO PARA ADICIONAR UM NOVO PAGAMENTO
  public async adicionar_pagamento(id_consulta:number, valor:number, data_pagamento:Date, metodo_pagamento:string) {
    const query = "insert into public.pagamentos (id_consulta,valor,data_pagamento, metodo_pagamento) values ($1, $2, $3, $4)returning* "
    const result = [id_consulta, valor, data_pagamento, metodo_pagamento];
    const { rows } = await this.pool.query(query, result);
    return new Pagamentos(
      rows[0].id_pagamento,
      rows[0].id_consulta,
      rows[0].valor,
      rows[0].data_pagamento,
      rows[0].metodo_pagamento,
    )
  }

  // METODO QUE PESQUISA PAGAMENTOS
  public async pesquisar_pagamento(id_consulta:number):Promise<Pagamentos[]>{
    const query = "SELECT id,id_consulta ,valor, data_pagamento, metodo_pagamento from public.pagamentos where id_consulta = $1"
    const resultado = await this.pool.query(query, [id_consulta])

    const buscar_pagamento: Pagamentos[] = []

    for (let row of resultado.rows) {
      let pagamento = new Pagamentos(
        row.id_pagamento,
        row.id_consulta,
        row.valor,
        row.data_pagamento,
        row.metodo_pagamento
      );
      buscar_pagamento.push(pagamento);
    }
    return buscar_pagamento
  }

  public async deletar_pagamento(){
    
  }

}