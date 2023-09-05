const { AlunoModel } = require('../model/aluno-model');
const { AlunoView } = require('../../src/view/aluno-view');

class AlunoController {
    async createAluno(nome, sexo, dataNascimento, curso, cursaEnsionSuperior, estagiando) {
        try {
            await AlunoModel.create({
                nome,
                sexo,
                dataNascimento,
                curso,
                cursaEnsionSuperior,
                estagiando
            });
            AlunoView.createSucess()
        } catch (error) {
            AlunoView.createFail(error);
        }
    }
    async deletar(alvo) {
        try {
            const result = await AlunoModel.destroy({ where: { nome: alvo }});
            if(result==0)
                AlunoView.deleteFail(Error("Aluno inexistente!"));
            AlunoView.deleteSucess();
        } catch (error) {
            AlunoView.deleteFail(error);
        }
    }
    async listar() {
        try {
            const result = await AlunoModel.findAll();
            AlunoView.listaSucess(result);
        } catch (error) {
            AlunoView.listaFail(error);
        }
    }
    async buscar(alvo) {
        try {
            const result = await AlunoModel.findByPk(alvo);
            if(result==null)
                AlunoView.buscaFail(Error("Aluno inexistente!"));
            AlunoView.buscaSucess(result);
        } catch (error) {
            AlunoView.buscaFail(error);
        }
    }
    async atualizar(alvo, op, change) {
        try {
            switch (op) {
                case 1:
                    AlunoModel.update(
                        { nome: change },
                        { where: { id: alvo } }
                    )
                    break;
                case 2:
                    AlunoModel.update(
                        { sexo: change },
                        { where: { id: alvo } }
                    )
                    break;
                case 3:
                    AlunoModel.update(
                        { dataNascimento: new Date(change) },
                        { where: { id: alvo } }
                    )
                    break;
                case 4:
                    AlunoModel.update(
                        { curso: change },
                        { where: { id: alvo } }
                    )
                    break;
                case 5:
                    AlunoModel.update(
                        { cursaEnsionSuperior: (change == 'S')?true:false },
                        { where: { id: alvo } }
                    )
                    break;
                case 6:
                    AlunoModel.update(
                        { estagiando: (change == 'S')?true:false },
                        { where: { id: alvo } }
                    )
                    break;
                default:
                    throw new Error('Opção inexistente!');
            }
            AlunoView.updateSucess();
            //return result;
        } catch (error) {
            AlunoView.updateFail(error);
        }
    }
}

module.exports = { AlunoController };