const express = require('express');
const cors = require('cors'); /** permissao de apenas um link poder acessar sua api ou qualquer uma se estiver vazia */

const routes = require('./routes');

const app = express();

app.use(cors());



app.use(express.json()); /* utilizado para que o body possa ser transformado em um objeto javascript e nao de a mensagem undefined */

app.use(routes);
/**
 * Tipos de parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na rota apos "?" usado para filtros, paginacao.
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisicao, utilizado para criar ou alterar recursos


*/



app.listen(3333);