require('./database');

// npm install prompt-sync
const prompt = require('prompt-sync')({ sigint: true });


/* utilização do User
const { UserController } = require('./controller/user-controller');
const userController = new UserController();
const userName = prompt('Digite um nome: ');

(async () => {
    await userController.createUser(userName);
})();

//userController.createUser('Kleber')
//*/


//*
const { AlunoController } = require('./controller/aluno-controller');

// Usuario:
const alunoController = new AlunoController();
let x = true;
(async () => { try {
    while(x){
        switch (Number(prompt('\nDigite.. \n1-Incluir\n2-Alterar\n3-Excluir\n4-Todos\n5-Pesquisar\nOutro para sair.\n ?:'))) {
            case 1:
                await alunoController.createAluno(
                    prompt('\nNome: '),
                    prompt('\nSexo: '),
                    new Date(prompt('\nData (YYYY-MM-DD):')),
                    prompt('\nCurso:'),
                    prompt('\nSuperior? S/N') == 'S' ? true : false,
                    prompt('\nEstagio? S/N') == 'S' ? true : false
                );
                break;
            case 2:
                await alunoController.atualizar(
                    Number(prompt('\nDigite o id: ')),
                    Number(prompt('\nDigite:\n1-Nome\n2-Sexo\n3-Data de nascimento (YYYY-MM-DD)\n4-Curso\n5-Superior?(S/N)\n6-Estagio?(S/N)\n ?:')),
                    prompt('Insira a entrada: '))
                break;
            case 3:
                await alunoController.deletar(prompt('\nDigite o nome: '))
                break;
            case 4:
                await alunoController.listar()
                break;
            case 5:
                await alunoController.buscar(Number(prompt('\nDigite o id: ')))
                break;
        
            default:
                x = false;
                break;
        }
    }
} catch (error) { console.log(error); }})();



//*/
/*
const prompt = require('prompt-sync')({ sigint: true });

const TarefaController = require('./controllers/tarefa-controller');

// Usuário
const tarefaController = new TarefaController();

tarefaController.cadastrarTarefa(prompt('Digite o nome da tarefa: '));
tarefaController.listarTarefas();
*/