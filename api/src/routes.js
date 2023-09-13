const { Router, response } = require('express');

const { EscolaController } = require('./controller/escola-controller');
const { DepartamentoController } = require('./controller/departamento-controller');
const { EventoController } = require('./controller/evento-controller');
const { FuncionarioController } = require('./controller/funcionario-controller');
const { UsuarioController } = require('./controller/usuario-controller');

const routes = Router();
const usuario = new UsuarioController();
const escola = new EscolaController();
const departamento = new DepartamentoController();
const evento = new EventoController();
const funcionario = new FuncionarioController();

// Autenticação
const { authMiddleware } = require('./middleware/auth-middleware');



// Usuario
routes.get('/usuarios', authMiddleware , async (req, res) => {
    try {
        lista = await usuario.buscar(req,res)
        return res.status(200).json(lista);
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `get/usuarios > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});
routes.post('/registro', async (req, res) => { // http://localhost:8080/registro
    try {
        await usuario.registrar(req)
        return res.status(201).json({message: 'sucess'});
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `post /registro > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});
routes.get('/login', async (req, res) => { // http://localhost:8080/registro
    try {
        return res.status(201).json(
            await usuario.login(req,res)
        );
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `post/ registro > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});
routes.delete('/perfil', async (req, res) => {
    try {
        await usuario.deletar(req);
        return res.status(201).json({
            message: 'Usuario removid com sucess!'
        });
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `delete /perfil > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});
routes.put('/perfil', async (req, res) => {
    try {
        await usuario.atualizar(req);
        return res.status(201).json({
            message: 'Usuario atualizada com sucess.'
        })
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `put /perfil > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});
routes.get('/login', async (req, res) => {
    try {
        lista = await usuario.login(req,res)
        return res.status(200).json(lista);
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `get/login > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});

// Escola
routes.get('/view/escola', escola.buscar);
/* async (req, res) => {
    try {
        return res.status(200).json(
            await escola.buscar(req,res)
        );
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `get /view/escola > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});*/
routes.post('/control/escola', escola.create);
/*async (req, res) => {
    try {
        return res.status(201).json(
            await escola.create(req)
        );
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `post /control/escola > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});*/
routes.delete('/control/escola', escola.deletar);
/*async (req, res) => {
    try {
        const existe = await escola.buscar(req);
        await escola.deletar(req);
        return res.status(200).json({
            message: 'Usuario removid com sucess!'
        });
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `delete  /control/escola > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});*/
routes.put('/control/escola', escola.atualizar);
/*async (req, res) => {
    try {
        await escola.atualizar(req);
        return res.status(200).json({
            message: 'Escola atualizada com sucess.'
        })
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `put /control/escola > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});*/

// Departamento
routes.get('/view/departamento', departamento.buscar);
/*async (req, res) => {
    try {
        return res.status(200).json(
            await departamento.buscar(req,res)
        );
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `get /view/departamento > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});*/   
routes.post('/control/departamento',departamento.registrar);
/*async (req, res) => {
    try {
        return res.status(201).json(
            departamento.registrar(req,res)
        );
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `post /control/departamento > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});*/
routes.put('/control/departamento',departamento.atualizar);
/*async (req, res) => {
    try {
        await departamento.atualizar(req,res);
        return res.status(200).json({
            message: 'Departamento atualizada com sucesso.'
        });
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `put /control/departamento > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});*/
routes.delete('/control/departamento',departamento.deletar);
/*async (req, res) => {
    try {
        await departamento.deletar(req);
        return res.status(200).json({
            message: 'Departamento removido com sucesso!'
        });
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `delete /control/departamento > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});*/

// Evento
routes.get('/view/evento',evento.buscar);
/*async (req, res) => {
    try {
        return res.status(200).json(
            await evento.buscar(req,res)
        );
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `get /view/evento > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});*/
routes.put('/control/evento',evento.atualizar);
/*async (req, res) => {
    try {
        await evento.atualizar(req);
        return res.status(200).json({
            message: 'Evento atualizada com sucesso.'
        });
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `put /control/evento > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});*/
routes.delete('/control/evento',evento.deletar);
/*async (req, res) => {
    try {
        await evento.deletar(req);
        return res.status(200).json({
            message: 'Evento removido com sucesso!'
        });
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `delete /control/evento > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});*/
routes.post('/control/evento',evento.create);
/*async (req, res) => {
    try {
        return res.status(201).json(
            evento.create(req)
        );
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `post /control/evento > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});*/

// Funcionario
routes.get('/view/funcionario',funcionario.buscar);
/*async (req, res) => {
    try {
        return res.status(200).json(
            await funcionario.buscar(req,res)
        );
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `get /view/funcionario > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});*/
routes.post('/control/funcionario',funcionario.registrar);
/*async (req, res) => {
    try {
        return res.status(201).json(
            funcionario.registrar(req,res)
        );
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error} (na rota)`
        });
    }
});*/
routes.put('/control/funcionario', funcionario.atualizar);
/*async (req, res) => {
    try {
        await funcionario.atualizar(req,res);
        return res.status(200).json({
            message: 'Funcionario atualizado com sucesso.'
        });
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `put /control/funcionario > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
});*/
routes.delete('/control/funcionario',funcionario.deletar);
/* async (req, res) => {
    try {
        await funcionario.deletar(req);
        return res.status(200).json({
            message: 'Funcionario removido com sucesso!'
        });
    } catch (error) {
        if(!error.status) error.status = 500;
        error.message = `delete /control/funcionario > ${error.message}`
        return res.status(error.status).json({error: error.message});
    }
}); */

module.exports = { routes };
