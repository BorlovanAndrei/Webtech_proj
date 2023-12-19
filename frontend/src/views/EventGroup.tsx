import { ChangeEvent, useEffect, useState } from "react";
import { get, remove } from "../api/Calls";
import { EventGroup } from "../models/EventGroup";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePaginationActions from "../components/TablePaginationAction";
import { PaginationResponse } from "../models/PaginationResponse";
import { Box, Button, InputAdornment, TableHead, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { EventGroupFilterDto } from "../models/EventGroupFilterDto";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';
import _ from "lodash";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { AccountCircle } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export default function EventGroupList(){

    const [eventGroups, setEventGroup] = useState<PaginationResponse<EventGroup>>({count: 0, rows: []});
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0)
    const [eventGroupFilter, setEventGroupFilter] = useState<EventGroupFilterDto>({
        eventGroupName: "",
        take: 5,
        skip: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
      getEventGroup(eventGroupFilter).then(d => { setEventGroup(d); })
    }, [])
  
    async function getEventGroup(eventGroupFilter: EventGroupFilterDto) {
      return (await get("/eventGroup", eventGroupFilter)) as PaginationResponse<EventGroup>;
    }

    function newEventGroup() {
        navigate("/NewEventGroup");
    }

    function handleChangePage() {

    }

    function handleChangeRowsPerPage() {

    }

    return(
        <div>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          style={{ marginBottom: '30px', marginTop: '50px' }}
        >
  
          
          <div>
          

          <TextField
              id="input-with-icon-textfield"
              label="Search by group name"
              InputProps={{
              startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
              ),
              
            }}
               variant="standard"
               color="warning"
             />
  
  
          </div>
  
          <div>
            {/* <Button style={{ marginRight: '8px' }} startIcon={<FilterAltIcon />} variant="contained" onClick={filterEmployee}>
              Filter
            </Button>
  
            <Button startIcon={<ClearIcon />} variant="contained" onClick={clearFilters}>
              Clear Filters
            </Button> */}
          </div>
  
        </Box>
  
        <Button  color="warning" style={{ marginBottom: '20px' }} variant="contained" startIcon={<AddCircleIcon />}  onClick={newEventGroup}>Add Event group</Button>
  
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
              <TableCell>Group Id</TableCell>
                <TableCell>Group name</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventGroups.rows.map((row) => (
                <TableRow key={row.GroupId}>
                  <TableCell align="left">
                    {row.GroupId}
                  </TableCell>
                  <TableCell align="left">
                    {row.GroupName}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined" startIcon={<BorderColorIcon />} color="warning"
                      //onClick={() => editEmployee(row.EmployeeId)}
                    >Edit</Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" startIcon={<DeleteIcon />} color="warning" 
                      //onClick={() => deleteEmployee(row.EmployeeId)}
                    >Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={eventGroups.count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    );    
}