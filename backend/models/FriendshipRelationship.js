module.exports = (sequelize, DataTypes) => {
  return sequelize.define("FriendshipRelationships", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
