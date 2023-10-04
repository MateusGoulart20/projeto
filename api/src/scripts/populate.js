require("../database");

const { EstadoModel } = require("../models/estado-model");


const estados = [
    { nome: "AC" },
    { nome: "AL" },
    { nome: "AP" },
    { nome: "AM" },
    { nome: "BA" },
    { nome: "CE" },
    { nome: "DF" },
    { nome: "ES" },
    { nome: "GO" },
    { nome: "MA" },
    { nome: "MT" },
    { nome: "MS" },
    { nome: "MG" },
    { nome: "PA" },
    { nome: "PB" },
    { nome: "PR" },
    { nome: "PE" },
    { nome: "PI" },
    { nome: "RJ" },
    { nome: "RN" },
    { nome: "RS" },
    { nome: "RO" },
    { nome: "RR" },
    { nome: "SC" },
    { nome: "SP" },
    { nome: "SE" },
    { nome: "TO" },
];
/*
(async () => {
    for (let estado of estados) {
        await EstadoModel.create({
            nome: estado.nome,
        });
    }
    console.log("Estado cadastrado!");
})();
//*///*
(async () => {
        await EstadoModel.create(
            { nome: "Uruguai" }
        );
    console.log("Estado cadastrado!");
})();//*/
