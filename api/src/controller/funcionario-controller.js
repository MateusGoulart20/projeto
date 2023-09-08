const { FuncionarioModel } = require('../models/funcionario-model');

/*

            nome
            CPF
            cargo
            grau_academico
            carga_horaria
            data_ingresso
            data_egresso
            departamento

*/

class FuncionarioController {
    requiredFields = [
        'nome',
        'CPF',
        'cargo',
        'grau_academico',
        'carga_horaria',
        'data_ingresso',
        'data_egresso',
        'departamento',

    ];
    async verify(request) {
        try {
            for (const field of requiredFields) {
                if (request.body[field] === undefined) {
                    throw new Error(`${field}: undefined *`);
                }
            }
            const numericFields = [
                'carga_horaria',
                'departamento',
            ];

            for (const field of numericFields) {
                if (!Number.isInteger(request.body[field])) {
                    throw new Error(`${field}: Not Integer`);
                }
            }


            await FuncionarioModel.create(request.body);
        } catch (error) {
            // Handle errors here
            throw error;
        }

    };
    // put e post
    async create(request, response) {
        try {
            this.verify(request);
            await FuncionarioModel.create(request.body);
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
                cargo,
                grau_academico,
                carga_horaria,
                data_ingresso,
                data_egresso,
                departamento,
            } = request.body;
            FuncionarioModel.update(
                {
                    nome: nome,
                    CPF: CPF,
                    cargo: cargo,
                    grau_academico: grau_academico,
                    carga_horaria: carga_horaria,
                    data_ingresso: data_ingresso,
                    data_egresso: data_egresso,
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
    async filters(request) {
        const filters = {};
        

        // Crie um objeto de filtros com base nos campos presentes no request.body
        for (const field of this.requiredFields) {
            if (request.body[field] !== undefined) {
                filters[field] = request.body[field];
            }
        }
        return filters
    }
}



module.exports = { FuncionarioController };