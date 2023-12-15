import db from "../dbConfig";
import  Sequelize, { ModelDefined }  from "sequelize";

export interface EventGroupAttributes{
    GroupId : number,
    GroupName: string
}

export interface EventGropuCreationAttributes extends EventGroupAttributes {};


const EventGroup : ModelDefined<EventGroupAttributes, EventGropuCreationAttributes> = db.define("EventGroup", {

    GroupId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    GroupName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default EventGroup;