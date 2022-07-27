exports.up = async (knex) => {
    await knex.schema.createTable('usuario', (t) => {
        t.increments('id').primary();
        t.string('nome').notNull();
        t.string('email').notNull().unique();
        t.string('token').notNull().unique();
        t.string('senha').notNull();
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable('usuario');
};
