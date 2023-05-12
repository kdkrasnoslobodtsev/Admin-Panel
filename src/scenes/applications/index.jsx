import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

const Applications = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // настроить get
    let apps = [];

    const [items, setItems] = useState(apps);
    const [deleteVisibility, setVisibility] = useState(true);
    const [selected, setSelected] =  useState([]);
    const selectedRows = (rows) => {
        setSelected(now => rows);
        if (rows.length > 0) {
            setVisibility(false);
        } else {
            setVisibility(true);
        }
    }

    useEffect(() => {
    axios.get('https://localhost:5001/api/Proposal', {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
    })
        .then(function (response) { 
            setItems(tmp => response.data);
        }
    );
    }, []);

    // настроить delete
    const deleteClick = async () => {
        await axios.delete(`https://localhost:5001/api/Proposal/${selected[0]}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        })
            .then(function(response) {
                console.log(response.status);

            });
        await axios.get('https://localhost:5001/api/Proposal', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        }).then(function (response) {
            setItems(tmp => response.data);
        });
    }

    const columns = [
        { 
            field: "name",
            headerName: "Client Name", 
            flex: 1,
        },
        { 
            field: "number", 
            headerName: "Phone Number", 
            flex: 1, 
        },
        { 
            field: "email", 
            headerName: "Email", 
            flex: 1, 
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
            field: "city",
            headerName: "Adress",
            flex: 1,
        }
    ];

    return (
        <Routes>
            <Route path="/" element={
    <Box m="20px">
        <Header title="APPLICATIONS" subtitle="New Project Applications" />
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
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`,
                },
            }}
        >
            <DataGrid
                onSelectionModelChange={selectedRows}
                rows={items}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
            />
        </Box>
        <Button sx={{mt: "5px", mr: "5px", color: colors.grey[100]}} variant="contained" color="error" size="large" disabled={deleteVisibility} onClick={deleteClick}>Delete Application</Button>
    </Box>
    } />
    </Routes>
    );
}

export default Applications;