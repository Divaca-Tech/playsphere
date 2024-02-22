const Reply = (sequelize, DataTypes) => {
  const Reply = sequelize.define("Reply", {
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

  //   Reply.associate = (models) => {
  //     Reply.belongsTo(models.user, {
  //       foreignKey: "userId",
  //     });
  //     Reply.belongsTo(models.post, {
  //       foreignKey: "postId",
  //     });
  //     Reply.belongsTo(models.comment, {
  //       foreignKey: "commentId",
  //     });
  //   };

  return Reply;
};

module.exports = Reply;
