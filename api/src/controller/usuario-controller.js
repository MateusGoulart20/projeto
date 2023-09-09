const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { UsuarioModel } = require('../models/usuario-model');
const { where } = require('sequelize');


class UsuarioController {
    // utensilios
    async verify(request) {
        try {
            const { nome, CPF, senha } = request.body;
            if (!nome) throw new Error(`nome: undefined`);
            if (!CPF) throw new Error(`CPF: undefined`);
            if (!senha) throw new Error(`senha: undefined`);
        } catch (error) {
            // Handle errors here
            throw error;
        }

    };
    async existe(request, response) {
        this.verify(request)
        const {CPF} = request.body
        const usuario = await UsuarioModel.findOne({ where: { CPF:CPF } })
        console.log (usuario)
        if (usuario == null) {
            return 'Não Existe'
        } else {
            return 'Existe'
        }
    }
    async autentica(request, response){
        this.verify(request);
        this.existe(request,response)

        const {CPF, senha} = request.body
        const senhaHashed = await bcrypt.hash(senha, 10);
        const usuario = await UsuarioModel.findOne({ where: { CPF} })

        const isPasswordValid = await bcrypt.compare(senhaHashed, usuario.senha);
        if (isPasswordValid) {
            const token = jwt.sign(
                { id: usuario.id },
                "15129--09123-00asda-0-0131das",
                { expiresIn: '30m' }
            )
            return response.status(200).json({token})
        } else {
            return 'falhou'
        }
    }
    async sigin(request, response) {
        try {
            
            
            if(!await this.existe(request)) return response.status(400).json({
                error: 'Não existe'})
            
            // Verifica se a senha está correta
            const acessToken = await this.autentica(request,response)
            console.log(acessToken)
            if(acessToken != 'falhou') {
                console.log('Deu pau nessa coisa')
                return response.status(400).json({error: 'Não autentica'})
            }
            
            return response.status(200).json({ acessToken });
        } catch (error) {
            return response.status(500).json({
                error: `Erro interno: ${error}`
            });
        }
    }
    // put e post
    async registrar(request, response) {
        try {
            this.verify(request);
            const { nome, CPF, senha } = request.body;
            // Hash da senha antes de armazená-la
            const senhaHashed = await bcrypt.hash(senha, 10);

            if(await this.existe(request) == 'Existe')throw new Error('Existe')

            // Salve o usuário no "banco de dados"
            //users.push({ username, password: hashedPassword });
            await UsuarioModel.create({ nome, CPF, senha: senhaHashed });

        } catch (error) {
            // Handle errors here
            response.status(400).json({ error: error.message });
        }
    }
    async atualizar(request, response) {
        try {
            this.verify(request);
            const {
                id,
                nome,
                CPF,
                senha,
            } = request.body;
            await UsuarioModel.update(
                {
                    nome: nome,
                    CPF: CPF,
                    senha: senha,
                },
                { where: { id: id } }
            )
        } catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
    // get e delete
    async deletar(request, response) {
        //const filters = this.filters(request);

        try {
            // Execute a exclusão usando os filtros
            this.verify(request);
            const {
                id,
                nome,
                CPF,
                senha,
            } = request.body;
            if (!this.buscar(request, response)) throw new Error('Não encontrado')
            result = await UsuarioModel.destroy({
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
    async buscar(request, response) {
        try {
            const { id, nome, CPF, senha } = request.body;

            let list = await UsuarioModel.findAll();
            if (id) list = list.filter(item => item.id == id);
            if (nome) list = list.filter(item => item.nome == nome);
            if (CPF) list = list.filter(item => item.CPF == CPF);
            if (senha) list = list.filter(item => item.senha == senha);

            return list;

        } catch (error) {
            return response.json({
                message: `Falha: ${error}`
            })
        }
    }
}



module.exports = { UsuarioController };