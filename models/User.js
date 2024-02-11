const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },

    otp: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
    is_otp_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    otp_exp_time: {
      type: DataTypes.STRING,
    },
    photoUrl: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
  });

  // User.associate = (models) => {
  //   User.hasMany(models.post, {
  //     foreignKey: "userId",
  //   });
  //   User.hasMany(models.comment, {
  //     foreignKey: "userId",
  //   });
  //   User.hasMany(models.like, {
  //     foreignKey: "userId",
  //   });
  //   User.hasMany(models.reply, {
  //     foreignKey: "userId",
  //   });
  //   User.hasMany(models.postAttachment, {
  //     foreignKey: "userId",
  //   });
  // };

  return User;
};

module.exports = User;
