const { Router } = require('express');

const { DepartamentoModel } = require('./models/departamento-model');
const { EscolaModel } = require('./models/escola-model');
const { EventoModel } = require('./models/evento-model');
const { FuncionarioModel } = require('./models/funcionario-model');
const { UsuarioModel } = require('./models/usuario-model');

const routes = Router();

// Usuario
routes.get('/merendeiras', async (req, res) => {
    try {
        const merendeiras = await MerendeiraModel.findAll();
        return res.status(200).json(merendeiras);
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.post('/registro', async (req, res) => { // http://localhost:8080/registro
    try {
        const { nome, CPF, senha } = req.body;
        if (!nome || !CPF || !senha) {
            return res.status(400).json({
                error: 'Parâmetros inválidos'
            });
        }
        const merendeira = await UsuarioModel.create({ nome, CPF, senha });
        return res.status(201).json(merendeira);
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});

// Merendeira
routes.get('/perfil', async (req, res) => {
    try {
        const merendeiras = await UsuarioModel.findAll();
        return res.status(200).json(merendeiras);
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.delete('/merendeira/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const merendeiraExiste = await MerendeiraModel.findByPk(id);
        if (!merendeiraExiste) {
            return res.status(404).json({
                error: 'Merendeira não foi econtrada!'
            });
        }
        await MerendeiraModel.destroy({ where: { id } });
        return res.status(200).json({
            message: 'Merendeira removida com sucesso!'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.post('/merendeira', async (req, res) => {
    try {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({
                error: 'Parâmetros inválidos'
            });
        }
        const merendeira = await MerendeiraModel.create({ nome });
        return res.status(201).json(merendeira);
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.put('/merendeira/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome } = req.body;
        if (!id) {
            return res.status(400).json({
                error: 'Parâmetros inválidos'
            });
        }
        const merendeiraExiste = await MerendeiraModel.findByPk(id);
        if (!merendeiraExiste) {
            return res.status(404).json({
                error: 'Merendeira não foi econtrada!'
            });
        }
        await MerendeiraModel.update(
            { nome },
            { where: { id } }
        );
        return res.status(200).json({
            message: 'Merendeira atualizada com sucesso.'
        })
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});

// Nota Fiscal
routes.get('/notas-fiscais', async (req, res) => {
    try {
        const notasFiscais = await NotaFiscalModel.findAll();
        return res.status(200).json(notasFiscais);
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.delete('/nota-fiscal/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const notaFiscalExiste = await NotaFiscalModel.findByPk(id);
        if (!notaFiscalExiste) {
            return res.status(404).json({
                error: 'Nota Fiscal não foi econtrada!'
            });
        }
        await NotaFiscalModel.destroy({ where: { id } });
        return res.status(200).json({
            message: 'Nota Fiscal removida com sucesso!'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.post('/nota-fiscal', async (req, res) => {
    try {
        const { cnpjFornecedor, data, valor } = req.body;
        if (!cnpjFornecedor || !data || !valor) {
            return res.status(400).json({
                error: 'Parâmetros inválidos'
            });
        }
        const notaFiscal = await NotaFiscalModel.create({
            cnpjFornecedor, data, valor
        });
        return res.status(201).json(notaFiscal);
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.put('/nota-fiscal/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { cnpjFornecedor, data, valor } = req.body;
        if (!id) {
            return res.status(400).json({
                error: 'Parâmetros inválidos'
            });
        }
        const notaFiscalExiste = await NotaFiscalModel.findByPk(id);
        if (!notaFiscalExiste) {
            return res.status(404).json({
                error: 'Nota fiscal não foi encontrada.'
            });
        }
        await NotaFiscalModel.update(
            { cnpjFornecedor, data, valor },
            { where: { id } }
        );
        return res.status(200).json({
            message: 'Nota fiscal atualizada com sucesso.'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});

// Nutricionista
routes.get('/nutricionistas', async (req, res) => {
    try {
        const nutricionistas = await NutricionistaModel.findAll();
        return res.status(200).json(nutricionistas);
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.delete('/nutricionista/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const nutricionistaExiste = await NutricionistaModel.findByPk(id);
        if (!nutricionistaExiste) {
            return res.status(404).json({
                error: 'Nutricionista não foi econtrada!'
            });
        }
        await NutricionistaModel.destroy({ where: { id } });
        return res.status(200).json({
            message: 'Nutricionista removida com sucesso!'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.post('/nutricionista', async (req, res) => {
    try {
        const { nome, crn } = req.body;
        if (!nome || !crn) {
            return res.status(400).json({
                error: 'Parâmetros inválidos'
            });
        }
        const nutricionista = await NutricionistaModel.create({ nome, crn });
        return res.status(201).json(nutricionista);
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});
routes.put('/nutricionista/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, crn } = req.body;
        if (!id) {
            return res.status(400).json({
                error: 'Parâmetros inválidos'
            });
        }
        const nutricionistaExiste = await NutricionistaModel.findByPk(id);
        if (!nutricionistaExiste) {
            return res.status(404).json({
                error: 'Nutricionista não foi econtrada!'
            });
        }
        await NutricionistaModel.update(
            { nome, crn },
            { where: { id } }
        );
        return res.status(200).json({
            message: 'Nutricionista atualizada com sucesso.'
        });
    } catch (error) {
        return res.status(500).json({
            error: `Erro interno! ${error}`
        });
    }
});

module.exports = { routes };
