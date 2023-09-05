// View 
module.exports = class TarefaView {
  static mostrar(tarefa) {
    console.log(`ID: ${tarefa.id} - DESCRIÇÃO: ${tarefa.descricao}`);
  }
}
