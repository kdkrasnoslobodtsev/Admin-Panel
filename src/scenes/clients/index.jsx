import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from 'axios';

const Consumers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    let data = [];
    const [items, setItems] = useState(data);
    const [deleteVisibility, setVisibility] = useState(true);
    const [selected, setSelected] =  useState([]);

    useEffect(() => {
        axios.get('https://localhost:5001/accounts')
            .then(function (response) {
                console.log(response.data);
                setItems(response.data);
            }
            ).catch(function (error) {
                console.log(error);
            }
            ); 
        }, []);

    const selectedRows = (rows) => {
        setSelected(now => rows.sort());
        if (rows.length > 0) {
            setVisibility(false);
        } else {
            setVisibility(true);
        }
    }


    //настроить delete
    const deleteClick = () => {
        for (let i = 0; i < selected.length; ++i) {
            setItems(tmp => tmp.filter(a => a.id !== selected[i]));
        }
    }

    const columns = [
        { 
            field: "id",
            headerName: "ID",
            flex: 1,
        },
        { 
            field: "firstName",
            headerName: "First Name", 
            flex: 1, 
            cellClassName: "name-column--cell"
        },
        { 
            field: "lastName",
            headerName: "Last Name", 
            flex: 1, 
            cellClassName: "name-column--cell"
        },
        { 
            field: "email", 
            headerName: "Email", 
            flex: 1, 
        },
    ];

    return (
    <Box m="20px">
        <Header title="CONSUMERS" subtitle="Managing the Clients" />
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
    </Box>
    )
}

export default Consumers;