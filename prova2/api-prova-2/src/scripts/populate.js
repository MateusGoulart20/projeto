require('../database');

const { MerendeiraModel } = require("../models/merendeira-model");
const { NotaFiscalModel } = require("../models/nota-fiscal-mode");
const { NutricionistaModel } = require("../models/nutricionista-model");

const nutricionistas = [
    {
        nome: 'Marcela',
        crn: '1255993'
    },
    {
        nome: 'Marta',
        crn: '1251231151'
    },
    {
        nome: 'Paula',
        crn: '09595903123'
    },
    {
        nome: 'Mariana',
        crn: '9093912912351'
    },
    {
        nome: 'João',
        crn: '858130818239015'
    },
    {
        nome: 'Paulo',
        crn: '95193905901231'
    },
    {
        nome: 'Luiza',
        crn: '413191923151'
    },
    {
        nome: 'Luana',
        crn: '51923900510931'
    },
    {
        nome: 'Maria',
        crn: '034534592309323'
    },
    {
        nome: 'Rafaela',
        crn: '8812937897598123'
    },
    {
        nome: 'Gabriela',
        crn: '9813889019239'
    },
];
const notasFiscais = [
    {
        cnpjFornecedor: '77.408.893/0001-33',
        data: '02/05/2019',
        valor: 1204.99
    },
    {
        cnpjFornecedor: '21.496.193/0001-93',
        data: '23/02/2000',
        valor: 50.99
    },
    {
        cnpjFornecedor: '86.801.418/0001-13',
        data: '10/01/2022',
        valor: 1200.99
    },
    {
        cnpjFornecedor: '90.757.146/0001-79',
        data: '13/10/2001',
        valor: 1230.00
    },
    {
        cnpjFornecedor: '77.408.893/0001-33',
        data: '20/12/2007',
        valor: 5000.99
    },
    {
        cnpjFornecedor: '77.408.893/0001-33',
        data: '20/09/2002',
        valor: 10.99
    },
    {
        cnpjFornecedor: '86.797.594/0001-29',
        data: '09/11/1990',
        valor: 120000.99
    },
    {
        cnpjFornecedor: '77.408.893/0001-33',
        data: '30/03/2004',
        valor: 150.50
    },
];
const merendeiras = [
    {
        nome: 'Maria',
    },
    {
        nome: 'Luiza',
    },
    {
        nome: 'Luana',
    },
    {
        nome: 'Paulo',
    },
    {
        nome: 'Paula',
    },
    {
        nome: 'Letícia',
    },
    {
        nome: 'Gabriela',
    },
    {
        nome: 'João',
    },
    {
        nome: 'Pedro',
    },
    {
        nome: 'Lucas',
    },
];

(async () => {
    try {
        await Promise.all([
            NutricionistaModel.bulkCreate(nutricionistas),
            NotaFiscalModel.bulkCreate(notasFiscais),
            MerendeiraModel.bulkCreate(merendeiras)
        ]);
        console.log('Banco de dados populado!')
    } catch (error) {
        console.error(error)
    }
})();
