const { NotaFiscalModel } = require('../model/nota-fiscal-model');
const { NotaFiscalView } = require('../view/nota-fiscal-view');

class NotaFiscalController {
    async create(data, valor, cnpj_fornecedor) {
        try {
            await NotaFiscalModel.create({
                data, valor, cnpj_fornecedor
            });
            NotaFiscalView.createSucess()
        } catch (error) {
            NotaFiscalView.createFail(error);
        }
    }
    async list() {
        try {
            NotaFiscalView.listaSucess(await NotaFiscalModel.findAll());
        } catch (error) {
            NotaFiscalView.listaFail(error);
        }
    }
    async read(alvo) {
        try {
            const result = await NotaFiscalModel.findByPk(alvo);
            if (result == null){
                NotaFiscalView.notFind();
                return;
            }
            NotaFiscalView.buscaSucess(result);
        } catch (error) {
            NotaFiscalView.buscaFail(error);
        }
    }
    async update(alvo, op, change) {
        let ret;
        try {
            switch (op) {
                case 1:
                    result = NotaFiscalModel.update(
                        { data: new Date(change) },
                        { where: { id: alvo } }
                    )
                    break;
                case 2:
                    result = NotaFiscalModel.update(
                        { valor: Number(change) },
                        { where: { id: alvo } }
                    )
                    break;
                case 3:
                    result = NotaFiscalModel.update(
                        { cnpj_fornecedor: change},
                        { where: { id: alvo } }
                    )
                    break;
                default:
                    throw new Error('Opção inexistente!');
            }
            if (result == 0)
                NotaFiscalView.notFind();
            NotaFiscalView.updateSucess();
        } catch (error) {
            NotaFiscalView.updateFail(error);
        }
    }
    async delete(alvo) {
        try {
            const result = await NotaFiscalModel.destroy({ where: { id: alvo } });
            if (result == 0)
                NotaFiscalView.notFind();
            NotaFiscalView.deleteSucess();
        } catch (error) {
            NotaFiscalView.deleteFail(error);
        }
    }
}

module.exports = { NotaFiscalController };