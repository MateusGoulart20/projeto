require('./database');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { routes } = require('./routes');

const server = express();

server.use(express.json());
server.use(cors());
server.use(routes);

// Mude a porta se precisar
const porta = 8080;
server.listen(
    porta,
     () => {console.log(`API iniciada: http://localhost:${porta}`);}
);
