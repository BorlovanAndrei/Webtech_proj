import EventGroup, { EventGropuCreationAttributes } from "../entities/EventGroup";

async function createEventGroup(eventGroup: EventGropuCreationAttributes){
    return await EventGroup.create(eventGroup)
}