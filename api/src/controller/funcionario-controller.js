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
    numericFields = [
        'carga_horaria',
        'departamento',
    ]
    async verify(req) {
        try {
            if (!req.body) throw new Error(`Solicitação Vazia`);
            const {
                nome,
                CPF,
                cargo,
                grau_academico,
                carga_horaria,
                data_ingresso,
                data_egresso,
                departamento
            } = req.body;
            if (!nome) throw new Error(`nome: undefined`);
            if (!CPF) throw new Error(`CPF: undefined`);
            if (!cargo) throw new Error(`cargo: undefined`);
            if (!grau_academico) throw new Error(`grau_academico: undefined`);
            if (!carga_horaria) throw new Error(`carga_horaria: undefined`);
            if (!data_ingresso) throw new Error(`data_ingresso: undefined`);
            if (!departamento) throw new Error(`departamento: undefined`);

            if (!Number.isInteger(carga_horaria)) throw new Error(`carga_horaria: not integer`);

        } catch (error) {
            // Handle errors here
            throw new Error(`Erro na verificação: ${error.message}`);
        }

    };
    // put e post
    async registrar(req, response) {
        try {
            this.verify(req);
            await FuncionarioModel.create(req.body);
        } catch (error) {
            // Handle errors here
            response.status(400).json({ error: error.message + ' no criar' });
        }
    }
    async atualizar(req, response) {
        try {
            this.verify(req);
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
            } = req.body;
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
    async deletar(req, response) {
        try {
            this.verify(req);
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
            } = req.body;
            if (!this.buscar(req, response)) throw new Error('Não encontrado')
            result = await FuncionarioModel.destroy({
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
    async buscar(req, response) {
        try {
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
            } = req.body;

            let list = await FuncionarioModel.findAll();

            if (id) list = list.filter(item => item.id = id);
            if (nome) list = list.filter(item => item.nome = nome);
            if (CPF) list = list.filter(item => item.CPF = CPF);
            if (cargo) list = list.filter(item => item.cargo = cargo);
            if (grau_academico) list = list.filter(item => item.grau_academico = grau_academico);
            if (carga_horaria) list = list.filter(item => item.carga_horaria = carga_horaria);
            if (departamento) list = list.filter(item => item.departamento = departamento);
            
            return list;
        } catch (error) {
            return response.json({
                message: `Falha: ${error}`
            })
        }
    }
}



module.exports = { FuncionarioController };