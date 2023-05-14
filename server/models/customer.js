"use strict";
const { Model } = require("sequelize");
const { hashedPw } = require('../helpers/hashing');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Bookmark)
    }
  }
  Customer.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email cannot be empty",
          },
          notEmpty: {
            msg: "Email cannot be empty",
          },
          isEmail: true,
        },
        unique: {
          arg: true,
          msg: "Email is already registered.",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 16],
            msg: "Minimum length for password is 5 and maximum length is 16",
          },
          notNull: {
            msg: "Password cannot be empty",
          },
          notEmpty: {
            msg: "Password cannot be empty",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "customer",
      },
    },
    {
      sequelize,
      modelName: "Customer",
      hooks: {
        beforeCreate: async (customer) => {
          let hashed = await hashedPw(customer.password)
          customer.password = hashed
        }
      }
    }
  );
  return Customer;
};
