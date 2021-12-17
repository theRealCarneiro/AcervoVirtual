
exports.up = knex => knex.schema.createTable('trabalhos', table => {
	table.increments('id', { primaryKey: true });
	table.text('titulo');
	table.text('autor');
	table.text('generoDocumental');
	table.text('tipoDocumental');
	table.text('apresentacaoGrafica');
	table.text('area');
	table.text('assunto');
	table.text('dataProducao');
	table.text('instituicao');
	table.text('ambito');
	table.text('orientador');
	table.text('recorteTemporal');
	table.text('recorteEspacial');
	table.text('local');
	table.text('link');
});

exports.down = knex => knex.schema.dropTableIfExists('trabalhos');
