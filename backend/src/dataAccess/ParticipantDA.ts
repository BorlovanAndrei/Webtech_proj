import Attendance, { AttendanceCreationAttributes } from "../entities/Attendance";
import Participant, { ParticipantCreationAttributes } from "../entities/Participant";
import Event from "../entities/Event";


async function createParticipant(participant : ParticipantCreationAttributes) {
    return await Participant.create(participant);
    
}

async function associateEventParticipant(eventParticipant : AttendanceCreationAttributes){
    return await Attendance.create(eventParticipant);
  }
  
async function getEventsAndParticipants(){
    return await Event.findAll({include: ["Participant"]})
  }


export {createParticipant, associateEventParticipant, getEventsAndParticipants}