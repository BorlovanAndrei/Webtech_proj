import Event from "../entities/Event";
import EventGroup, { EventGroupCreationAttributes } from "../entities/EventGroup";
import eventGroupFilterDto from "./models/EventGroupFilterDto";
import { Like } from "./operators";

async function getEventGroup() {
    return await EventGroup.findAll({include: ["EventGroups"]})
}

async function getEventGroupById(id : number) {
    return await EventGroup.findByPk(id, {include: ["EventGroups"]})
}

async function createEventGroup(event : EventGroupCreationAttributes) {
    return await EventGroup.create(event, {include: [{model: Event, as : "EventGroups"}]});
    
}

async function getFilteredEventGroups(eventGroupFilter: eventGroupFilterDto) {

    if (!eventGroupFilter.take)
    eventGroupFilter.take = 10;
  
    if (!eventGroupFilter.skip)
    eventGroupFilter.skip = 0;
  
    let whereClause: any = {};
    if (eventGroupFilter.eventGroupName)
      whereClause.EmployeeName = { [Like]: `%${eventGroupFilter.eventGroupName}%` };
  
  
    return await EventGroup.findAndCountAll(
      {
        distinct: true,
        where: whereClause,
        limit: eventGroupFilter.take,
        offset: eventGroupFilter.skip * eventGroupFilter.take,
      });
  
  }

  async function deleteEventGroups(id: number) {
    let deleteElem = await EventGroup.findByPk(id);
  
    if (!deleteElem) {
      console.log("This element does not exist, so it cannot be deleted");
      return;
    }
    return await deleteElem.destroy();
  }  




export {
    getEventGroupById,
    getEventGroup,
    createEventGroup,
    getFilteredEventGroups,
    deleteEventGroups
}
