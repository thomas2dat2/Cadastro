class Pessoa {
  constructor(nome, datanascimento) {
    this.nome = nome;
    this.dataNascimento = new Date(datanascimento);
  }

  calcularIdade() {
    const hoje = new Date();
    let idade = hoje.getFullYear() - this.dataNascimento.getFullYear();
    const diferenMes = hoje.getMonth() - this.dataNascimento.getMonth();
    const aniversarioAindaNaochegou =
    diferenMes < 0 ||
    (diferenMes === 0 && hoje.getDate() < this.dataNascimento.getDate());
     if (aniversarioAindaNaochegou) {
      idade--;
     }
     return idade;
  }
  toJSON() {
    return {
      nome: this.nome,
      dataNascimento: this.dataNascimento.toISOString().split('T')[0],
      idade: this.calcularIdade(),
    };
  }
}
module.exports = Pessoa;