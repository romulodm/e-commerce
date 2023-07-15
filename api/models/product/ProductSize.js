const { DataTypes } = require('sequelize');

const db = require('../../db')

const ProductSize = db.define('ProductSize', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    size: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
},{
  timestamps: true,
});

module.exports = ProductSize;