const { DataTypes } = require('sequelize');

const Supplier = require('./Supplier')
const Category = require('./Category')
const ProductCategory = require('./ProductCategory')
const ProductImage = require('./ProductImage')
const ProductSize = require('./ProductSize')

const db = require('../../db');

const Product = db.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
  },{
    timestamps: true,
});


Product.belongsTo(Supplier, { constraint: true, foreignKey: 'idSupplier' });
Supplier.hasMany(Product, { foreignKey: 'idProduct' });

Product.hasMany(ProductCategory, { foreignKey: 'idProduct' })
ProductCategory.belongsTo(Product, { foreignKey: 'idProduct' })
Category.hasMany(ProductCategory, { foreignKey: 'idCategory' })
ProductCategory.belongsTo(Category, { foreignKey: 'idCategory' })

/*
Product.belongsToMany(Category, { through: { model: ProductCategory }, foreignKey: 'idProduct', constraint: true });
Category.belongsToMany(Product, { through: { model: ProductCategory }, foreignKey: 'idCategory', constraint: true });
*/

ProductImage.belongsTo(Product, { constraint: true, foreignKey: 'idProduct' });
Product.hasMany(ProductImage, { constraint: true, foreignKey: 'idImage' });

ProductSize.belongsTo(Product, { constraint: true, foreignKey: 'idProduct' });
Product.hasMany(ProductSize, { constraint: true, foreignKey: 'idSize' });


module.exports = Product;