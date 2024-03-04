const { Sequelize, DataTypes } = require("sequelize");
const format = require("format");
const config = require("../config/config");
const UserModel = require("./User");
const PostModel = require("./Post");
const PostAttachmentModel = require("./PostAttachment");
const CommentModel = require("./Comment");
const LikeModel = require("./Like");
const ReplyModel = require("./Reply");
const RealShareModel = require("./ReelShare");
const ReelModel = require("./Reel");
const StoryModel = require("./Story");
const { setUpAssociations } = require("./associations");
// const { setUpAssociations } = require("./associations");

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // This line is needed if you're getting self-signed certificate errors. Remove it in production.
      },
    },
  }
);
const DB = {};

DB.sequelize = sequelize;
DB.Sequelize = Sequelize;
DB.user = UserModel(sequelize, DataTypes);
DB.post = PostModel(sequelize, DataTypes);
DB.postAttachment = PostAttachmentModel(sequelize, DataTypes);
DB.comment = CommentModel(sequelize, DataTypes);
DB.like = LikeModel(sequelize, DataTypes);
DB.reply = ReplyModel(sequelize, DataTypes);
DB.reel = ReelModel(sequelize, DataTypes);
DB.reelShare = RealShareModel(sequelize, DataTypes);
DB.story = StoryModel(sequelize, DataTypes);

DB.user.hasMany(DB.post, {
  foreignKey: "userId",
});
DB.post.belongsTo(DB.user, {
  foreignKey: { name: "userId", allowNull: true },
});
DB.post.hasMany(DB.postAttachment, {
  foreignKey: "postId",
});
DB.postAttachment.belongsTo(DB.post, {
  foreignKey: { name: "postId", allowNull: true },
});
DB.post.hasMany(DB.comment, {
  foreignKey: "postId",
});
DB.comment.belongsTo(DB.post, {
  foreignKey: { name: "postId", allowNull: true },
});
DB.post.hasMany(DB.like, {
  foreignKey: "postId",
});
DB.like.belongsTo(DB.post, {
  foreignKey: { name: "postId", allowNull: true },
});
// DB.post.hasMany(DB.reply, {
//   foreignKey: "postId",
// });
// DB.reply.belongsTo(DB.post, {
//   foreignKey: { name: "postId", allowNull: true },
// });
DB.comment.hasMany(DB.like, {
  foreignKey: "commentId",
});
DB.like.belongsTo(DB.comment, {
  foreignKey: { name: "commentId", allowNull: true },
});
DB.comment.hasMany(DB.reply, {
  foreignKey: "commentId",
});
DB.reply.belongsTo(DB.comment, {
  foreignKey: { name: "commentId", allowNull: true },
});
DB.reply.hasMany(DB.like, {
  foreignKey: "replyId",
});
DB.like.belongsTo(DB.reply, {
  foreignKey: { name: "replyId", allowNull: true },
});
DB.user.hasMany(DB.comment, {
  foreignKey: "userId",
});
DB.comment.belongsTo(DB.user, {
  foreignKey: { name: "userId", allowNull: true },
});
DB.user.hasMany(DB.like, {
  foreignKey: "userId",
});
DB.like.belongsTo(DB.user, {
  foreignKey: { name: "userId", allowNull: true },
});
DB.user.hasMany(DB.reply, {
  foreignKey: "userId",
});
DB.reply.belongsTo(DB.user, {
  foreignKey: { name: "userId", allowNull: true },
});
// DB.reel.hasMany(DB.reelShare, {
//   foreignKey: { name: "reelId", allowNull: true },
// });
DB.reelShare.belongsTo(DB.reel, {
  foreignKey: { name: "reelId", allowNull: true },
});
DB.reelShare.belongsTo(DB.user, {
  foreignKey: { name: "userId", allowNull: true },
});

DB.reelShare.belongsTo(DB.user, {
  foreignKey: { name: "sharedById", as: "sharedBy", allowNull: true },
});

DB.reel.hasMany(DB.comment, {
  foreignKey: { name: "commentId", allowNull: true },
}),
  DB.comment.belongsTo(DB.reel, {
    foreignKey: { name: "commentId", allowNull: true },
  }),
  DB.user.hasMany(DB.story, {
    foreignKey: "userId",
    allowNull: true,
  });
DB.like.belongsTo(DB.story, {
  foreignKey: { name: "storyId", allowNull: true },
});
DB.like.belongsTo(DB.reel, {
  foreignKey: { name: "reelId", allowNull: true },
});
DB.story.hasMany(DB.comment, {
  foreignKey: "commentId",
  allowNull: true,
});
DB.comment.belongsTo(DB.story, {
  foreignKey: "commentId",
  allowNull: true,
});

DB.story.belongsTo(DB.user, {
  foreignKey: "userId",
  allowNull: true,
});
sequelize
  .sync({ force: false })
  .then(() => {
    const dateOf = format(new Date(), "do MMM, yyyy h:mm:ss a");
    console.log("Syncing Columns, Please wait...");
    let models = [];

    // Add Missing Columns
    for (let model in DB) {
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
        // setUpAssociations();
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => console.log(err));

// DB.sequelize
//   .sync({ force: false })
//   .then(async () => {
//     // await setUpAssociations();
//     console.log("DB synchronized.");
//   })
//   .catch((error) => {
//     console.error("Unable to  sync database:", error);
//   });

module.exports = DB;
