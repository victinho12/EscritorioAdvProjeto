
//exportando para outros arquivos
export class Advogados {
  //atributos da classe
  private id: number
  private nome: string;
  private Especialidade: string;
  private Email: string;
  private Telefone: number;
  private situacao: string;

  //construtor da classe
  constructor(
    id: number,
    nome: string,
    especialidade: string,
    email: string,
    telefone: number,
    situacao: string
  ) {
    this.id = id
    this.nome = nome;
    this.Especialidade = especialidade;
    this.Email = email;
    this.Telefone = telefone;
    this.situacao = situacao
  }
}
