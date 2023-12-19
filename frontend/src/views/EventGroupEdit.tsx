import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { EventGroup } from "../models/EventGroup";
import { ChangeEvent, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, SetStateAction, useEffect, useState } from "react";
import { Event } from "../models/Events";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "lodash";
import { post, put } from "../api/Calls";
import _ from "lodash";
import SaveIcon from '@mui/icons-material/Save';

export default function EventGroupEdit() {


    const [EventGroup, setEventGroup] = useState<EventGroup>({
        GroupId: 0,
        GroupName: "",
        Events: []
    })

    const [Event, setEvent] = useState<Event>({
        EventId: 0,
        GroupId: 0,
        EventName: "",
        EventStartTime: new Date(),
        EventEndTime: new Date(),
        EventStatus: "",
        EventAccessCode: ""
    })

    const navigation = useNavigate();
    const { id } = useParams();

    const [isNewEvent, setIsNewEvent] = useState<boolean>(true);
    const [eventIndex, setEventIndex] = useState<number>(0);

    useEffect(() => {
        if (!id)
            return;
        //TREBUIE NULL??oup>)
        get("/eventGroup", id).then((r: SetStateAction<EventGroup>) => setEventGroup(r));
    }, [])



    function onChangeEventGroup(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        // if (e.target.name === "EmployeeAge")
        //     e.target.value = e.target.value.replace(/[^0-9]/g, '');

        setEventGroup({ ...EventGroup, [e.target.name]: e.target.value });
    }

    async function saveEventGroup() {
        if (!id) {
            await post("/eventGroup", EventGroup);
        }
        else {
            await put("/eventGroup", EventGroup.GroupId, EventGroup);
        }
        navigation("/EventGroup");
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setEvent({
            GroupId: 0,
            EventName: "",
            EventStartTime: new Date(),
            EventEndTime: new Date(),
            EventStatus: "",
            EventAccessCode: "",
            EventId: id ? Number(id) : 0
        })
        setIsNewEvent(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    function saveEvent() {
        handleClose();
        if (isNewEvent) {
            const newEvent = _.cloneDeep(EventGroup.Events);
            newEvent.push(Event);
            setEventGroup({ ...EventGroup, Events: newEvent });
        }
        else {
            let newEvents = _.cloneDeep(EventGroup.Events);
            newEvents = newEvents.map((a: any, index: number) => (index === eventIndex ? Event : a));
            setEventGroup({ ...EventGroup, Events: newEvents });
        }
    }

    function onChangeEvent(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setEvent({ ...Event, [e.target.name]: e.target.value });
    }

    function deleteEvent(index: number) {
        const newEvent = _.cloneDeep(EventGroup.Events)
        newEvent.splice(index, 1);
        setEventGroup({ ...EventGroup, Events: newEvent });
    }

    function editEvent(index: number) {
        setOpen(true);
        const currentEvent = EventGroup.Events[index];
        setEvent(currentEvent);
        setIsNewEvent(false);
        setEventIndex(index);
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
        >
            <div>
                <TextField
                    label="GroupName"
                    size="small"
                    value={EventGroup.GroupName}
                    onChange={onChangeEventGroup}
                    name="GroupName"
                />
            </div>
            {/* <div>
                <TextField
                    label="EmployeeAge"
                    size="small"
                    value={employee.EmployeeAge}
                    onChange={onChangeEmployee}
                    name="EmployeeAge"
                    inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                    }}
                />
                <TextField
                    label="EmployeeOccupation"
                    size="small"
                    value={employee.EmployeeOccupation}
                    onChange={onChangeEmployee}
                    name="EmployeeOccupation"
                />
            </div>
            <div>
                <TextField
                    label="EmployeePhone"
                    size="small"
                    value={employee.EmployeePhone}
                    onChange={onChangeEmployee}
                    name="EmployeePhone"
                />
                <TextField
                    label="EmployeeEmail"
                    size="small"
                    value={employee.EmployeeEmail}
                    onChange={onChangeEmployee}
                    name="EmployeeEmail"
                />
            </div> */}

            <div>
                <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="success"
                    style={{ marginRight: '8px' }}
                    onClick={saveEventGroup}
                >
                    Save
                </Button>
                <Button
                    startIcon={<CancelIcon />}
                    variant="contained"
                    color="error"
                    onClick={() => navigation(-1)}
                >
                    Cancel
                </Button>
            </div>

            <div>
                <h1>Events</h1>

                <div>
                    <Button
                        startIcon={<AddCircleIcon />}
                        variant="contained"
                        onClick={handleClickOpen}
                    >
                        Add new event
                    </Button>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Event</DialogTitle>
                        <DialogContent>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                            >
                                <TextField
                                    label="EventName"
                                    value={Event.EventName}
                                    onChange={onChangeEvent}
                                    name="EventName"
                                />
                                <TextField
                                    label="EventStartTime"
                                    value={Event.EventStartTime}
                                    onChange={onChangeEvent}
                                    name="EventStartTime"
                                />
                                <TextField
                                    label="EventEndTime"
                                    value={Event.EventEndTime}
                                    onChange={onChangeEvent}
                                    name="EventEndTime"
                                />
                                <TextField
                                    label="EventStatus"
                                    value={Event.EventStatus}
                                    onChange={onChangeEvent}
                                    name="EventStatus"
                                />
                                <TextField
                                    label="EventAccessCode"
                                    value={Event.EventAccessCode}
                                    onChange={onChangeEvent}
                                    name="EventAccessCode"
                                />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={saveEvent}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Event Name</TableCell>
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Code</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {EventGroup.Events.map((row: { EventName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; EventStartTime: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
                                <TableRow key={index} >
                                    <TableCell>{row.AddressCity}</TableCell>
                                    <TableCell>{row.AddressDetail}</TableCell>
                                    <TableCell><Button startIcon={<EditIcon />} color="success" onClick={() => editAddress(index)} /></TableCell>
                                    <TableCell><Button startIcon={<CancelIcon />} color="error" onClick={() => deleteAddress(index)} /></TableCell>
                                </TableRow>
                            ))} */} 

                            {EventGroup.Events.map((event: Event, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{event.EventName}</TableCell>
                                    <TableCell>{new Date(event.EventStartTime).toLocaleString()}</TableCell>
                                    <TableCell>{new Date(event.EventEndTime).toLocaleString()}</TableCell>
                                    <TableCell>{event.EventStatus}</TableCell>
                                    <TableCell>{event.EventAccessCode}</TableCell>
                                    <TableCell>
                                        <Button startIcon={<EditIcon />} color="success" onClick={() => editEvent(index)} />
                                    </TableCell>
                                    <TableCell>
                                        <Button startIcon={<CancelIcon />} color="error" onClick={() => deleteEvent(index)} />
                                    </TableCell>
                                </TableRow>
                            ))}


                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Box>
    );
}

// function useState<T>(arg0: { GroupId: number; GroupName: string;  Events: never[]; }): [any, any] {
//     throw new Error("Function not implemented.");
// }
