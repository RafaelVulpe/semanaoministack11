const crypto  =  require('crypto');
const connection = require('../database/connection');

module.exports = {

    async Index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },    
    
    async Create(request, response) {
        // const params = resquest.query; /* buscar Query Params retorna os parametros nesse formato: { nome: 'Rafael', idade: '31' }  */
        // const params1 = request.params; /*Buscar Route params retorna apenas o parametro setado no recurso*/ 
        const { nome, email, whatsapp, cidade, uf} = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            cidade,
            uf,
        });
    
        return response.json({id});
    }
}
