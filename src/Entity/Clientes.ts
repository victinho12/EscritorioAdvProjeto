export class Cliente {
  //ATRIBUTOS DA CLASSE 
  private cpf: string;
  private nome: string;
  private datanascimento: string;
  private observacoes_cliente: string;
  //CONSTRUTOR DA CLASSE
  constructor(cpf: string, nome: string, datanascimento: string, observacoes_cliente: string) {
    this.cpf = cpf;
    this.nome = nome;
    this.datanascimento = datanascimento;
    this.observacoes_cliente = observacoes_cliente;
  }

}
