const { DepartamentoModel } = require('../models/departamento-model');


class DepartamentoController {
    async verify(request) {
        try {
            const {
                id,
                nome,
                sala,
                escola
            } = request.body;
            if (!nome) throw new Error(`nome: undefined`);
            if (!sala) throw new Error(`sala: undefined`);
            if (!escola) throw new Error(`escola: undefined`);
            if (!Number.isInteger(escola)) throw new Error(`escola: not integer`);

        } catch (error) {
            // Handle errors here
            throw error;
        }

    };
    // put e post
    async registrar(request, response) {
        try {
            this.verify(request);
            await DepartamentoModel.create(request.body);
        } catch (error) {
            // Handle errors here
            response.status(400).json({ error: error.message+' ao registrar'});
        }
    }
    async atualizar(request, response) {
        try {
            this.verify(request);
            const {
                id,
                nome,
                sala,
                escola,
            } = request.body;
            DepartamentoModel.update(
                {
                    nome: nome,
                    sala: sala,
                    escola: escola,
                },
                { where: { id: id } }
            )
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
    // get e delete
    async deletar(request, response) {
        try {
            this.verify(request)
            const { id } = request.body;
            // Execute a exclusão usando os filtros
            if (!this.buscar(request, response)) throw new Error('Não encontrado')
            const result = await DepartamentoModel.destroy({
                where: {id:id},
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
            const {
                id,
                nome,
                sala,
                escola
            } = request.body;
            // Faça a consulta usando os filtros
            let list = await DepartamentoModel.findAll();
            if (id) list = list.filter(item => item.id == id);
            if (nome) list = list.filter(item => item.nome == nome);
            if (sala) list = list.filter(item => item.sala == sala);
            if (escola) list = list.filter(item => item.escola == escola);
            return list;

        } catch (error) {
            return response.json({
                message: `Falha: ${error}`
            })
        }
    }
}



module.exports = { DepartamentoController };