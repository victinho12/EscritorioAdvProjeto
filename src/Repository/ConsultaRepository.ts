import { Pool } from "pg";
import { Consultas } from "../Entity/Consultas";
import { Database } from "./Database";



export class ConsultasRepository {
  private pool: Pool;


  constructor() {
    this.pool = Database.iniciarConexao();
  }


  public async listarConsultas(): Promise<Consultas[]> {
    const query = "SELECT * FROM PUBLIC.consultas";
    const result = await this.pool.query(query);

    const todasConsultas: Consultas[] = [];

    for (let row of result.rows) {
      console.log(row)
      let constultas = new Consultas(
        row.cpf_clientes, row.id_advogado, row.data_agendada, row.horario
      )
      todasConsultas.push(constultas)
    }
    return todasConsultas;
  }


  public async inserirConsulta(cpf_clientes, id_advogado, data_agendada, horario) {
    const query = "insert into public.consultas (cpf_clientes,id_advogado,data_agendada,horario) values ($1, $2, $3, $4)returning*"
    const result = [cpf_clientes, id_advogado, data_agendada, horario];
    const { rows } = await this.pool.query(query, result);
    return new Consultas(
      rows[0].cpf_clientes,
      rows[0].nome,
      rows[0].datanascimento,
      rows[0].observacoes
    )
  }


  public async buscar_consulta_para_Advogado(id_advogado: number): Promise<Consultas[]> {
    const query = "SELECT cpf_clientes, id_advogado, data_agendada ,horario from public.consultas where id_advogado = $1"
    const resultado = await this.pool.query(query, [id_advogado])

    const buscarConsultaAdv: Consultas[] = []

    for (let row of resultado.rows) {
      let Consulta = new Consultas(
        row.cpf_clientes,
        row.id_advogado,
        row.data_agendada,
        row.horario,
      );
      buscarConsultaAdv.push(Consulta);
    }
    return buscarConsultaAdv
  }


  public async buscar_consulta_Cliente(cpf: number): Promise<Consultas[]> {
    const query = "SELECT id_advogado , data_agendada, cpf_clientes ,horario from public.consultas where cpf_clientes = $1"
    const resultado = await this.pool.query(query, [cpf])

    const buscarConsultaCliente: Consultas[] = []

    for (let row of resultado.rows) {
      let Consulta = new Consultas(
        row.id_advogado,
        row.horario,
        row.data_agendada,
        row.cpf_clientes,
      );
      buscarConsultaCliente.push(Consulta);
    }
    return buscarConsultaCliente
  }


  public async deletar_consulta(id: number){
    const query = "delete from public.consultas where consultas.id = $1";
    const result = await this.pool.query(query, [id]);
    return result.rows;
  }
}