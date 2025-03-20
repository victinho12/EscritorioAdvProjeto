import { PagamentosRepository } from "../Repository/PagamentosRepository";
import { Advogados } from "../Entity/Advogado";
import { Cliente } from "../Entity/Clientes";
import { Pagamentos } from "../Entity/Pagamentos";

export class PagamentosService{
     private repo: PagamentosRepository
    
        //CONSTRUTOR DA CLASSE
        constructor() {
            this.repo = new PagamentosRepository()
        }


    public async listar_pagamentos():Promise<Pagamentos[]>{
        return await this.listar_pagamentos()
    }
}