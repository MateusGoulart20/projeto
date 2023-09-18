const { EventoModel } = require('../models/evento-model');
const { DepartamentoModel } = require('../models/departamento-model');


class EventoController {
    async verify(req) {
        try {
            let errado = new Error();
            errado.status = 400
            const {
                nome,
                local,
                comeco_evento,
                fim_evento,
                departamento
            } = req.body;
            if (!nome){
                errado.message = `nome: undefined`
                throw errado
            }
            if (!local){
                errado.message =`local: undefined`
                throw errado
            }
            if (!comeco_evento){
                errado.message =`comeco_evento: undefined`
                throw errado
            }
            if (!fim_evento){
                errado.message =`fim_evento: undefined`
                throw errado
            }
            if (!departamento){
                errado.message =`departamento: undefined`
                throw errado
            } 
            if (!Number.isInteger(parseInt(departamento))){
                errado.message =`departamento: not integer`
                throw errado
            } 
            let departament = await DepartamentoModel.count({where:{id:departamento}})
            if (departament == 0){
                errado.message = 'departamento inexsistente'
                throw errado
            }
        } catch (error) {
            error.message = `verificação > ${error.message}`
            throw error
        }
    };
    // put e post
    async create(req) {
        try {
            this.verify(req);
            await EventoModel.create(req.body);
        } catch (error) {
            error.message = `registrar > ${error.message}`
            throw error
        }
    }
    async atualizar(req) {
        try {
            this.verify(req);
            const {
                id,
                nome,
                comeco_evento,
                fim_evento,
                local,
                departamento,
            } = req.body;
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
            error.message = `atualizar > ${error.message}`
            throw error
        }
    }
    // get e delete
    async deletar(req) {
        try {
            this.verify(req)
            const { id } = req.body;
            // Execute a exclusão usando os filtros
            const result = await EventoModel.destroy({
                where: {id:id},
            });
            if (result == 0) {
                let errado = new Error();
                errado.status = 500
                errado.message = `inexistente`
            }
            // Retorne uma resposta apropriada, como um status de sucesso
        } catch (error) {
            error.message = `deletar > ${error.message}`
            throw error
        }
    }
    async buscar(req) {
        try {
            const {id,nome,local,departamento} = req.body
            console.log('buscando')
            // Faça a consulta usando os filtros
            let list = await EventoModel.findAll();
            if (id) list = list.filter(item => item.id == id);
            if (nome) list = list.filter(item => item.nome.includes(nome));
            if (local) list = list.filter(item => item.local.includes(local));
            if (departamento) list = list.filter(item => item.departamento == departamento);
            console.log('aaaa')
            //console.log(list)
            //console.log(list[0])
            //console.log(list[0].dataValues)
            
            return list;

        } catch (error) {
            error.message = `buscar > ${error.message}`
            throw error
            
        }
    }
    async media() {
        try {
            //let list = await EscolaModel.findAll();
            //let quantidade_professores = 0;
            //list.forEach(item => quantidade_professores += item.quantidade_professores);
            let quantidade = await EventoModel.count();
            return {
                quantidade
            };
        } catch (error) {
            error.message = `media > ${error.message}`
            throw error
        }
    }
}



module.exports = { EventoController };