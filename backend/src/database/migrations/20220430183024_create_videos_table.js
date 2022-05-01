
exports.up = knex => knex.schema.createTable('videos', table => {
	table.increments('id', { primaryKey: true });
	table.text('titulo');
	table.text('autor');
	table.text('equipe');
	table.text('generoDocumental');
	table.text('tipoDocumental');
	table.text('apresentacaoGrafica');
	table.text('dataProducao');
	table.text('instituicao');
	table.text('ambito');
	table.text('link');
});

exports.down = knex => knex.schema.dropTableIfExists('videos');
