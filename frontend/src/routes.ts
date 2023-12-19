import Contact from "./views/Contact";
import EventGroup from "./views/EventGroup";
import EventGroupEdit from "./views/EventGroupEdit";
import Home from "./views/Home";
import JoinEvent from "./views/JoinEvent";
import NotFound from "./views/NotFound";
import SeeParticipants from "./views/SeeParticipants";


export const routes = Object.freeze([
    {
        path: "/",
        component: Home,
        name: "Home"
    },
    {
        path: "/Contact",
        component: Contact,
        name: "Contact"
    },
    {
        path: "/EventGroup",
        component: EventGroup,
        name: "Event Group"
    },
    {
        path: "/JoinEvent",
        component: JoinEvent,
        name: "Join Event"
    },
    {
        path: "/SeeParticipants",
        component: SeeParticipants,
        name: "See Participants"
    },
    {
        path: "*",
        component: NotFound,
        name: null
    },
    {
        path: "/NewEventGroup/",
        component: EventGroupEdit,
        name: null
    },
    {
        path: "/EditEventGroup/:id",
        component: EventGroupEdit,
        name: null
    },

    
]);