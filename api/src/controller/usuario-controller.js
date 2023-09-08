const { UsuarioModel } = require('../models/usuario-model');


class UsuarioController {
    async verify(request) {
        try {
            const requiredFields = [
                'nome',
                'CPF',
                'senha',
            ];
            for (const field of requiredFields) {
                if (request.body[field] === undefined) {
                    throw new Error(`${field}: undefined *`);
                }
            }
            await UsuarioModel.create(request.body);
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
            UsuarioModel.update(
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
        const filters = this.filters(request);

        try {
            // Execute a exclusão usando os filtros
            const result = await UserModel.destroy({
                where: filters,
            });
            if (result == 0) response.status(200).json({ message: `inexistente` });
            // Retorne uma resposta apropriada, como um status de sucesso
            response.status(200).json({ message: `${result} Registros excluídos com sucesso` });
        } catch (error) {
            //.deleteFail(error);
        }
    }
    async buscar(request) {
        try {
            const filters = this.filters(request);

            // Faça a consulta usando os filtros
            let list = await UserModel.findAll({
                where: filters,
            });

            return list;

        } catch (error) {
            return response.json({
                message: `Falha: ${error}`
            })
        }
    }
    async filters(request) {
        const filters = {};

        // Adicione os campos do request.body que deseja filtrar
        const fieldsToFilter = [
            'nome',
            'CPF',
            'senha',
        ];

        // Crie um objeto de filtros com base nos campos presentes no request.body
        for (const field of fieldsToFilter) {
            if (request.body[field] !== undefined) {
                filters[field] = request.body[field];
            }
        }
        return filters
    }
}



module.exports = { UsuarioController };