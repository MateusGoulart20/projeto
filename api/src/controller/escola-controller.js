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

        try {
            this.verify(request)
            const { id } = request.body;
            if (!this.buscar(request, response)) throw new Error('Não encontrado')
            result = await EscolaModel.destroy({
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
            const {
                id,
                nome,
                CNPJ,
                unidade_federativa,
                cidade,
                bairro,
                rua,
            } = request.body;
            let list = await EscolaModel.findAll();
            if (id) list = list.filter(item => item.id == id);
            if (nome) list = list.filter(item => item.nome == nome);
            if (CNPJ) list = list.filter(item => item.CNPJ == CNPJ);
            if (unidade_federativa) list = list.filter(item => item.unidade_federativa == unidade_federativa);
            if (cidade) list = list.filter(item => item.cidade == cidade);
            if (bairro) list = list.filter(item => item.bairro == bairro);
            if (rua) list = list.filter(item => item.rua == rua);

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