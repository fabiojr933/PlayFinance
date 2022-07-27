exports.up = async (knex) => {
    await knex.schema.createTable('lancamento', (t) => {
        t.increments('id').primary();
        t.string('observacao');
        t.decimal('valor').notNull();
        t.integer('id_usuario').references('id').inTable('usuario').notNull();
        t.integer('id_receita').references('id').inTable('receita');
        t.integer('id_despesa').references('id').inTable('despesa');
        t.integer('id_cartao').references('id').inTable('cartao');
        t.string('tipo').notNull();
        t.date('data').notNull();
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable('lancamento');
};
