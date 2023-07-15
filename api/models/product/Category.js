const { DataTypes } = require('sequelize');

const db = require('../../db')

const Category = db.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
},{
  timestamps: true,
});

module.exports = Category;