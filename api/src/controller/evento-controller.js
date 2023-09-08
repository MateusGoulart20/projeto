const { EventoModel } = require('../models/evento-model');


class EventoController {
    async verify(request) {
        try {
            const requiredFields = [
                'nome',
                'comeco_evento',
                'fim_evento',
                'local',
                'departamento',
            ];
            for (const field of requiredFields) {
                if (request.body[field] === undefined) {
                    throw new Error(`${field}: undefined *`);
                }
            }

            await EventoModel.create(request.body);
        } catch (error) {
            // Handle errors here
            throw error;
        }


        for (const field of numericFields) {
            if (!Number.isInteger(request.body[field])) {
                throw new Error(`${field}: Not Integer`);
            }
        }

        if (!Number.isFinite(request.body.orcamento)) {
            throw new Error('orcamento: Not Number');
        }
    };
    // put e post
    async create(request, response) {
        try {
            this.verify(request);
            await EventoModel.create(request.body);
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
                comeco_evento,
                fim_evento,
                local,
                departamento,
            } = request.body;
            EventoModel.update(
                {
                    nome: nome,
                    comeco_evento: comeco_evento,
                    fim_evento: fim_evento,
                    local: local,
                    departamento: departamento,
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
                'comeco_evento',
                'fim_evento',
                'local',
                'departamento',
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



module.exports = { EventoController };