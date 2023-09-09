const { Router } = require('express');

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


// Usuario
routes.get('/usuarios', async (req, res) => {
    try {
        return res.status(200).json(
            await usuario.buscar(req,res)
        );
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.post('/registro', async (req, res) => { // http://localhost:8080/registro
    try {
        const { nome, CPF, senha } = req.body;//!nome || !CPF || !senha
        
        return res.status(201).json(
            await usuario.registrar(req)
        );
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.delete('/perfil', async (req, res) => {
    try {
        const { nome, CPF, senha } = req.body;
        if (!nome || !CPF || !senha) {
            return res.status(400).json({
                error: 'Parâmetros inválidos'
            });
        }
        const usuarioExiste = await usuario.buscar(req);
        if (!usuarioExiste) {
            return res.status(404).json({
                error: 'Usuario não foi econtrad!'
            });
        }
        await usuario.deletar(req);
        return res.status(201).json({
            message: 'Usuario removid com sucess!'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.put('/perfil', async (req, res) => {
    try {
        await usuario.atualizar(req);
        return res.status(200).json({
            message: 'Usuario atualizada com sucess.'
        })
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});

// Escola
routes.get('/view/escola', async (req, res) => {
    try {
        return res.status(200).json(
            await escola.buscar(req,res)
        );
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.post('/control/escola', async (req, res) => {
    try {
        return res.status(201).json(
            await escola.create(req)
        );
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.delete('/control/escola', async (req, res) => {
    try {
        const existe = await escola.buscar(req);
        await escola.deletar(req);
        return res.status(200).json({
            message: 'Usuario removid com sucess!'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.put('/control/escola', async (req, res) => {
    try {
        await escola.atualizar(req);
        return res.status(200).json({
            message: 'Escola atualizada com sucess.'
        })
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});

// Departamento
routes.get('/view/departamento', async (req, res) => {
    try {
        return res.status(200).json(
            await departamento.buscar(req,res)
        );
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.post('/control/departamento', async (req, res) => {
    try {
        return res.status(201).json(
            departamento.registrar(req,res)
        );
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error} na rota`
        });
    }
});
routes.put('/control/departamento', async (req, res) => {
    try {
        await departamento.atualizar(req,res);
        return res.status(200).json({
            message: 'Departamento atualizada com sucesso.'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.delete('/control/departamento', async (req, res) => {
    try {
        await departamento.deletar(req);
        return res.status(200).json({
            message: 'Departamento removido com sucesso!'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});

// Evento
routes.get('/view/evento', async (req, res) => {
    try {
        return res.status(200).json(
            await evento.buscar(req,res)
        );
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.put('/control/evento', async (req, res) => {
    try {
        await evento.atualizar(req);
        return res.status(200).json({
            message: 'Evento atualizada com sucesso.'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.delete('/control/evento', async (req, res) => {
    try {
        await evento.deletar(req);
        return res.status(200).json({
            message: 'Evento removido com sucesso!'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.post('/control/evento', async (req, res) => {
    try {
        return res.status(201).json(
            evento.create(req)
        );
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});

// Funcionario
routes.get('/view/funcionario', async (req, res) => {
    try {
        return res.status(200).json(
            await funcionario.buscar(req,res)
        );
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.post('/control/funcionario', async (req, res) => {
    try {
        return res.status(201).json(
            funcionario.registrar(req,res)
        );
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error} (na rota)`
        });
    }
});
routes.put('/control/funcionario', async (req, res) => {
    try {
        await funcionario.atualizar(req,res);
        return res.status(200).json({
            message: 'Funcionario atualizado com sucesso.'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error} na rota`
        });
    }
});
routes.delete('/control/funcionario', async (req, res) => {
    try {
        await funcionario.deletar(req);
        return res.status(200).json({
            message: 'Funcionario removido com sucesso!'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});

module.exports = { routes };
