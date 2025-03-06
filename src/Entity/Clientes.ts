export class Cliente {
  private cpf: string;
  private nome: string;
  private datanascimento: string;
  private observacoes: string; 
  constructor(cpf: string, nome: string, datanascimento: string, observacoes: string) {
    this.cpf = cpf;
    this.nome = nome;
    this.datanascimento = datanascimento;
    this.observacoes = observacoes;
  }


  
}
