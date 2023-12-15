import mysql from 'mysql2/promise.js'
import env from 'dotenv';
import EventGroup from './EventGroup';
import Event from './Event';
import Attendance from './Attendance';
import Participant from './Participant';

env.config();

async function createDatabase(){
    mysql.createConnection({
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD
    })
    .then((connection) => {
    return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    })
    .catch((err) => {
    console.warn(err.stack)
    })
}


function fkConfig()
{
    //trb sa facem entitatile
    // Employee.hasMany(Address, {as : Addresses, foreignKey: "EmployeeId"});
    // Address.belongsTo(Employee, { foreignKey: "EmployeeId"})

    EventGroup.hasMany(Event, { foreignKey: 'GroupId'});
    Event.belongsTo(EventGroup, { foreignKey: 'GroupId'});

    Event.hasMany(Attendance, {foreignKey: 'EventId'});
    Attendance.belongsTo(Event, {foreignKey: 'EventId'});

    Participant.hasMany(Attendance, {foreignKey: 'ParticipantId'});
    Attendance.belongsTo(Participant, {foreignKey: 'ParticipantId'});
}

function db_init(){
    createDatabase();
    fkConfig();
}

export default db_init;