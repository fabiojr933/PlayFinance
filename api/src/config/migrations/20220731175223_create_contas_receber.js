
exports.up = async (knex) => {
    await knex.schema.createTable('contas_receber', (t) => {
        t.increments('id').primary();
        t.string('observacao');
        t.string('status').notNull();
        t.date('data_lancamento').notNull();
        t.date('vencimento');
        t.integer('qtde_parcela');
        t.integer('dia_vencimento');
        t.integer('parcela');
        t.string('identificador').notNull();
        t.decimal('valor').notNull();
        t.integer('id_usuario').references('id').inTable('usuario').notNull();
        t.integer('id_recebimento').references('id').inTable('recebimento');
        t.integer('id_despesa_fixa').references('id').inTable('despesa_fixa');
        t.integer('id_despesa_variavel').references('id').inTable('despesa_variavel');
        t.integer('id_conta').references('id').inTable('conta');
        t.integer('id_imposto').references('id').inTable('imposto');
        t.integer('id_transferencia').references('id').inTable('transferencia');
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable('contas_receber');
};
