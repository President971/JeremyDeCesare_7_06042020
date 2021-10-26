'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    content: DataTypes.STRING,
    PostId: DataTypes.NUMBER,
  },
    {});
  Answer.associate = function (models) {
    // associations can be defined here
    models.Answer.belongsTo(models.Post, {
      foreignKey: {
        allowNull: true
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