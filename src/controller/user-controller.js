const { UserModel } = require('../model/user-model');

class UserController {
    async create(request, response){
        try {
            //console.log(request.body);
            const {id, email, nome} = request.body;
            
            if(id == undefined) throw Error("id: undefined *");
            if(!Number.isInteger(id)) throw Error("id: not integer *");
            if(email == undefined) throw Error("email: undefined *");
            if(nome == undefined) throw Error("nome: undefined *");
           
            await UserModel.create({
                id, nome, email
            });
            return response.json({
                message: `Sucess: ${nome} / ${email} / ${id} *`
            })
        } catch (error) {
            return response.json({
                message: `Falha: ${console.log(request.body)} \n${error}`
            })
        }
    }

    async find(request, response){
        try {
            const {nome, email, id} = request.body;
            
            let list = await UserModel.findAll();
            if(nome != undefined){
                list = list.filter(item => item.nome == nome)
            }
            if(id != undefined){
                list = list.filter(item => item.id == id)
            }
            if(email != undefined){
                list = list.filter(item => item.email == email)
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
            const {nome, email, id} = request.body;
            
            if(id == undefined) throw Error("id: undefined *");
            if(!Number.isInteger(id)) throw Error("id: not integer *");
            if(email == undefined) throw Error("email: undefined *");
            if(nome == undefined) throw Error("nome: undefined *");
            
            await UserModel.update({
                nome: nome,
                email: email,
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
            await UserModel.destroy({where: { id: id }});
            return response.json({
                message: `Sucess!`
            });
        } catch (error) {
            return response.json({
                message: `Falha: ${error}`
            })
        }
    }
    
}

module.exports = { UserController };