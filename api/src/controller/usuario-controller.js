const { UsuarioModel } = require('../models/usuario-model');


class UsuarioController {
    async verify(request) {
        try {
            const { nome, CPF, senha } = request.body;
            if (!nome) throw new Error(`nome: undefined`);
            if (!CPF) throw new Error(`CPF: undefined`);
            if (!senha) throw new Error(`senha: undefined`);
        } catch (error) {
            // Handle errors here
            throw error;
        }

    };
    // put e post
    async registrar(request, response) {
        try {
            this.verify(request);
            await UsuarioModel.create(request.body);
        } catch (error) {
            // Handle errors here
            response.status(400).json({ error: error.message });
        }
    }
    async atualizar(request, response) {
        try {
            this.verify(request);
            const {
                id,
                nome,
                CPF,
                senha,
            } = request.body;
            await UsuarioModel.update(
                {
                    nome: nome,
                    CPF: CPF,
                    senha: senha,
                },
                { where: { id: id } }
            )
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
    // get e delete
    async deletar(request, response) {
        //const filters = this.filters(request);

        try {
            // Execute a exclusão usando os filtros
            this.verify(request);
            const {
                id,
                nome,
                CPF,
                senha,
            } = request.body;
            if (!this.buscar(request, response)) throw new Error('Não encontrado')
            result = await UsuarioModel.destroy({
                where: {
                    id: id, // Specify the condition for the record(s) you want to delete
                }
            });
            if (result == 0) response.status(200).json({ message: `inexistente` });
            // Retorne uma resposta apropriada, como um status de sucesso
            response.status(200).json({ message: `${result} Registros excluídos com sucesso` });
        } catch (error) {
            //.deleteFail(error);
        }
    }
    async buscar(request, response) {
        try {
            const { id, nome, CPF, senha } = request.body;

            let list = await UsuarioModel.findAll();
            if (id) list = list.filter(item => item.id == id);
            if (nome) list = list.filter(item => item.nome == nome);
            if (CPF) list = list.filter(item => item.CPF == CPF);
            if (senha) list = list.filter(item => item.senha == senha);

            return list;

        } catch (error) {
            return response.json({
                message: `Falha: ${error}`
            })
        }
    }
}



module.exports = { UsuarioController };