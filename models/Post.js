const Post = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
  });

  //   Post.associate = (models) => {
  //     Post.belongsTo(models.user, {
  //       foreignKey: "userId",
  //     });
  //     Post.hasMany(models.comment, {
  //       foreignKey: "postId",
  //     });
  //     Post.hasMany(models.like, {
  //       foreignKey: "postId",
  //     });
  //     Post.hasMany(models.reply, {
  //       foreignKey: "postId",
  //     });
  //     Post.hasMany(models.postAttachment, {
  //       foreignKey: "postId",
  //     });
  //   };
  return Post;
};

module.exports = Post;
