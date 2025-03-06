import { Pool } from "pg";
import { Consultas } from "../Entity/Consultas";
import { Database } from "./Database";


export class ConsultasRepository {
  private pool: Pool;


  constructor() {
    this.pool = Database.iniciarConexao();
  }
  public async listarConsultas():Promise<Consultas[]>{
    const query = "SELECT * FROM PUBLIC.consultas";
    const result = await this.pool.query(query);

    const todasConsultas: Consultas[] = [];

    for (let row of result.rows) {
      console.log(row)
      let constultas = new Consultas(
        row.cpf_clientes, row.data_agendada, row.horario, row.id_advogado
      )
      todasConsultas.push(constultas)
    }
    return todasConsultas;
  }

  public async inserirConsulta(){
    
  }
}
