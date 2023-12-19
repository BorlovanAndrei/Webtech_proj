import { EventAttributes } from "./Events";

export interface EventGroupAttributes{
    GroupId : number,
    GroupName: string,
    Events: EventAttributes[] 
}