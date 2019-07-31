'use strict';
module.exports = (sequelize, DataTypes) => {
  const Robot = sequelize.define('Robot', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Robot.associate = function(models) {
    // associations can be defined here
  };
  return Robot;
};