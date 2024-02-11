const PostAttachment = (sequelize, DataTypes) => {
  const PostAttachment = sequelize.define("PostAttachment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    file: {
      type: DataTypes.STRING,
    },
  });

  //   PostAttachment.associate = (models) => {
  //     PostAttachment.belongsTo(models.post, {
  //       foreignKey: "postId",
  //     });
  //   };

  return PostAttachment;
};

module.exports = PostAttachment;
