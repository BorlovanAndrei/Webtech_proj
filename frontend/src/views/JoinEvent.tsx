import { TextField, Button, Box, InputAdornment, Dialog, DialogActions, DialogContent, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from "@mui/material";
import axios from "axios";
import { ChangeEvent, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, SetStateAction, useEffect, useState } from "react";
import { Event } from "../models/Events";
import _, { get } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { post, put } from "../api/Calls";
import { ParticipantAttributes } from "../models/Participants";
import { Attendance } from "../models/Attendance";
import SaveIcon from '@mui/icons-material/Save';



export default function JoinEvent() {

  const [accessCode, setAccessCode] = useState('');

  const [Event, setEvent] = useState<Event>({
    EventId: 0,
    GroupId: 0,
    EventName: "",
    EventStartTime: new Date(),
    EventEndTime: new Date(),
    EventStatus: "",
    EventAccessCode: ""
  })

  const [Attendance, setAttendance] = useState<Attendance>({
    EventId: 0,
    ParticipantId: 0,
    AttendanceStartTime: new Date()
  })


  const [Participant, setParticipant] = useState<ParticipantAttributes>({
    ParticipantId: 0,
    ParticipantName: "",
    ParticipantEmail: ""
  })

  const navigation = useNavigate();
  const { id } = useParams();

  const [selectedEvent, setSelectedEvent] = useState({ EventId: '', EventName: '' }); // State for the selected event

  // // Fetch existing events when the component mounts
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await axios.get('/events'); // Replace with your actual API endpoint
  //       setEvent(response.data);
  //     } catch (error) {
  //       console.error('Error fetching events:', error);
  //     }
  //   };

  //   fetchEvents();
  // }, []);

  // // Handle change when selecting an event
  // const onSelectEvent = (event: any) => {
  //   setSelectedEvent(event);
  // };


  const [isNewParticipant, setIsNewParticipant] = useState<boolean>(true);
  //const [eventIndex, setEventIndex] = useState<number>(0);

  // useEffect(() => {
  //     if (!id)
  //         return;
  //     //TREBUIE NULL??oup>)
  //     get("/eventGroup", id).then((r: SetStateAction<EventGroup>) => setEventGroup(r));
  // }, [])

  function onChangeAccessCode(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setEvent({ ...Event, EventAccessCode: e.target.value });
  }
  

  function onChangeParticipant(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    // if (e.target.name === "EmployeeAge")
    //     e.target.value = e.target.value.replace(/[^0-9]/g, '');

    setParticipant({ ...Participant, [e.target.name]: e.target.value });
  }

  async function saveParticipant() {
    if (!id) {
      await post("/participant", Participant);
    }
    navigation("/JoinEvent");
  }

  const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  //   setParticipant({
  //     ParticipantId: id ? Number(id) : 0,
  //     ParticipantName: "",
  //     ParticipantEmail: ""
  //   })
  //   setIsNewParticipant(true)

  //   setEvent({
  //     GroupId: 0,
  //     EventName: "",
  //     EventStartTime: new Date(),
  //     EventEndTime: new Date(),
  //     EventStatus: "CLOSED",
  //     EventAccessCode: "",
  //     EventId: id ? Number(id) : 0
  // })
  // };

  function onChangeEvent(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setEvent({ ...Event, [e.target.name]: e.target.value });
}

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // function saveEvent() {
  //   handleClose();
  //   if (isNewParticipant) {
  //     // Create a new participant and add it to the array
  //     const newParticipant = {
  //       ParticipantId: Participant.ParticipantId,
  //       ParticipantName: Participant.ParticipantName,
  //       ParticipantEmail: Participant.ParticipantEmail,
  //     };

  //     setParticipant({
  //       ...Participant,
  //       Participants: [...Participant.Participants, newParticipant],
  //     });
  //   } else {
  //     // Update an existing participant in the array
  //     const updatedParticipants = EventGroup.Participants.map((existingParticipant) =>
  //       existingParticipant.ParticipantId === participant.ParticipantId ? participant : existingParticipant
  //     );

  //     setEventGroup({
  //       ...EventGroup,
  //       Participants: updatedParticipants,
  //     });
  //   }

  function onChangeAttendance(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setAttendance({ ...Attendance, [e.target.name]: e.target.value });
  }

  // async function joinAttendance() {
  //   // if (!id) {
  //   //   await post("/join-event", { EventAccessCode: Event.EventAccessCode, ParticipantId: Participant.ParticipantId, EventId: Event.EventId });
  //   // }
  //   // navigation("/JoinEvent");

  //   // if (!id) {
  //   //   try {
  //   //     // Send a POST request to join the event and record attendance
  //   //     await post("/join-event", {
  //   //       EventAccessCode: Event.EventAccessCode,
  //   //       ParticipantId: Participant.ParticipantId,
  //   //       EventId: Event.EventId,
  //   //       AttendanceStartTime: new Date().toISOString() // Assuming AttendanceStartTime should be in a specific format like ISO string
  //   //     });
  
  //   //     // After successful joining and attendance record, navigate to a specific page
  //   //     navigation("/JoinEvent"); // You might want to navigate to a different route or handle navigation differently
  //   //   } catch (error) {
  //   //     console.error('Error joining event:', error);
  //   //     // Handle error scenarios (e.g., display an error message to the user)
  //   //   }
  //   // }
  //   //navigation("/JoinEvent");




  //   try {
  //     // Prepare the data to be sent in the POST request
  //     const requestData = {
  //       EventAccessCode: Event.EventAccessCode, // EventAccessCode from your state
  //       ParticipantId: Participant.ParticipantId, // ParticipantId from your state
  //       EventId: Event.EventId, // EventId from your state
  //       AttendanceStartTime: new Date().toISOString(), // Current time as AttendanceStartTime
  //     };
  
  //     // Make the POST request to the backend endpoint
  //     const response = await post("/join-event", requestData);
  
  //     // Check if the request was successful
  //     if (response && response.data && response.data.message) {
  //       // Participant successfully joined the event
  //       navigation("/JoinEvent");
  //     } else {
  //       // Handle other scenarios or show an error message
  //       console.error("Error joining event:", response.data.error);
  //       // Handle error scenarios (e.g., display an error message to the user)
  //     }
  //   } catch (error) {
  //     console.error("Error joining event:", error);
  //     // Handle error scenarios (e.g., display an error message to the user)
  //   }

  // }

  async function joinAttendance() {
    try {
      // Prepare the data to be sent in the POST request
      const requestData = {
        accessCode: Event.EventAccessCode, // Update to match backend variable names
        participantId: Participant.ParticipantId, // Update to match backend variable names
        eventId: Event.EventId, // Update to match backend variable names
        AttendanceStartTime: new Date().toISOString(), // Assuming AttendanceStartTime should be in a specific format like ISO string
      };
  
      // Make the POST request to the backend endpoint
      const response = await post("/join-event", requestData);
  
      // Check if the request was successful
      if (response && response.data && response.data.message) {
        // Participant successfully joined the event
        navigation("/JoinEvent");
      } else {
        // Handle other scenarios or show an error message
        console.error("Error joining event:", response.data.error);
        // Handle error scenarios (e.g., display an error message to the user)
      }
    } catch (error) {
      console.error("Error joining event:", error);
      // Handle error scenarios (e.g., display an error message to the user)
    }
  }
    


  return (
    <div>
      <div>
        <Box display="flex" justifyContent="center">
          <TextField
            label="Enter name"
            size="small"
            value={Participant.ParticipantName}
            onChange={onChangeParticipant}
            name="ParticipantName"
            variant="standard"
            color="warning"
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
            style={{ marginRight: '8px', marginTop: '25px' }}
          />
          <TextField
            label="Enter email"
            size="small"
            value={Participant.ParticipantEmail}
            onChange={onChangeParticipant}
            name="ParticipantEmail"
            variant="standard"
            color="warning"
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
            style={{ marginRight: '8px', marginTop: '25px' }}
          />
          <Button
            startIcon={<SaveIcon />}
            variant="outlined"
            color="warning"
            style={{ marginTop: '25px', marginBottom: '25px' }}
            onClick={saveParticipant}
          >
            Save
          </Button>
        </Box>
      </div>

      <div>
        <Box display="flex" justifyContent="center">
          <TextField
            label="Enter event Id"
            size="small"
            value={Event.EventId}
            onChange={onChangeEvent}
            name="EventId"
            variant="standard"
            color="warning"
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
            style={{ marginRight: '8px', marginTop: '25px' }}
          />
          <TextField
            label="Event name"
            size="small"
            value={Event.EventName}
            onChange={onChangeEvent}
            name="EventName"
            variant="standard"
            color="warning"
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
            style={{ marginRight: '8px', marginTop: '25px' }}
          />

        </Box>

        <Box display="flex" justifyContent="center">
          {/* <TextField
            label="Enter event Id"
            size="small"
            value={Event.EventId}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, EventId: e.target.value })}
            variant="standard"
            color="warning"
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
            style={{ marginRight: '8px', marginTop: '25px' }}
          />
          <TextField
            label="Event name"
            size="small"
            value={selectedEvent.EventName}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, EventName: e.target.value })}
            variant="standard"
            color="warning"
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
            style={{ marginRight: '8px', marginTop: '25px' }}
          /> */}

          {/* Render a dropdown with existing events */}
          {/* <select onChange={(e) => onSelectEvent(JSON.parse(e.target.value))}>
            <option value="">Select an event</option>
            <option value={JSON.stringify(Event)}>
              {Event.EventName}
            </option>
          </select> */}
        </Box>

      </div>

      <div>
        <TextField
          label="Enter AccessCode"
          size="small"
          value={Event.EventAccessCode}
          onChange={onChangeAccessCode}
          variant="standard"
          color="warning"
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          style={{ marginRight: '8px', marginTop: '25px' }}
        />

        <Button
          startIcon={<SaveIcon />}
          variant="outlined"
          color="warning"
          style={{ marginTop: '25px', marginBottom: '25px' }}
          onClick={joinAttendance}
        >
          Join event
        </Button>


      </div>

    </div>




  );


}