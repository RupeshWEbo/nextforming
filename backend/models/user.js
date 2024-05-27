'use strict';
const bcrypt = require("bcrypt");
const bcrypt_p = require("bcrypt-promise");
const { TE, to } = require("../services/util.service");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_pic: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    interprice: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    is_profile_flag: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false,
      defaultValue: '0',
    },
    status: {
      type: DataTypes.ENUM('worker','staff_manager'),
      allowNull: false,
      defaultValue: 'staff_manager',
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: null,
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
    underscored: true
  });
  User.beforeSave(async (user, options) => {
    let err;

    if (user.changed("password")) {
      let salt, hash;
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) TE(err.message, true);

      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if (err) TE(err.message, true);

      user.password = hash;
    }
  });

  User.beforeUpdate(async (user, options) => {
    let err;

    if (user.changed("password")) {
      let salt, hash;
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) TE(err.message, true);

      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if (err) TE(err.message, true);

      user.password = hash;
    }
  });

  User.prototype.comparePassword = async function (pw) {
    let err, pass;
    if (!this.password) TE("password not set");

    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if (err) TE(err);

    if (!pass) TE("invalid password");

    return this;
  };
  return User;
};