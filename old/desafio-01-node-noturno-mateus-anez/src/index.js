require('./database');

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
const { NotaFiscalController } = require('./controller/nota-fiscal-controller');

// Usuario:
const notaFiscalController = new NotaFiscalController();
let x = true, choice, a1, a2, a3;
(async () => { try {
    while(x){
        choice = Number(prompt('\nDigite.. \n1-Incluir\n2-Consultar\n3-Atualizar\n4-Excluir\n5-Listar\nOutro para sair.\n ?:'))
        switch (choice) {
            case 1:
                a1 = new Date(prompt('\nDigite a data (YYYY-MM-DD): '));
                a2 = Number(prompt('\nDigite o valor (real): '));
                a3 = prompt('\nDigite o cnpj (texto): ');
                await notaFiscalController.create( a1, a2, a3);
                break;
            case 2:
                a1 = Number(prompt('\nDigite o id: '));
                await notaFiscalController.read(a1);
                break;
            case 3:
                a1 = Number(prompt('\nDigite o id: '));
                a2 = Number(prompt('\nDigite.. \n1-Data (YYYY-MM-DD)\n2-Valor (real)\n3-CNPJ\n ?: '));
                a3 = prompt('\nA sua entrada: ');
                await notaFiscalController.update(a1,a2,a3);
                break;
            case 4:
                a1 = Number(prompt('\nDigite o id: '));
                await notaFiscalController.delete(a1);
                break;
            case 5:
                await notaFiscalController.list();
                break;
        
            default:
                x = false;
                break;
        }
    }
} catch (error) { //console.log(error); }})();