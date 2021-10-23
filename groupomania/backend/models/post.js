'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: DataTypes.STRING,
    attachement: DataTypes.STRING,
  },
    {});
  Post.associate = function (models) {
    // associations can be defined here
    models.Post.hasMany(models.Answer, {
      foreignKey: {
        allowNull: false
      }
    });
    models.Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Post;
};