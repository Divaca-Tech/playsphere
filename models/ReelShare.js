const ReelShare = (sequelize, DataTypes) => {
  const ReelShare = sequelize.define("ReelShare", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    // reel_id: {
    //   type: DataTypes.INTEGER,

    //   allowNull: true,
    // },

    // user_id: {
    //   type: DataTypes.INTEGER,

    //   allowNull: true,
    // },

    // shared_by_id: {
    //   type: DataTypes.INTEGER,

    //   allowNull: true,
    // },
  });

  return ReelShare;
};

module.exports = ReelShare;
