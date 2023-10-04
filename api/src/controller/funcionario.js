const { FuncionarioModel } = require('../models/funcionario-model');
const { DepartamentoModel } = require('../models/departamento-model');

/*

            nome
            CPF
            cargo
            grau_academico
            carga_horaria
            data_ingresso
            data_egresso // just on delete
            departamento

*/

class FuncionarioController {
    requiredFields = [
        'nome',
        'CPF',
        'cargo',
        'grau_academico',
        'carga_horaria',
        'departamento',

    ];
    numericFields = [
        'carga_horaria',
        'departamento',
    ]
    async verify(req) {
        try {
            let errado = new Error()
            errado.status = 400
            if (!req.body) {
                errado.message = `Solicitação Vazia`
                throw errado
            }
            const {
                nome,
                CPF,
                cargo,
                grau_academico,
                carga_horaria,
                data_ingresso,
                departamento
            } = req.body;
            if (!nome) {
                errado.message = `nome: undefined`
                throw errado
            }
            if (!CPF) {
                errado.message = `CPF: undefined`
                throw errado
            }
            if (!cargo) {
                errado.message = `cargo: undefined`
                throw errado
            }
            if (!grau_academico) {
                errado.message = `grau_academico: undefined`
                throw errado
            }
            if (!carga_horaria) {
                errado.message = `carga_horaria: undefined`
                throw errado
            }
            /*f (!data_ingresso) {
                errado.message = `data_ingresso: undefined`
                throw errado
            }*/
            //console.log(data_ingresso)
            
            if (!departamento) {
                errado.message = `departamento: undefined`
                throw errado
            }

            if (!Number.isInteger(parseInt(carga_horaria))) {
                errado.message = `carga_horaria: not integer`
                throw errado
            }
            if (!Number.isInteger(parseInt(departamento))) {
                errado.message = `carga_horaria: not integer`
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
    async registrar(req) {
        try {
            this.verify(req);
            await FuncionarioModel.create(req.body);
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
                CPF,
                cargo,
                grau_academico,
                carga_horaria,
                departamento,
            } = req.body;
            FuncionarioModel.update(
                {
                    nome: nome,
                    CPF: CPF,
                    cargo: cargo,
                    grau_academico: grau_academico,
                    carga_horaria: carga_horaria,
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
            let errado = new Error()
            this.verify(req);
            const {
                id,
                nome,
                CPF,
                cargo,
                grau_academico,
                carga_horaria,
                data_ingresso,
                departamento,
            } = req.body;
            if (!this.buscar(req)) {
                errado.message = 'Não encontrado'
                throw errado
            }
            let result = await FuncionarioModel.destroy({
                where: {id: id}
            });
            if (!result) {
                errado.message = `não deletado`
                errado.status = 400
                throw error
            }
        } catch (error) {
            error.message = `deletar > ${error.message}`
            throw error
        }
    }
    async buscar(req) {
        try {
            const {
                id,
                nome,
                CPF,
                cargo,
                grau_academico,
                carga_horaria,
                departamento,
            } = req.body;

            let list = await FuncionarioModel.findAll();

            if (id) list = list.filter(item => item.id == id);
            if (nome) list = list.filter(item => item.nome.includes(nome));
            if (CPF) list = list.filter(item => item.CPF.includes(CPF));
            if (cargo) list = list.filter(item => item.cargo.includes(cargo));
            if (grau_academico) list = list.filter(item => item.grau_academico.includes(grau_academico));
            if (carga_horaria) list = list.filter(item => item.carga_horaria == carga_horaria);
            if (departamento) list = list.filter(item => item.departamento == departamento);

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
            let quantidade = await FuncionarioModel.count();
            return {
                quantidade
            };
        } catch (error) {
            error.message = `media > ${error.message}`
            throw error
        }
    }
}



module.exports = { FuncionarioController };