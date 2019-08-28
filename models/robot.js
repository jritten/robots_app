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

// add helper methods to sequelize models
// models.Robot.average
// helper or model
// put average on shoe isntance itself
// calculate average on update, save to shoe instance