exports.up = async (knex) => {
    await knex.schema.createTable('conta', (t) => {
        t.increments('id').primary();
        t.string('nome').notNull();
        t.string('tipo').notNull();
        t.decimal('saldo').notNull();
        t.string('conta').notNull();
        t.string('status');
        t.integer('id_usuario').references('id').inTable('usuario').notNull();
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable('cartao');
};
