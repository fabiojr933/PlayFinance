exports.up = async (knex) => {
    await knex.schema.createTable('fatura', (t) => {
        t.increments('id').primary();
        t.decimal('valor').notNull();
        t.integer('id_usuario').references('id').inTable('usuario').notNull();
        t.integer('id_cartao').references('id').inTable('cartao');
        t.integer('id_lancamento').references('id').inTable('lancamento');
        t.date('data').notNull();        
        t.string('status').notNull();
    });
};


exports.down = async (knex) => {
    await knex.schema.dropTable('fatura');
};
