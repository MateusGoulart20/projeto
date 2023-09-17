const { EscolaModel } = require('../models/escola-model');


class EscolaController {
    async verify(request) {
        try {
            let errado = new Error();
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
                    errado.message = `${field}: undefined *`
                    throw errado
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
                    errado.message = `${field}: Not Integer`
                    throw errado
                }
            }

            if (!Number.isFinite(request.body.orcamento)) {
                errado.message = 'orcamento: Not Number'
                throw errado
            }
        } catch (error) {
            error.status = 400;
            error.message = `verificação > ${error.message}`
            throw error
        }

    };
    // put e post
    async create(request) {
        try {
            this.verify(request);
            await EscolaModel.create(request.body);
        } catch (error) {
            error.message = `registrar > ${error.message}`
            throw error
        }
    }
    async atualizar(request) {
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
            error.message = `atualizar > ${error.message}`
            throw error
        }
    }
    // get e delete
    async deletar(request) {
        try {
            this.verify(request)
            const { id } = request.body;
            if (!this.buscar(request)) throw new Error('Não encontrado')
            result = await EscolaModel.destroy({
                where: {
                    id: id, // Specify the condition for the record(s) you want to delete
                }
            });
            if (result == 0) {
                let errado = new Error();
                errado.status = 500;
                errado.message = `inexistente`
            }
        } catch (error) {
            error.message = `deletar > ${error.message}`
            throw error
        }
    }
    async buscar(request) {

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
            error.message = `buscar > ${error.message}`
            throw error
        }


    }
    async media() {

        try {
            let list = await EscolaModel.findAll();
            let quantidade_professores = 0;
            list.forEach(item => quantidade_professores += item.quantidade_professores);
            let quantidade_administrativos = 0;
            list.forEach(item => quantidade_administrativos += item.quantidade_administrativos);
            let quantidade_tercerizados = 0;
            list.forEach(item => quantidade_tercerizados += item.quantidade_tercerizados);
            let quantidade_estudantes = 0;
            list.forEach(item => quantidade_estudantes += item.quantidade_estudantes);
            let quantidade_salas = 0;
            list.forEach(item => quantidade_salas += item.quantidade_salas);
            let quantidade = await EscolaModel.count();

            return {
                quantidade,
                quantidade_professores,
                quantidade_administrativos,
                quantidade_tercerizados,
                quantidade_estudantes,
                quantidade_salas
            };

        } catch (error) {
            error.message = `media > ${error.message}`
            throw error
        }


    }
}



module.exports = { EscolaController };