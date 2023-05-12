import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProjectWindow from "../projectWindow";
import axios from "axios";

const Projects = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: "id",
            headerName: "ID",
        },
        { 
            field: "projectName", 
            headerName: "Project Name", 
            flex: 1, 
        },
        { 
            field: "typeProject", 
            headerName: "Type", 
            flex: 1, 
        },
        { 
            field: "area", 
            headerName: "Area", 
            flex: 1, 
        },
        {
            field: "price",
            headerName: "Price",
            flex: 1,
        },
        {
            field: "adress",
            headerName: "Adress",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
        },
        {
            field: "applicationUserId",
            headerName: "ClientID",
            flex: 1,
        }
    ];

    let data = [];
    const [items, setItems] = useState(data);
    const [visibility, setVisibility] = useState(true);
    const [selected, setSelected] =  useState([]);


    useEffect(() => {
    axios.get('https://localhost:5001/api/Project/admin', {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }
    })
        .then(function (response) {
            setItems(tmp => response.data);
        });
    }, []);

    const selectedRows = (rows) => {
        setSelected(now => rows);
        if (rows.length > 0) {
            setVisibility(false);
        } else {
            setVisibility(true);
        }
    }

    //настроить delete
    const deleteClick = async () => {
        await axios.delete(`https://localhost:5001/api/Project/${selected[0]}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        })
            .then(function(response) {
                console.log(response.status);

            });
        await axios.get('https://localhost:5001/api/Project/admin', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        })
            .then(function (response) {
                setItems(tmp => response.data);
            });
    }

    const upgradeStatus = async () => {
        let project = items.filter(item => item.id === selected[0])[0];
        if (project.status === "PREPARING") {
            project.status = "ON_PROGRESS";
        } else if (project.status === "ON_PROGRESS") {
            project.status = "DONE";
        }
        await axios.post('https://localhost:5001/api/Project', project, {
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }
        }).then (function(response) {
            console.log(response.data);
        });
        await axios.get('https://localhost:5001/api/Project/admin', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        }).then(function (response) {
            setItems(tmp => response.data);
        });
    }

    const downgradeStatus = async () => {
        let project = items.filter(item => item.id === selected[0])[0];
        console.log(project);
        if (project.status === "ON_PROGRESS") {
            project.status = "PREPARING";
        } else if (project.status === "DONE") {
            project.status = "ON_PROGRESS";
        }
        await axios.post('https://localhost:5001/api/Project', project, {
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }
        }).then (function(response) {
        });
        await axios.get('https://localhost:5001/api/Project/admin', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        }).then(function (response) {
            setItems(tmp => response.data);
        });
    }

    return (
        <Routes>
            <Route path="/" element={
    <Box m="20px">
        <Header title="PROJECTS" subtitle="Managing the Current Projects" />
        <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders" : {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`,
                },
            }}
        >
            <DataGrid 
                rows={items}
                columns={columns}
                onSelectionModelChange={selectedRows}
                components={{ Toolbar: GridToolbar }}
            />
        </Box>
        <Button sx={{mt: "5px", ml: "5px", color: colors.grey[100]}} variant="contained" color="error" size="large" disabled={visibility} onClick={deleteClick}>Delete</Button>
        <Button sx={{mt: "5px", ml: "5px", color: colors.grey[100]}} variant="contained" color="warning" size="large" disabled={visibility} onClick={upgradeStatus}>Upgrade Status</Button>
        <Button sx={{mt: "5px", ml: "5px", color: colors.grey[100]}} variant="contained" color="warning" size="large" disabled={visibility} onClick={downgradeStatus}>Downgrade Status</Button>
        <Link to="/home/projects/project-window"><Button sx={{mt: "5px", ml: "5px", color: colors.grey[100]}} variant="contained" color="info" size="large" disabled={visibility}>Show Info</Button></Link>
    </Box>
            }/>
        <Route path="/project-window" element={<ProjectWindow project={items.filter(a => a.id === selected[0])[0]}/>}/>
    </Routes>
    )
}

export default Projects;