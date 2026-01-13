exports.up = function(knex) {
  return knex.schema.createTable('movies', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('poster');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('movies');
};

