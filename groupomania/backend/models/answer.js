'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    content: DataTypes.STRING,
  },
    {});
  Answer.associate = function (models) {
    // associations can be defined here
    models.Answer.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
    models.Answer.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Answer;
};