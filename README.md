###### SEQUELIZE INSTRUCTIONS
###### (Based on https://stackabuse.com/using-sequelize-js-and-sqlite-in-an-express-js-app/)
* Add new packages to `package.json`
* Enter the `app` directory and initialize `sequelize`
    * `cd app; node_modules/.bin/sequelize init`
* Update `config/config.json` to use `sqlite3`
* Create model and migration
    * `node_modules/.bin/sequelize model:generate --name Robot --attributes name:string,description:string`
* Run migration
    * `node_modules/.bin/sequelize db:migrate`
* Create seed file
    * `node_modules/.bin/sequelize seed:generate --name seed-robot`
* Add seed calls to seeds file
* Run seed file
    * `node_modules/.bin/sequelize db:seed:all`
* Check local DB
    * `sqlite3 database.sqlite3`
    * `select * from robots;`
* Add DB/models to `app.js`
    * `var db = require('./models');`
* Remove `knex` calls and db directory
* Add new model calls to controller
* Run server
    * `npm start`
* Visit `http://localhost:3000/robots`


