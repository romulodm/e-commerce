const { DataTypes } = require('sequelize');

const db = require('../../db')

const ProductImage = db.define('ProductImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      image: {
          type: DataTypes.STRING,
      },
},{
    timestamps: true,
  });

module.exports = ProductImage;