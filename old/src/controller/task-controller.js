const { TaskModel } = require('../model/task-model');
const { UserModel } = require('../model/user-model');

class TaskController {
    async create(request, response){
        try {
            //console.log(request.body);
            const {responsavel, titulo, descricao, vencimento, status} = request.body;
            if(responsavel == undefined) throw Error("responsavel: undefined *");
            if(await UserModel.findByPk(responsavel) == undefined)
                throw Error("responsavel: not find in database *");
            if(titulo == undefined) throw Error("titulo: undefined *");
            if(descricao == undefined) throw Error("descricao: undefined")
            if(vencimento == undefined) throw Error("vencimento: undefined *");
            if(status == undefined) throw Error("status: undefined *");
           
            await TaskModel.create({
                responsavel, titulo, descricao, vencimento, status
            });
            return response.json({
                message: `Sucess: ${responsavel} / ${titulo} / ${descricao} / ${vencimento} / ${status} *`
            })
        } catch (error) {
            return response.json({
                message: `Falha: ${error}`
            })
        }
    }

    async find(request, response){
        try {
            const {id, responsavel, titulo, descricao, vencimento, status} = request.body;
            let list = await TaskModel.findAll();
            
            if(id != undefined){
                list = list.filter(item => item.id == id)
            }
            if(responsavel != undefined){
                list = list.filter(item => item.responsavel == responsavel)
            }
            if(titulo != undefined){
                list = list.filter(item => item.titulo == titulo)
            }
            if(descricao != undefined){
                list = list.filter(item => item.descricao == descricao)
            }
            if(vencimento != undefined){
                list = list.filter(item => item.vencimento == vencimento)
            }
            if(status != undefined){
                list = list.filter(item => item.status == status)
            }
            return response.json({
                list
            });
        } catch (error) {
            return response.json({
                message: `Falha: ${error}`
            })
        }
    }

    async update(request, response){
        try {
            const {id, responsavel, titulo, descricao, vencimento, status} = request.body;
            
            if(responsavel == undefined) throw Error("responsavel: undefined *");
            if(await UserModel.findByPk(responsavel) == undefined)
                throw Error("responsavel: not find in database *");
            if(titulo == undefined) throw Error("titulo: undefined *");
            if(descricao == undefined) throw Error("descricao: undefined")
            if(vencimento == undefined) throw Error("vencimento: undefined *");
            if(status == undefined) throw Error("status: undefined *");
            
            await TaskModel.update({
                responsavel, titulo, descricao, vencimento, status
            }, {
                where: { id: id }
            });
            return response.json({
                message: `Sucess!`
            });
        } catch (error) {
            return response.json({
                message: `Falha: ${error}`
            })
        }
    }

    async delete(request, response){
        try {
            const {id} = request.body;
            
            if(id == undefined) throw Error("id: undefined *");
            if(!Number.isInteger(id)) throw Error("id: not integer *");
            
            await TaskModel.destroy({where: { id: id }});
            return response.status(201).json({
                message: `Sucess!`
            });
        } catch (error) {
            return response.status(500).json({
                message: `Falha: ${error}`
            })
        }
    }
    
}

module.exports = { TaskController };