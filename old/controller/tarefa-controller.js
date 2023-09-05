const TarefaModel = require('../model/tarefa-model');
const TarefaView = require('../view/tarefa-view');

// Controller
module.exports = class TarefaController {
  constructor() {
    this.tarefas = [];
    this.id = 1;
  }

  cadastrarTarefa(descricao) {
    const tarefa = new TarefaModel({ id: this.id, descricao });
    this.tarefas.push(tarefa);
    this.id += 1;
  }

  listarTarefas() {
    this.tarefas.forEach((tarefa) => TarefaView.mostrar(tarefa));
  }
}
