const { Router } = require('express');

const { EscolaController } = require('./controller/escola-controller');
const { DepartamentoController } = require('./controller/departamento-controller');
const { EventoController } = require('./controller/evento-controller');
const { FuncionarioController } = require('./controller/funcionario-controller');
const { UsuarioController } = require('./controller/usuario-controller');

const routes = Router();



// Usuario
routes.get('/usuarios', async (req, res) => {
    try {
        return res.status(200).json(
            await UsuarioController.buscar(req.body)
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
        if (UsuarioController.verify(req.body)) {
            return res.status(400).json({
                error: 'Parâmetros inválidos'
            });
        }
        return res.status(201).json(
            await UsuarioController.registrar(req.body)
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
        const usuarioExiste = await UsuarioController.buscar(req.body);
        if (!usuarioExiste) {
            return res.status(404).json({
                error: 'Usuario não foi econtrad!'
            });
        }
        await UsuarioController.delete(req.body);
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
        const { nome, CPF, senha } = req.body;
        if (!nome || !CPF || !senha) {
            return res.status(400).json({
                error: 'Parâmetros inválidos'
            });
        }
        const usuarioExiste = await UsuarioController.buscar(req.body);
        if (!usuarioExiste) {
            return res.status(404).json({
                error: 'Usuario não foi econtrad!'
            });
        }
        await UsuarioController.update(req.body);
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
            await EscolaController.buscar(req.body)
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
            await EscolaController.create(req.body)
        );
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.delete('/control/escola', async (req, res) => {
    try {
        const usuarioExiste = await EscolaController.buscar(req.body);
        if (!usuarioExiste) {
            return res.status(404).json({
                error: 'Usuario não foi econtrad!'
            });
        }
        await EscolaController.delete(req.body);
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
        const usuarioExiste = await EscolaController.buscar(req.body);
        if (!usuarioExiste) {
            return res.status(404).json({
                error: 'Usuario não foi econtrad!'
            });
        }
        await EscolaController.update(req.body);
        return res.status(200).json({
            message: 'Usuario atualizada com sucess.'
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
            await DepartamentoController.buscar(req.body)
        );
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.put('/control/departamento', async (req, res) => {
    try {
        if (!(await DepartamentoController.buscar(req.body))) {
            return res.status(404).json({
                error: 'Departamento não encontrado.'
            });
        }
        await DepartamentoController.update(req.body);
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
        if (!(await DepartamentoController.buscar(req.body))) {
            return res.status(404).json({
                error: 'Departamento não encontrado.'
            });
        }
        await DepartamentoController.delete(req.body);
        return res.status(200).json({
            message: 'Departamento removido com sucesso!'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.post('/control/departamento', async (req, res) => {
    try {
        return res.status(201).json(
            NotaFiscalController.create(req.body)
        );
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
            await EventoController.buscar(req.body)
        );
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.put('/control/evento', async (req, res) => {
    try {
        if (!(await EventoController.buscar(req.body))) {
            return res.status(404).json({
                error: 'Evento não encontrado.'
            });
        }
        await EventoController.update(req.body);
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
        if (!(await EventoController.buscar(req.body))) {
            return res.status(404).json({
                error: 'Evento não encontrado.'
            });
        }
        await EventoController.delete(req.body);
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
            EventoController.create(req.body)
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
            await FuncionarioController.buscar(req.body)
        );
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.put('/control/funcionario', async (req, res) => {
    try {
        if (!(await FuncionarioController.buscar(req.body))) {
            return res.status(404).json({
                error: 'Funcionario não encontrado.'
            });
        }
        await FuncionarioController.update(req.body);
        return res.status(200).json({
            message: 'Funcionario atualizada com sucesso.'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.delete('/control/funcionario', async (req, res) => {
    try {
        if (!(await FuncionarioController.buscar(req.body))) {
            return res.status(404).json({
                error: 'Funcionario não encontrado.'
            });
        }
        await FuncionarioController.delete(req.body);
        return res.status(200).json({
            message: 'Funcionario removido com sucesso!'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.post('/control/funcionario', async (req, res) => {
    try {
        return res.status(201).json(
            FuncionarioController.create(req.body)
        );
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});

module.exports = { routes };
