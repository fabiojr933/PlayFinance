exports.up = async (knex) => {
    await knex.schema.createTable('despesa_variavel', (t) => {
        t.increments('id').primary();
        t.string('nome').notNull();
        t.string('status');
        t.integer('id_usuario').references('id').inTable('usuario').notNull();
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable('despesa_variavel');
};
