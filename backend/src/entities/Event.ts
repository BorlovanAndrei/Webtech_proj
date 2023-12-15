import db from "../dbConfig";
import  Sequelize  from "sequelize";

const Event = db.define("Event", {
    EventId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    GroupId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    EventName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    EventStartTime: {
        type: Sequelize.DATE,
        allowNull: false
    },

    EventEndTime: {
        type: Sequelize.DATE,
        allowNull: false
    },

    EventStatus: {
        type: Sequelize.STRING,
        allowNull: false
    },

    EventAccessCode: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Event;