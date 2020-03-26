const connection = require('../database/connection');

module.exports = {
    async Index(request, response) {
        const { page = 1 } = request.query;
        
         const [count] = await connection('casos').count(); /** traz a quantidade de registros */

        const casos = await connection('casos')
            .join('ongs', 'ongs.id', '=', 'casos.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['casos.*',
                     'ongs.nome',
                     'ongs.email',
                     'ongs.whatsapp',
                     'ongs.cidade',
                     'ongs.uf']);
        
        // const casos = await connection('casos').select('*')

        response.header('X-Total-Count', count['count(*)']);
    
        return response.json(casos);
    },        
    
    async Create(request, response){
        const {titulo, descricao, valor} = request.body;
        const ong_id = request.headers.authorization;
        
        const [id] = await connection('casos').insert({
            titulo,
            descricao,
            valor,
            ong_id,
        });

        response.json({id});
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        /**
         * testa se ong logada é a ong que cadastrou o caso
         */
        const caso = await connection('casos')
            .where('id', id)
            .select('ong_id')
            .first();
        
        if (caso.ong_id != ong_id){
            return response.status(401).json({error: 'Operação não permitida.'});
        }

        await connection('casos').where('id', id).delete();

        return response.status(204).send();

    }

}

