const { DataTypes } = require('sequelize');

const db = require('../../db')

const ProductCategory = db.define('ProductCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }
},{
  timestamps: true,
});

module.exports = ProductCategory;