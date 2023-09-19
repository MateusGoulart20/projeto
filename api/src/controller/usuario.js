const { where } = require('sequelize');
const { UsuarioModel } = require('../models/usuario-model');
const { HttpHelper } = require('../utils/http-helper');

require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET;


class UsuarioController {
    verify(request) {
        try {
            let error = new Error();
            error.status = 400;
            if (!request) {
                error.message = 'request: undefined';
                throw error;
            }
            const { nome, CPF, senha } = request.body;
            if (!nome) {
                error.message = 'nome: undefined';
                throw error;
            }
            if (!CPF) {
                error.message = 'CPF: undefined';
                throw error;
            }
            if (!senha) {
                error.message = 'senha: undefined';
                throw error;
            }
        } catch (error) {
            error.message = `verificação > ${error.message}`;
            throw error;
        }
    };
    async existeID(request) {
        const { id } = request.body;
        if (!id) {
            let error = new Error();
            error.message = 'id: undefined';
            error.status = 400;
            throw error;
        }
        const existe = await UsuarioModel.findByPk(id)
        console.log(existe)
        return existe != null ? true : false;
    }
    async existeCPF(request) {
        const { CPF } = request.body;
        if (!CPF) {
            let error = new Error();
            error.message = 'CPF: undefined';
            error.status = 400;
            throw error;
        }
        const existe = await UsuarioModel.findOne({ where: { CPF } })
        console.log(existe)
        return existe == null ? true : false;
    }
    // put e post
    async registrar(request) {
        try {
            console.log('###\n' + request.body + '\n###')
            this.verify(request)
            // existencia
            if (false == await this.existeCPF(request)) {
                let error = new Error();
                error.status = 400;
                error.message = 'já existente'
                throw error
            }
            const passwordHashed = await bcrypt.hash(
                request.body.senha,
                Number(process.env.SALT)
            );
            if (!passwordHashed) {
                let errado = new Error();
                errado.message = 'Falha hash!';
                errado.status = 500;
                throw errado
            };
            request.body.senha = passwordHashed;
            await UsuarioModel.create(request.body);
        } catch (error) {
            error.message = `registrar > ${error.message}`
            throw error
        }
    }
    async atualizar(request) {
        try {
            console.log('###\n' + toString(request.body) + '\n###')
            this.verify(request);
            const {
                id,
                nome,
                CPF,
                senha,
            } = request.body;
            // existencia
            let a = await this.existeID(request)
            if (!a) {
                let error = new Error();
                error.status = 400;
                error.message = 'usuario inexistente'
                throw error
            }
            const passwordHashed = await bcrypt.hash(
                senha,
                Number(process.env.SALT)
            );
            if (!passwordHashed) {
                let errado = new Error();
                errado.message = 'Falha hash!';
                errado.status = 500;
                throw errado
            };
            let alteracoes = await UsuarioModel.update({
                nome: nome,
                CPF: CPF,
                senha: passwordHashed,
            },
                { where: { id: id } }
            )
            if (alteracoes == 0) {
                let error = new Error();
                error.status = 400;
                error.message = 'nenhuma alteracao feita'
                throw error
            }
        } catch (error) {
            error.message = `atualizar > ${error.message}`
            throw error
        }
    }
    // get e delete
    async deletar(request) {
        try {
            console.log(request.body)
            let id = request.body;
            
            if(id){
                console.log('recebimento: '+id)
                id = id.id
                console.log(id)
                await UsuarioModel.destroy({
                    where: {
                        id: id, // Specify the condition for the record(s) you want to delete
                    }
                });
            }else{

                let errado = new Error();
                errado.status = 400
                console.log("a")
                let isPasswordValid = false;
                let {CPF,senha,nome} = request.body;
                if(!CPF){
                    errado.message = 'CPF ausente'
                    throw new Error();
                } 
                if(!senha){
                    errado.message = 'senha ausente'
                    throw new Error();
                }
                if(!nome){
                    errado.message = 'nome ausente'
                    throw new Error();
                }
                let existe = await UsuarioModel.findAll();
                console.log(existe[0].dataValues)
                existe = existe[0].dataValues
                
                //if (existe.CPF) existe = existe.filter(item => item.CPF == CPF);
                //if (nome) existe = existe.filter(item => item.id == nome);
                //console.log(existe)
                //console.log(existe.senha)
                if(!existe){
                    errado.message = 'inexistente'
                    throw new Error();
                }
                if (existe) isPasswordValid = await bcrypt.compare(senha, existe.senha);            
                if (!isPasswordValid) {
                    errado.message = 'senha inválida'
                    throw new Error();
                }
    
                await UsuarioModel.destroy({
                    where: {
                        id: existe.id, // Specify the condition for the record(s) you want to delete
                    }
                });
            }
            

        } catch (error) {
            error.message = `deletar > ${error.message}`
            throw error
        }
    }
    async buscar(request) {
        try {
            const { id, nome, CPF, senha } = request.body;
            console.log(request.body)
            let list = await UsuarioModel.findAll();
            if (id) list = list.filter(item => item.id == id);
            if (nome) list = list.filter(item => item.nome == nome);
            if (CPF) list = list.filter(item => item.CPF == CPF);

            return list;

        } catch (error) {
            error.message = `busca > ${error.message}`
            throw error
        }
    }
    async buscarID(request) {
        try {
            console.log('request.body')
            console.log(request.body)
            const id = request.body.id;
            console.log("id: "+id)
            let list = await UsuarioModel.findAll({where:{id:id}});
            console.log(list)

            return list[0];

        } catch (error) {
            error.message = `busca > ${error.message}`
            throw error
        }
    }
    async login(request) {
        try {
            let errado = new Error();
            errado = 400;
            console.log(request.body)
            const { CPF, senha } = request.body;
            if(!CPF){
                errado.message = 'sem cpf'
                throw errado
            }
            if(!senha){
                errado.message = 'sem senha'
                throw errado
            }
            
            const passwordHashed = await bcrypt.hash(
                senha,
                Number(process.env.SALT)
            );
            if (!passwordHashed) {
                let errado = new Error();
                errado.message = 'Falha hash!';
                errado.status = 500;
                throw errado
            };

            // Verifica se usuário existe
            let userExists = await UsuarioModel.findOne({
                where: { CPF }
            });
            
            console.log(userExists)
            console.log("\n\n")
            if (!userExists) {
                let errado = new Error();
                errado.message = 'Usuario não existe!';
                errado.status = 500;
                throw errado
            }

            // Verifica se a senha está correta
            const isPasswordValid = await bcrypt.compare(senha, userExists.senha);
            console.log(passwordHashed)
            console.log(userExists.senha)
            if (!isPasswordValid) {
                let errado = new Error();
                errado.message = 'Senha Inválida';
                errado.status = 500;
                throw errado
            }
            // está funcioando
            console.log(userExists)
            console.log("INFORMAÇÕES DE USER EXISTS ACIMA")
            console.log(userExists.dataValues)
            userExists = userExists.dataValues
            if (userExists == null) return false
            console.log(userExists)
            console.log(userExists.id)
            const accessToken = jwt.sign(
                { id: userExists.id },
                tokenSecret,
                { expiresIn: '30m' }
            );
            let retornoGeral= {
                accessToken,
            }
            
            console.log("retornoGeral")
            console.log(retornoGeral, userExists.id)
            return {accessToken: accessToken, id: userExists.id}; // está retornando o token
        } catch (error) {
            error.message = `busca > ${error.message}`
            throw error
        }
    }
    async conexao(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const result = 'ok'
            return httpHelper.ok({ result });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}



module.exports = { UsuarioController };