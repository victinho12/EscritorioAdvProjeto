//IMPORTANDO O METODO POOL
import { Pool } from "pg";
//CRIANDO A CLASSE BANCO DE DADOS
export class Database {
  static pool: Pool;
  //METODO QUE INICIALIZA CONEXÃO COM O BANCO DE DADOS
  static iniciarConexao(): Pool {
    this.pool = new Pool({
      user: "postgres",
      password: "1234",
      host: "localhost",
      database: "martinsassociados",
      port: 5432,
    });

    return this.pool;
  }
}
