const Like = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isLiked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  //   Like.associate = (models) => {
  //     Like.belongsTo(models.user, {
  //       foreignKey: "userId",
  //     });
  //     Like.belongsTo(models.post, {
  //       foreignKey: "postId",
  //     });
  //     Like.belongsTo(models.comment, {
  //       foreignKey: "commentId",
  //     });
  //     Like.belongsTo(models.reply, {
  //       foreignKey: "replyId",
  //     });
  //   };

  return Like;
};

module.exports = Like;
