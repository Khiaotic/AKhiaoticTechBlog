const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Opinion extends Model {}

Opinion.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_description:  {
            type:DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            }
        },
    },

    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "opinion",
    }
);


module.exports = Opinion;