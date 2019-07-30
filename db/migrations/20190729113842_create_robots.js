
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable("robots", function (table) {
            table.increments(); // auto-incrementing integer id
            table.string("name").notNullable().unique();
            table.text("description").notNullable();

            table.timestamp("created_at").defaultTo(knex.raw('now()')).notNullable();
            table.timestamp("updated_at").defaultTo(knex.raw('now()')).notNullable();
            // table.timestamps(); // creates created_at and updated_at attributes, but with no logic ...
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable("robots")
    ]);
};
