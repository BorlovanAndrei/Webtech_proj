import express from 'express';
import eventGroupFilterDto from '../dataAccess/models/EventGroupFilterDto';
import { createEventGroup, deleteEventGroups, getEventGroup, getEventGroupById, getFilteredEventGroups } from '../dataAccess/EventGroupDA';



let eventGroupRoute = express.Router();
  
eventGroupRoute.route('/eventGroup').post( async (req, res) => {
  return res.json(await createEventGroup(req.body));
})

eventGroupRoute.route('/eventGroup').get( async (req, res) => {  
  var queryParams = new eventGroupFilterDto(req.query) 
  return res.json(await getFilteredEventGroups(queryParams));
})

eventGroupRoute.route('/eventGroup/:id').get( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await getEventGroupById(id));
})

eventGroupRoute.route('/eventGroup/:id').delete( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await deleteEventGroups(id));
})

// eventGroupRoute.route('/employee/:id').put( async (req, res) => {
//   let id = parseInt(req.params.id) 
//   return res.json(await updateEmployee(req.body, id));
// })

export default eventGroupRoute;