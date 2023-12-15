import db from "../dbConfig";
import  Sequelize  from "sequelize";

const Attendance = db.define("Attendance", {

    AttendanceId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    EventId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    ParticipantId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    AttendanceTime: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

export default Attendance;