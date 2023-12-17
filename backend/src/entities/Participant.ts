import db from "../dbConfig";
import  Sequelize  from "sequelize";

const Participant = db.define("Participant", {

    ParticipantId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    ParticipantName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    ParticipantEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})

export default Participant;