const Comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
  });

  //   Comment.associate = (models) => {
  //     Comment.belongsTo(models.user, {
  //       foreignKey: "userId",
  //     });
  //     Comment.belongsTo(models.post, {
  //       foreignKey: "postId",
  //     });
  //   };
  return Comment;
};

module.exports = Comment;
