export class Validacoes{

    //METODO USADO PARA ARRUMAR QUALQUER TIPO DE TEXTO
    static arrumar_texto(texto:string):string{
        return texto
        .trim()
        .toLowerCase() // victor, eduardo //
        .split(" ")
        .map(texto => texto.charAt(0).toLocaleUpperCase() + texto.slice(1))
        .join(" ")
    }

    // Método para validar e-mail
    static validar_email(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return regex.test(email);
    }

    // Método para validar CPF
    static validar_CPF(cpf: string): boolean {
        cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        let soma = 0, resto;
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[9])) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[10])) return false;

        return true;
    } 


   
    
    


}