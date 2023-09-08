const { EscolaModel } = require('../models/escola-model');


class EscolaController {
    async verify(request) {
        try {
            const requiredFields = [
                'nome',
                'orcamento',
                'CNPJ',
                'numero_contato',
                'email_contato',
                'quantidade_professores',
                'quantidade_administrativos',
                'quantidade_tercerizados',
                'quantidade_estudantes',
                'quantidade_salas',
                'unidade_federativa',
                'cidade',
                'bairro',
                'rua',
                'numero_rua',
            ];
            for (const field of requiredFields) {
                if (request.body[field] === undefined) {
                    throw new Error(`${field}: undefined *`);
                }
            }
            const numericFields = [
                'quantidade_professores',
                'quantidade_administrativos',
                'quantidade_tercerizados',
                'quantidade_estudantes',
                'quantidade_salas',
            ];

            for (const field of numericFields) {
                if (!Number.isInteger(request.body[field])) {
                    throw new Error(`${field}: Not Integer`);
                }
            }

            if (!Number.isFinite(request.body.orcamento)) {
                throw new Error('orcamento: Not Number');
            }

            await EscolaModel.create(request.body);
        } catch (error) {
            // Handle errors here
            throw error;
        }

    };
    // put e post
    async create(request, response) {
        try {
            this.verify(request);
            await EscolaModel.create(request.body);
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
                orcamento,
                CNPJ,
                numero_contato,
                email_contato,
                quantidade_professores,
                quantidade_administrativos,
                quantidade_tercerizados,
                quantidade_estudantes,
                quantidade_salas,
                unidade_federativa,
                cidade,
                bairro,
                rua,
                numero_rua,
            } = request.body;
            EscolaModel.update(
                {
                    nome: nome,
                    orcamento: orcamento,
                    CNPJ: CNPJ,
                    numero_contato: numero_contato,
                    email_contato: email_contato,
                    quantidade_professores: quantidade_professores,
                    quantidade_administrativos: quantidade_administrativos,
                    quantidade_tercerizados: quantidade_tercerizados,
                    quantidade_estudantes: quantidade_estudantes,
                    quantidade_salas: quantidade_salas,
                    unidade_federativa: unidade_federativa,
                    cidade: cidade,
                    bairro: bairro,
                    rua: rua,
                    numero_rua: numero_rua,
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

        // Adicione os campos do request.body que deseja filtrar
        const fieldsToFilter = [
            'nome',
            'orcamento',
            'CNPJ',
            'numero_contato',
            'email_contato',
            'quantidade_professores',
            'quantidade_administrativos',
            'quantidade_tercerizados',
            'quantidade_estudantes',
            'quantidade_salas',
            'unidade_federativa',
            'cidade',
            'bairro',
            'rua',
            'numero_rua',
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



module.exports = { EscolaController };