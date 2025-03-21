//IMPORTANDO DADOS
import { Cliente } from "../Entity/Clientes";
import { Advogados } from "../Entity/Advogado";
import { Pool } from "pg";
import { Consultas } from "../Entity/Consultas";
import { Database } from "./Database";


//CLASSE CONSULTAS REPOSITORY
export class ConsultasRepository {
  private pool: Pool;

  //CONSTRUTOR DA CLASSE
  constructor() {
    this.pool = Database.iniciarConexao();
  }


  //METODO USADO PARA LISTAR TODAS AS CONSULTAS
  public async listarConsultas(): Promise<Consultas[]> {
    const query = "SELECT * FROM PUBLIC.consultas order by id asc";
    const result = await this.pool.query(query);

    const todasConsultas: Consultas[] = [];

    for (let row of result.rows) {
      let constultas = new Consultas(
        row.id, row.cpf_clientes, row.id_advogado, row.data_agendada, row.horario
      )
      todasConsultas.push(constultas)
    }
    return todasConsultas;
  }


  //METODOS USADOS PARA INSERIR CONSULTAS NO SISTEMA
  public async inserirConsulta(cpf_clientes: number, id_advogado: Advogados, data_agendada: Date, horario: Date) {
    const query = "insert into public.consultas (cpf_clientes,id_advogado,data_agendada,horario) values ($1, $2, $3, $4)returning*"
    const result = [cpf_clientes, id_advogado, data_agendada, horario];
    const { rows } = await this.pool.query(query, result);
    return new Consultas(
      rows[0].id_consulta,
      rows[0].cpf_clientes,
      rows[0].nome,
      rows[0].datanascimento,
      rows[0].observacoes
    )
  }


  //METODO USADO PARA BUSCAR CONSULTAS PARA RELATORIOS DE ADVOGADOS
  public async buscar_consulta_para_Advogado(id_advogado: number): Promise<Consultas[]> {
    const query = "SELECT id_consulta ,cpf_clientes, id_advogado, data_agendada ,horario from public.consultas where id_advogado = $1"
    const resultado = await this.pool.query(query, [id_advogado])

    const buscarConsultaAdv: Consultas[] = []

    for (let row of resultado.rows) {
      let Consulta = new Consultas(
        row.id_consulta,
        row.cpf_clientes,
        row.id_advogado,
        row.data_agendada,
        row.horario,
      );
      buscarConsultaAdv.push(Consulta);
    }
    return buscarConsultaAdv
  }


  //METODO USADO PARA BUSCAR CONSULTAS PARA RELATORIOS DE ADVOGADOS
  public async buscar_consulta_Cliente(cpf: number): Promise<Consultas[]> {
    const query = "SELECT id , data_agendada, cpf_clientes ,horario from public.consultas where cpf_clientes = $1"
    const resultado = await this.pool.query(query, [cpf])

    const buscarConsultaCliente: Consultas[] = []

    for (let row of resultado.rows) {
      let Consulta = new Consultas(
        row.id_consulta,
        row.cpf_clientes,
        row.id_advogado,
        row.data_agendada,
        row.horario,
      );
      buscarConsultaCliente.push(Consulta);
    }
    return buscarConsultaCliente
  }


  //METODO USADO PARA EXCLUIR CONSULTAS
  public async deletar_consulta(id: number) {
    const query = "delete from public.consultas where consultas.id = $1";
    const result = await this.pool.query(query, [id]);
    return result.rows;
  }

  //METODO USADO PARA MUDAR O CPF DO CLIENTE
  public async mudar_cpf_cliente(cpf: string, cpf2: string) {
    const query = "UPDATE public.consultas SET cpf_clientes = $2 WHERE cpf_clientes = $1 "
    const result = await this.pool.query(query, [cpf, cpf2])
    return result.rows
  }

  //METODO USADO PARA MUDAR O ID DO ADVOGADO
  public async mudar_advogado(id: number, id_advogados2: number) {
    const query = "UPDATE public.consultas SET id_advogado = $2 WHERE id = $1 "
    const result = await this.pool.query(query, [id, id_advogados2])
    return result.rows
  }


  // METODO QUE MUDA A DATA DA CONSULTA
  public async mudar_data(id: number, data_agendada: Date) {
    const query = "update public.consultas set data_agendada = $2 where id = $1 "
    const result = await this.pool.query(query, [id, data_agendada])
  }

  //METODO USADO PARA MUDAR O HORARIO DA CONSULTA
  public async mudar_horario(id: number, horario: Date) {
    const query = "UPDATE public.consultas SET horario = $2 WHERE id = $1 "
    const result = await this.pool.query(query, [id, horario])
    return result.rows
  }


}