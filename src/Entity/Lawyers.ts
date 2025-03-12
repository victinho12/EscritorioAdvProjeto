
//exportando para outros arquivos
export class Lawyers {
    //atributos da classe
  private id : number
  private name: string;
  private specialty: string;
  private Email: string;
  private telephone: number;
  private situation : string;
  
//construtor da classe
  constructor(
    id :number,
    name: string,
    specialty: string,
    email: string,
    telephone: number,
    situation: string
  ) {
    this.id = id
    this.name = name;
    this.specialty = specialty;
    this.Email = email;
    this.telephone = telephone;
    this.situation = situation
  }
}
