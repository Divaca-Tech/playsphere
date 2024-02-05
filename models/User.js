const User = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
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
  });

  return User;
};

module.exports = User;
