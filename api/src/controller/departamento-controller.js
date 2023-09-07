const { DepartamentoModel } = require('../models/departamento-model');


class DepartamentoController {
    async verify(request) {
        try {
            const requiredFields = [
                'nome',
                'sala',
                'escola',
            ];
            for (const field of requiredFields) {
                if (request.body[field] === undefined) {
                    throw new Error(`${field}: undefined *`);
                }
            }
            const numericFields = [
                'escola',
            ];

            for (const field of numericFields) {
                if (!Number.isInteger(request.body[field])) {
                    throw new Error(`${field}: Not Integer`);
                }
            }

            await DepartamentoModel.create(request.body);
        } catch (error) {
            // Handle errors here
            throw error;
        }

    };
    // put e post
    async createDepartamento(request, response) {
        try {
            this.verify(request);
            await DepartamentoModel.create(request.body);
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
        const filters = this.filters();
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
    async buscar(request, response) {
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
    async filters(request, response) {
        const filters = {};

        // Adicione os campos do request.body que deseja filtrar
        const fieldsToFilter = [
            'nome',
            'sala',
            'escola',
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



module.exports = { DepartamentoController };