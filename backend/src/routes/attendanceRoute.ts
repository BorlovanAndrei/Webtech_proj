import express from "express";
import { associateEventParticipant, createParticipant, getEventsAndParticipants } from "../dataAccess/ParticipantDA";


let attendanceRoute = express.Router();
  
attendanceRoute.route('/participant').post( async (req, res) => {
  return res.json(await createParticipant(req.body));
})

attendanceRoute.route('/attendance').post( async (req, res) => {
    return res.json(await associateEventParticipant(req.body));
  })


attendanceRoute.route('/attendance').get( async (req, res) => {
    return res.json(await getEventsAndParticipants());
})

// attendanceRoute.route('/attendance/:id').delete( async (req, res) => {
//   let id = parseInt(req.params.id) 
//   return res.json(await deleteEventGroups(id));
// })

// eventGroupRoute.route('/employee/:id').put( async (req, res) => {
//   let id = parseInt(req.params.id) 
//   return res.json(await updateEmployee(req.body, id));
// })

export default attendanceRoute;