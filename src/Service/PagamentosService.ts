import { PagamentosRepository } from "../Repository/PagamentosRepository";
import { ConsultasRepository } from "../Repository/ConsultaRepository";
import { Advogados } from "../Entity/Advogado";
import { Cliente } from "../Entity/Clientes";
import { Validacoes } from "../Util/Verificacoes";
import { Pagamentos } from "../Entity/Pagamentos";
import { Consultas } from "../Entity/Consultas";

export class PagamentosService {
    private repo: PagamentosRepository
    private repo_consulta: ConsultasRepository
    //CONSTRUTOR DA CLASSE
    constructor() {
        this.repo_consulta = new ConsultasRepository()
        this.repo = new PagamentosRepository()
    }


    public async listar_pagamento(): Promise<Pagamentos[]> {
        return await this.repo.lista_pagamento()
    }


    public async adicionar_pagamentos(id_consulta: number, valor: number, data_pagamento: Date, metodo_pagamento: string) {
        let id_consultas: Consultas[] = []
        id_consultas = await this.repo_consulta.buscar_consulta(id_consulta)
        if (valor <= 0) {
            throw new Error("Valor inválido")
        }
        if (id_consultas.length === 0) {
            throw new Error("Essa consulta não existe!!")
        }

        return await this.repo.adicionar_pagamento(id_consulta, valor, data_pagamento, (Validacoes.arrumar_texto(metodo_pagamento)))
    }


    public async buscar_pagamentos(id_consulta: number): Promise<Pagamentos[]> {
        let pagamentos: Pagamentos[] = []
        if (pagamentos.length === 0) {
            throw new Error("Id inválido")
        }
        return this.repo.pesquisar_pagamento(id_consulta)
    }


    public async deletar_pagamentos(id: number) {
        let pagamentos: Pagamentos[] = []
        pagamentos = await this.repo.pesquisar_pagamento(id)
        if (pagamentos.length === 0) {
            throw new Error("Esse pagamento não existe!!")
        }
        await this.repo.deletar_pagamento(id)
    }


    public async atualizar_id_consulta(id: number, id_consulta: number) {
        let pagamento_id = await this.buscar_pagamentos(id)
        let consulta_id = await this.repo_consulta.buscar_consulta(id_consulta)
        if (pagamento_id.length === 0) {
            throw new Error("Esse pagamento não existe!!")
        }
        if (consulta_id.length === 0) {
            throw new Error("Essa consulta não existe!!")
        }
        await this.repo.atualizar_id_consulta(id, id_consulta)
    }


    public async atualizar_valor_pagamento(id:number, valor:number){
        let pagamento_id = await this.buscar_pagamentos(id)
        if (pagamento_id.length === 0) {
            throw new Error("Esse pagamento não existe!!")
        }
        if (valor <= 0) {
            throw new Error("Valor inválido")
        }
        await this.repo.atualizar_valor_pagamento(id,valor)
    }


    public async atualizar_data_pagamento(id:number,data_pagamento:Date){
        let pagamento_id = await this.buscar_pagamentos(id)
        if (pagamento_id.length === 0) {
            throw new Error("Esse pagamento não existe!!")
        }

        await this.repo.atualizar_data_pagamento(id,data_pagamento)
    }


    public async atualizar_metodo_pagamento(id:number,metodo_pagamento:string){
        let pagamento_id = await this.buscar_pagamentos(id)
        if (pagamento_id.length === 0) {
            throw new Error("Esse pagamento não existe!!")
        }
        await this.repo.atualizar_metodo_pagamento(id,metodo_pagamento)
    }
}