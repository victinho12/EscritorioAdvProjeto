import { Consultas } from "./Consultas"

export class Pagamentos {
    //ATRIBUTOS DA CLASSE
    private id_pagamento: number
    private id_consulta: Consultas
    private valor: number
    private data_pagamento: string
    private metodo_pagamento: string
    //CONSTRUTOR DA CLASSE
    constructor(id_pagamento:number,id_consulta: Consultas, valor: number, data_pagamento: string, metodo_pagamento: string) {
        this.id_pagamento = id_pagamento
        this.id_consulta = id_consulta
        this.valor = valor
        this.data_pagamento = data_pagamento
        this.metodo_pagamento = metodo_pagamento
    }
}