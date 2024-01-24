module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define(
      "roles",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        deleted_at: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        timestamps: true,
      }
    );
    return role;
  };