require('./database');

// npm install prompt-sync
const prompt = require('prompt-sync')({ sigint: true });
const { MoradorController } = require('./controller/morador-controller');

// Usuario:
const moradorController = new MoradorController();
let x = true;
(async () => {
    try {
        while (x) {
            switch (Number(prompt('\nDigite.. \n1-Incluir\n2-Todos\n3-Buscar\n4-Deletar\n5-Alterar\nO-Para sair.\n ?:'))) {
                case 1:
                    await moradorController.createMorador(
                        prompt('\nNome: '),
                        prompt('\nCEP: '),
                    );
                    break;
                case 2:
                    await moradorController.listar()
                    break;
                case 3:
                    await moradorController.buscar(prompt('\nDigite o nome: '));
                    break;
                case 4:
                    await moradorController.deletar(prompt('\nDigite o nome: '))
                    break;
                case 5:
                    await moradorController.atualizar(
                        prompt('\nAntigo: '),
                        prompt('\nNovo: ')
                    );
                    break;//*/
                case 0:
                    x = false;
                    break;
            }
        }
    } catch (error) { //console.log(error); }
})();



//*/
/*
const prompt = require('prompt-sync')({ sigint: true });

const TarefaController = require('./controllers/tarefa-controller');

// Usuário
const tarefaController = new TarefaController();

tarefaController.cadastrarTarefa(prompt('Digite o nome da tarefa: '));
tarefaController.listarTarefas();
*/