'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostAnswer = sequelize.define('PostAnswer', {
    content: DataTypes.STRING,
    attachement: DataTypes.STRING,
  },
    {});
  PostAnswer.associate = function (models) {
    // associations can be defined here
    models.PostAnswer.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
    models.PostAnswer.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return PostAnswer;
};