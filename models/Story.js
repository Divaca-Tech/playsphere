const Story = (sequelize, DataTypes) => {
  const Story = sequelize.define("Story", {
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
    expiringTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  //   Story.associate = (models) => {
  //     Story.belongsTo(models.user, {
  //       foreignKey: "userId",
  //     });
  //     Story.belongsTo(models.post, {
  //       foreignKey: "postId",
  //     });
  //   };
  return Story;
};

module.exports = Story;
