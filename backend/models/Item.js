module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Items", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
    },
    expirationDate: {
      type: DataTypes.DATE,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  });
};
