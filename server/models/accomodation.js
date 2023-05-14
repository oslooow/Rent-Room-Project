'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accomodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Accomodation.belongsTo(models.User, { foreignKey: "authorId" })
      Accomodation.belongsTo(models.Type, { foreignKey: "typeId" })
      Accomodation.hasMany(models.Bookmark)
     
    }
  }
  Accomodation.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name cannot be empty'
        },
        notEmpty: {
          msg: 'Name cannot be empty'
        }
      }
    },
    facility: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Facility cannot be empty'
        },
        notEmpty: {
          msg: 'Facility cannot be empty'
        }
      }
    },
    roomCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Capacity cannot be empty'
        },
        notEmpty: {
          msg: 'Capacity cannot be empty'
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image cannot be empty'
        },
        notEmpty: {
          msg: 'Image cannot be empty'
        },
        isUrl: true,
      }
    },
    authorId: DataTypes.INTEGER,
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Location cannot be empty'
        },
        notEmpty: {
          msg: 'Location cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price cannot be empty'
        },
        notEmpty: {
          msg: 'Price cannot be empty'
        },
        min: {
          args: 120000,
          msg: 'Minimum price is 120000'
        }
      }
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Type ID cannot be empty'
        },
        notEmpty: {
          msg: 'Type ID cannot be empty'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Active"
    }
  }, {
    sequelize,
    modelName: 'Accomodation',
  });
  return Accomodation;
};