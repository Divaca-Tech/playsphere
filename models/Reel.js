const Reel = (sequelize, DataTypes) => {
  const Reel = sequelize.define("Reel", {
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

  return Reel;
};

module.exports = Reel;
