import db from "../dbConfig";
import  Sequelize  from "sequelize";

const Attendance = db.define("Attendance", {

    // AttendanceId: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false
    // },

    EventId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },

    ParticipantId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },

    AttendanceStartTime: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    }
})

export default Attendance;