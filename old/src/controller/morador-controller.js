const { MoradorModel } = require('../model/morador-model');
const { MoradorView } = require('../view/morador-view');

class MoradorController {
    async createMorador(nome, cepi) {

        try {
            const a1 = await this.buscaEndereco(cepi);
            if (a1.error) throw new Error("Invalid");
            const cep = a1.cep;
            const logradouro = a1.logradouro;
            const complemento = a1.complemento;
            const bairro = a1.bairro;
            const localidade = a1.localidade;
            const uf = a1.uf;
            const ibge = a1.ibge;
            const ddd = a1.ddd;
            const siafi = a1.siafi;
            await MoradorModel.create({
                nome,
                cep,
                logradouro,
                complemento,
                bairro,
                localidade,
                uf,
                ibge,
                ddd,
                siafi,
            });
            MoradorView.createSucess()
        } catch (error) {
            MoradorView.createFail(error);
        }
    }
    async deletar(alvo) {
        try {
            const result = await MoradorModel.destroy({ where: { nome: alvo } });
            if (result == 0)
                MoradorView.deleteFail(Error("Morador inexistente!"));
            MoradorView.deleteSucess();
        } catch (error) {
            MoradorView.deleteFail(error);
        }
    }
    //*/
    //*
    async listar() {
        try {
            const result = await MoradorModel.findAll();
            MoradorView.listaSucess(result);
        } catch (error) {
            MoradorView.listaFail(error);
        }
    }
    //*/
    //*
    async buscar(entrada) {
        try {
            const result = await MoradorModel.findOne({ where: { nome: entrada } });
            if (result == null)
                MoradorView.buscaFail(Error("Morador inexistente!"));
            MoradorView.buscaSucess(result);
        } catch (error) {
            MoradorView.buscaFail(error);
        }
    }
    //*/
    //*
    async atualizar(antigo, novo) {
        try {
            const r = await MoradorModel.update({
                nome: novo,
            }, {
                where: { nome: antigo }
            });
            if(r==0)
                MoradorView.buscaFail(Error("Morador inexistente!"));
            MoradorView.updateSucess();
        } catch (error) {
            MoradorView.updateFail(error);
        }
    }
    //*/
    async buscaEndereco(cep) {
        try {
            const url = `https://viacep.com.br/ws/${cep}/json/`;
            const response = await fetch(url, { method: "GET" });
            const data = await response.json();
            return data;
        } catch (error) {
            MoradorView.invalid;
        }
    }
}

module.exports = { MoradorController };