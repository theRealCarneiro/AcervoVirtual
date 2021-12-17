
exports.up = knex => knex.schema.createTable('usuarios', table => {
	table.increments('id', { primaryKey: true });
	table.string('usuario').notNullable();
	table.string('senha').notNullable();;

	table.unique('usuario');
});

exports.down = knex => knex.schema.dropTableIfExists('usuarios');
