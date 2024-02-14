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
    fileUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
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
