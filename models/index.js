const { Sequelize, DataTypes } = require("sequelize");
const format = require("format");
const config = require("../config/config");
const UserModel = require("./User");

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: "mysql",
  }
);

sequelize
  .sync({ force: false })
  .then(() => {
    const dateOf = format(new Date(), "do MMM, yyyy h:mm:ss a");
    console.log("Syncing Columns, Please wait...");
    let models = [];

    // Add Missing Columns
    for (let model in DB) {
      // if (model === "DebtorsCat") {
      //   continue;
      // }
      if (DB[model]?.rawAttributes) {
        models.push(model);
      }
    }

    models
      .reduce(
        (p, model) =>
          p.then(
            () =>
              new Promise(async (resolve, reject) => {
                const tableName = DB[model].getTableName();

                sequelize.queryInterface
                  .describeTable(tableName)
                  .then((tableDefinition) => {
                    // console.log(tableDefinition);
                    const newColumnsToAdd = [];
                    for (const [column, options] of Object.entries(
                      DB[model]?.getAttributes()
                    )) {
                      const foundColumn =
                        tableDefinition[
                          Object.keys(tableDefinition).find(
                            (key) => key.toLowerCase() === column.toLowerCase()
                          )
                        ];
                      if (foundColumn) {
                        // console.log(tableName, "-", column, "-", "Exists");
                      } else {
                        if (!options.hasOwnProperty("get")) {
                          newColumnsToAdd.push({
                            tableName,
                            column,
                            options,
                          });
                        }
                      }
                    }
                    return Promise.all(
                      newColumnsToAdd.map((el) => {
                        console.log(
                          el.tableName,
                          "-",
                          el.column,
                          "-",
                          "New Column"
                        );
                        return sequelize.queryInterface.addColumn(
                          el.tableName,
                          el.column,
                          el.options
                        );
                      })
                    );
                  })
                  .then(() => {
                    resolve();
                  })
                  .catch((err) => {
                    console.log(err);
                    reject();
                  });
              })
          ),
        Promise.resolve()
      )
      .then(() => {
        console.log("Columns Synced");
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => console.log(err));

const DB = {};

DB.sequelize = sequelize;
DB.Sequelize = Sequelize;
DB.user = UserModel(sequelize, DataTypes);

DB.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB synchronized.");
  })
  .catch((error) => {
    console.error("Unable to  sync database:", error);
  });

module.exports = DB;
