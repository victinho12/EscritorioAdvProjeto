export class Cliente {
  private cpf: string;
  private nome: string;
  private datanascimento: string;
  private observacoes_cliente: string; 
  
  constructor(cpf: string, nome: string, datanascimento: string, observacoes_cliente: string) {
    this.cpf = cpf;
    this.nome = nome;
    this.datanascimento = datanascimento;
    this.observacoes_cliente = observacoes_cliente;
  }

}
