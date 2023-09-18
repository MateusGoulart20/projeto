const { Router } = require('express');

const { EscolaController } = require('./controller/escola');
const { DepartamentoController } = require('./controller/departamento');
const { EventoController } = require('./controller/evento');
const { FuncionarioController } = require('./controller/funcionario');
const { UsuarioController } = require('./controller/usuario');

const routes = Router();
const usuario = new UsuarioController();
const escola = new EscolaController();
const departamento = new DepartamentoController();
const evento = new EventoController();
const funcionario = new FuncionarioController();

// Autenticação
const { authMiddleware } = require('./middleware/auth-middleware');


routes.get('/', usuario.conexao);

// Usuario
routes.get('/usuarios', authMiddleware, async (request, response) => {
    try {
        lista = await usuario.buscar(request, response)
        return response.status(200).json(lista);
    } catch (error) {
        if (!error.status) error.status = 500;
        error.message = `get/usuarios > ${error.message}`
        return response.status(error.status).json({ error: error.message });
    }
});
routes.post('/registro', async (request, response) => { // http://localhost:8080/registro
    try {
        console.log('#post /registro');
        console.log(request.body);
        console.log(request.data);
        await usuario.registrar(request)
        return response.status(201).json({ message: 'sucess' });
    } catch (error) {
        if (!error.status) error.status = 500;
        error.message = `post /registro > ${error.message}`
        return response.status(error.status).json({ error: error.message });
    }
});
routes.post('/login', async (request, response) => {
    try {
        console.log('#post /login');
        //console.log(request);
        console.log(request.body);
        console.log(request.data);
        const retorne = await usuario.login(request);
        return response.status(201).json(retorne);
    } catch (error) {
        if (!error.status) error.status = 500;
        error.message = `get /login > ${error.message}`
        return response.status(error.status).json({ error: error.message });
    }
});
routes.delete('/perfil', authMiddleware, async (request, response) => {
    try {
        await usuario.deletar(request);
        return response.status(201).json({
            message: 'Usuario removid com sucess!'
        });
    } catch (error) {
        if (!error.status) error.status = 500;
        error.message = `delete /perfil > ${error.message}`
        return response.status(error.status).json({ error: error.message });
    }
});
routes.put('/perfil', authMiddleware, async (request, response) => {
    try {
        await usuario.atualizar(request);
        return response.status(201).json({
            message: 'Usuario atualizada com sucess.'
        })
    } catch (error) {
        if (!error.status) error.status = 500;
        error.message = `put /perfil > ${error.message}`
        return response.status(error.status).json({ error: error.message });
    }
});

// Escola
routes.get('/escola/media', authMiddleware,
    async (request, response) => {
        try {
            let retorno = await escola.media();
            return response.status(200).json(retorno);
        } catch (error) {
            if (!error.status) error.status = 500;
            error.message = `get /escola/media > ${error.message}`
            return response.status(error.status).json({ error: error.message });
        }
    });
routes.post('/escola/busca', authMiddleware,
    async (request, response) => {
        try {
            console.log(request.body)
            const retorne =await escola.buscar(request, response)
            return response.status(200).json(retorne);
        } catch (error) {
            if (!error.status) error.status = 500;
            error.message = `post /escola/busca > ${error.message}`
            return response.status(error.status).json({ error: error.message });
        }
    });
routes.post('/escola/crt', authMiddleware,
    async (request, response) => {
        try {
            return response.status(201).json(
                await escola.create(request)
            );
        } catch (error) {
            if (!error.status) error.status = 500;
            error.message = `post /escola/crt > ${error.message}`
            return response.status(error.status).json({ error: error.message });
        }
    });
routes.put('/escola/put', authMiddleware,
    async (request, response) => {
        try {
            await escola.atualizar(request);
            return response.status(200).json({
                message: 'Escola atualizada com sucess.'
            })
        } catch (error) {
            if (!error.status) error.status = 500;
            error.message = `put /escola/put > ${error.message}`
            return response.status(error.status).json({ error: error.message });
        }
    });
routes.put('/escola/del', authMiddleware,
    async (request, response) => {
        try {
            console.log('put /escola/del')
            const existe = await escola.buscar(request);
            await escola.deletar(request);
            return response.status(200).json({
                message: 'Usuario removid com sucess!'
            });
        } catch (error) {
            if (!error.status) error.status = 500;
            error.message = `put /escola/del > ${error.message}`
            return response.status(error.status).json({ error: error.message });
        }
    });

