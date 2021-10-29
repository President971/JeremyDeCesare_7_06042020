'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    author: DataTypes.STRING,
    content: DataTypes.STRING,
    PostId: DataTypes.NUMBER,
  },
    {});
  Answer.associate = function (models) {
    // associations can be defined here
    models.Answer.belongsTo(models.Post, {
  foreignKey: "PostId",
      as: "post",
    });
    models.Answer.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Answer;
};