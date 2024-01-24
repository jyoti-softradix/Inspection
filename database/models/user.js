import bcrypt from "bcrypt";
import { saltRounds } from "../../config/keys";

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "1=admin, 2=user",
      },
      first_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      country_code:{
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_otp_verified:{
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
      image:{
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      deleted_at: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          /**  password encryption **/
          if (user && user.password) {
            user.password = await bcrypt.hash(user.password, saltRounds);
          }
        },
        beforeBulkUpdate: async (user) => {
          if (user && user.attributes && user.attributes.password) {
            // eslint-disable-next-line no-param-reassign
            user.attributes.password = await bcrypt.hash(
              user.attributes.password,
              saltRounds
            );
          }
          if (user && user.attributes && user.attributes.email) {
            // eslint-disable-next-line no-param-reassign
            user.attributes.email = user.attributes.email.toLowerCase();
          }
        },
      },
    }
  );
  return users;
};