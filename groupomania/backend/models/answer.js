'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostAnswer = sequelize.define('Answer', {
    content: DataTypes.STRING,
    attachement: DataTypes.STRING,
  },
    {});
  PostAnswer.associate = function (models) {
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
  return PostAnswer;
};