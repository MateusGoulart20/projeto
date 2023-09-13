const { EventoModel } = require('../models/evento-model');


class EventoController {
    async verify(req) {
        try {
            const {
                nome,
                local,
                comeco_evento,
                fim_evento,
                departamento
            } = req.body;
            if (!nome) throw new Error(`nome: undefined`);
            if (!local) throw new Error(`local: undefined`);
            if (!comeco_evento) throw new Error(`comeco_evento: undefined`);
            if (!fim_evento) throw new Error(`fim_evento: undefined`);
            if (!departamento) throw new Error(`departamento: undefined`);
            if (!Number.isInteger(departamento)) throw new Error(`departamento: not integer`);
        } catch (error) {
            // Handle errors here
            throw error;
        }
    };
    // put e post
    async create(req) {
        try {
            this.verify(req);
            await EventoModel.create(req.body);
        } catch (error) {
            // Handle errors here
            if(!error.status)error.status = 500
            error.message = `inexistente`
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
            if(!error.status)error.status = 500
            error.message = `inexistente`
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
            //.deleteFail(error);
        }
    }
    async buscar(req) {
        try {
            const {id,nome,local,departamento} = req.body

            // Faça a consulta usando os filtros
            let list = await EventoModel.findAll();
            if (id) list = list.filter(item => item.id == id);
            if (nome) list = list.filter(item => item.nome == nome);
            if (local) list = list.filter(item => item.local == local);
            if (departamento) list = list.filter(item => item.departamento == departamento);

            return list;

        } catch (error) {
            
            if(!error.status)error.status = 500
            error.message = `inexistente`
            
        }
    }
}



module.exports = { EventoController };