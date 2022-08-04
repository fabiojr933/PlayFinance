exports.up = async (knex) => {
    await knex.schema.createTable('lancamento', (t) => {
        t.increments('id').primary();
        t.string('observacao');
        t.string('tipo').notNull();
        t.decimal('valor').notNull();
        t.integer('id_usuario').references('id').inTable('usuario').notNull();
        t.integer('id_recebimento').references('id').inTable('recebimento');
        t.integer('id_despesa_fixa').references('id').inTable('despesa_fixa');
        t.integer('id_despesa_variavel').references('id').inTable('despesa_variavel');
        t.integer('id_conta').references('id').inTable('conta');
        t.integer('id_imposto').references('id').inTable('imposto');
        t.integer('id_transferencia').references('id').inTable('transferencia');   
        t.integer('id_contas_pagar');  
        t.integer('id_contas_receber');   
        t.date('data').notNull();
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable('lancamento');
};
