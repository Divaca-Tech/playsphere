const ReelShare = (sequelize, DataTypes) => {
  const ReelShare = sequelize.define("ReelShare", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  //   ReelShare.associate = (models) => {
  //     ReelShare.belongsTo(models.user, {
  //       foreignKey: "userId",
  //     });
  //     ReelShare.belongsTo(models.post, {
  //       foreignKey: "postId",
  //     });
  //   };
  return ReelShare;
};

module.exports = ReelShare;
