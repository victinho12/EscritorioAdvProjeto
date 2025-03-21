import { PagamentosRepository } from "../Repository/PagamentosRepository";
import { Advogados } from "../Entity/Advogado";
import { Cliente } from "../Entity/Clientes";
import { Pagamentos } from "../Entity/Pagamentos";
import { Consultas } from "../Entity/Consultas";

export class PagamentosService{
     private repo: PagamentosRepository
    
        //CONSTRUTOR DA CLASSE
        constructor() {
            this.repo = new PagamentosRepository()
        }


    public async listar_pagamento():Promise<Pagamentos[]>{
        return await this.repo.lista_pagamento()
    }


    public async adicionar_pagamentos(id_consulta:number, valor:number, data_pagamento:Date, metodo_pagamento:string){
        return await this.repo.adicionar_pagamento(id_consulta, valor, data_pagamento, metodo_pagamento)
    }


    public async buscar_pagamentos(id_consulta:number):Promise<Pagamentos[]>{
        return this.repo.pesquisar_pagamento(id_consulta)
    }
}