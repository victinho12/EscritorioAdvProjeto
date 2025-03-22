import { PagamentosRepository } from "../Repository/PagamentosRepository";
import { Advogados } from "../Entity/Advogado";
import { Cliente } from "../Entity/Clientes";
import { Pagamentos } from "../Entity/Pagamentos";
import { Consultas } from "../Entity/Consultas";

export class PagamentosService {
    private repo: PagamentosRepository

    //CONSTRUTOR DA CLASSE
    constructor() {
        this.repo = new PagamentosRepository()
    }


    public async listar_pagamento(): Promise<Pagamentos[]> {
        return await this.repo.lista_pagamento()
    }


    public async adicionar_pagamentos(id_consulta: number, valor: number, data_pagamento: Date, metodo_pagamento: string) {
        return await this.repo.adicionar_pagamento(id_consulta, valor, data_pagamento, metodo_pagamento)
    }


    public async buscar_pagamentos(id_consulta: number): Promise<Pagamentos[]> {
        
        return this.repo.pesquisar_pagamento(id_consulta)
    }


    public async deletar_pagamentos(id: number) {
        await this.repo.deletar_pagamento(id)
    }


    public async atualizar_id_consulta(id: number, id_consulta: number) {
        await this.repo.atualizar_id_consulta(id, id_consulta)
    }


    public async atualizar_valor_pagamento(id:number, valor:number){
        await this.repo.atualizar_valor_pagamento(id,valor)
    }


    public async atualizar_data_pagamento(id:number,data_pagamento:Date){
        await this.repo.atualizar_data_pagamento(id,data_pagamento)
    }


    public async atualizar_metodo_pagamento(id:number,metodo_pagamento:string){
        await this.repo.atualizar_metodo_pagamento(id,metodo_pagamento)
    }
}