// Departamento
routes.get('/departamento/media', authMiddleware,
    async (request, response) => {
        try {
            //let retorno = await departamento.media();
            return response.status(200).json(retorno);
        } catch (error) {
            if (!error.status) error.status = 500;
            error.message = `get /departamento/media > ${error.message}`
            return response.status(error.status).json({ error: error.message });
        }
    });
routes.post('/departamento/busca', authMiddleware,
    async (request, response) => {
        try {
            const retorne = await departamento.buscar(request)
            return response.status(200).json(retorne);
        } catch (error) {
            if (!error.status) error.status = 500;
            error.message = `post /departamento/busca > ${error.message}`
            return response.status(error.status).json({ error: error.message });
        }
    });
routes.post('/departamento/crt', authMiddleware,
    async (request, response) => {
        try {
            let retorno = await departamento.registrar(request, response)
            return response.status(201).json(retorno);
        } catch (error) {
            if (!error.status) error.status = 500;
            error.message = `post /departamento/crt > ${error.message}`
            return response.status(error.status).json({ error: error.message });
        }
    });
routes.put('/departamento/put', authMiddleware,
    async (request, response) => {
        try {
            await departamento.atualizar(request);
            return response.status(200).json({
                message: 'Departamento atualizado com sucesso.'
            });
        } catch (error) {
            if (!error.status) error.status = 500;
            error.message = `put /departamento/put > ${error.message}`
            return response.status(error.status).json({ error: error.message });
        }
    });
routes.delete('/departamento/del', authMiddleware,
    async (request, response) => {
        try {
            await departamento.deletar(request);
            return response.status(200).json({
                message: 'Departamento removido com sucesso!'
            });
        } catch (error) {
            if (!error.status) error.status = 500;
            error.message = `put /departamento/del > ${error.message}`
            return response.status(error.status).json({ error: error.message });
        }
    });

// Evento
routes.get('/view/evento', authMiddleware,
    async (request, response) => {
        try {
            let list = await evento.buscar(request)
            return response.status(200).json(
                list
            );
        } catch (error) {
            if (!error.status) error.status = 500;
            error.message = `get /view/evento > ${error.message}`
            return response.status(error.status).json({ error: error.message });
        }
    });
routes.put('/control/evento', authMiddleware,
    async (request, response) => {
        try {
            await evento.atualizar(request);
            return response.status(200).json({
                message: 'Evento atualizada com sucesso.'
            });
        } catch (error) {
            if (!error.status) error.status = 500;
            error.message = `put /control/evento > ${error.message}`
            return response.status(error.status).json({ error: error.message });
        }
    });
routes.delete('/control/evento', authMiddleware,
    async (request, response) => {
        try {
            await evento.deletar(request);
            return response.status(200).json({
                message: 'Evento removido com sucesso!'
            });
        } catch (error) {
            if (!error.status) error.status = 500;
            error.message = `delete /control/evento > ${error.message}`
            return response.status(error.status).json({ error: error.message });
        }
    });
routes.post('/control/evento', authMiddleware,
    async (request, response) => {
        try {
            evento.create(request)
            return response.status(201).json(
                {message: 'Criado'}
            );
        } catch (error) {
            if (!error.status) error.status = 500;
            error.message = `post /control/evento > ${error.message}`
            return response.status(error.status).json({ error: error.message });
        }
    });

// Funcionario
routes.get('/view/funcionario', authMiddleware,
    async (request, response) => {
        try {
            return response.status(200).json(
                await funcionario.buscar(request, response)
            );
        } catch (error) {
            if (!error.status) error.status = 500;
            error.message = `get /view/funcionario > ${error.message}`
            return response.status(error.status).json({ error: error.message });
        }
    });
routes.post('/control/funcionario', authMiddleware,
    async (request, response) => {
        try {
            funcionario.registrar(request)
            return response.status(201).json({
                message: 'criado'
            });
        } catch (error) {
            return response.status(500).json({
                error: `Erro interno! ${error} (na rota)`
            });
        }
    });
routes.put('/control/funcionario', authMiddleware,
    async (request, response) => {
        try {
            await funcionario.atualizar(request);
            return response.status(200).json({
                message: 'Funcionario atualizado com sucesso.'
            });
        } catch (error) {
            if (!error.status) error.status = 500;
            error.message = `put /control/funcionario > ${error.message}`
            return response.status(error.status).json({ error: error.message });
        }
    });
routes.delete('/control/funcionario', authMiddleware, async (request, response) => {
    try {
        await funcionario.deletar(request);
        return response.status(200).json({
            message: 'Funcionario removido com sucesso!'
        });
    } catch (error) {
        if (!error.status) error.status = 500;
        error.message = `delete /control/funcionario > ${error.message}`
        return response.status(error.status).json({ error: error.message });
    }
});

module.exports = { routes };
