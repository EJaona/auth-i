exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", users => {
    users.increments();

    users
      .string("userName", 123)
      .notNullable()
      .unique();

    users.string("password", 123).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
