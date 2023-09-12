const { UsuarioModel } = require('../models/usuario-model');
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
            if (await this.existe(request)) {
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
            this.verify(request);
            const {
                id,
                nome,
                CPF,
                senha,
            } = request.body;
            // existencia
            if (false == await this.existeID(request)) {
                let error = new Error();
                error.status = 400;
                error.message = 'usuario inexistente'
                throw error
            }
            await UsuarioModel.destroy({
                where: {
                    id: id, // Specify the condition for the record(s) you want to delete
                }
            });

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
            if (senha) list = list.filter(item => item.senha == senha);

            return list;

        } catch (error) {
            error.message = `busca > ${error.message}`
            throw error
        }
    }
    async login(request) {
        try {
            this.verify(request)
            const { id, nome, CPF, senha } = request.body;
            console.log(request.body)
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
                where: { nome, CPF }
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
            const isPasswordValid = await bcrypt.compare(passwordHashed, userExists.senha);
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
            console.log("\n\n")
            if (userExists == null) return false
            //console.log("\n"+list.id)
            const accessToken = jwt.sign(
                { id: userExists.id },
                tokenSecret,
                { expiresIn: '30m' }
            );
            return accessToken; // está retornando o token
        } catch (error) {
            error.message = `busca > ${error.message}`
            throw error
        }
    }
}



module.exports = { UsuarioController };