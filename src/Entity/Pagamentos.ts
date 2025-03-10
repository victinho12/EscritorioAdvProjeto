import { Consultas } from "./Consultas"

export class Pagamentos {
    private id_consulta: Consultas
    private valor: number
    private data_pagamento: Date
    private metodo_pagamento: string

    constructor(id_consulta: Consultas, valor: number, data_pagamento: Date, metodo_pagamento: string) {
        this.id_consulta = id_consulta
        this.valor = valor
        this.data_pagamento = data_pagamento
        this.metodo_pagamento = metodo_pagamento
    }
}