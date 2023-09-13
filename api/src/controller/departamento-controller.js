const { where } = require('sequelize');
const { DepartamentoModel } = require('../models/departamento-model');
const { EscolaModel } = require('../models/escola-model');


class DepartamentoController {
    async verify(request) {
        try {
            let errado = new Error()
            errado.status = 400
            const {
                id,
                nome,
                sala,
                escola
            } = request.body;
            if (!nome) {
                errado.message = `nome: undefined`
                throw errado
            }
            if (!sala) {
                errado.message = `sala: undefined`
                throw errado
            }
            if (!escola) {
                errado.message = `escola: undefined`
                throw errado
            }
            if (!Number.isInteger(escola)) {
                errado.message = `escola: undefined`
                throw errado
            }
            let school = await EscolaModel.count({where:{id:escola}})
            if (school == 0){
                errado.message = 'escola inexsistente'
                throw errado
            }

        } catch (error) {
            // Handle errors here
            error.message = `verificação > ${error.message}`
            throw error
        }

    };
    // put e post
    async registrar(request) {
        try {
            this.verify(request);
            await DepartamentoModel.create(request.body);
        } catch (error) {
            // Handle errors here
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
            error.message = `atualizar > ${error.message}`
            throw error
        }
    }
    // get e delete
    async deletar(request) {
        try {
            this.verify(request)
            const { id } = request.body;
            // Execute a exclusão usando os filtros
            if (!this.buscar(request)) throw new Error('Não encontrado')
            const result = await DepartamentoModel.destroy({
                where: { id: id },
            });
            
            if (result == 0){
                let errado = new Error()
                errado.status = 500
                errado.message = 'não deletado'
            } 
            // Retorne uma resposta apropriada, como um status de sucesso
            //.status(200).json({ message: `${result} Registros excluídos com sucesso` });
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
            error.message = `busca > ${error.message}`
            throw error
        }
    }
}



module.exports = { DepartamentoController };