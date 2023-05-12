import React, { useRef } from "react";
import { tokens } from "../../theme";
import { useTheme, Typography, Box, Button, ImageList, ImageListItem } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import axios from "axios";
import ImageIcon from '@mui/icons-material/Image';

const ProjectWindow = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [reports, setReports] = useState([]);
   useEffect(() => {
        axios.get(`https://localhost:5001/api/Reports/admin ${props.project.id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        })
            .then(function (response) {
                setReports(response.data);
            });
   }, []);

    const deleteReport = async (event) => {
        await axios.delete(`https://localhost:5001/api/Reports/${event.target.id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        }).then (function(response) {
            console.log(response.status);
        })
        await axios.get('https://localhost:5001/api/News')
        .then(function (response) {
            setReports(response.data);
        }).catch(function (error) {
            alert(error);
        });
    }

    return(
        <Box m="20px">
            <Header title={props.project.projectName} subtitle="" />
            <Typography
                variant="h2"
                color={colors.blueAccent[100]}
                sx={{ m: "15px 0 5px 20px"}}
            >   
                Type: {props.project.typeProject}
            </Typography>
            <Typography
                variant="h2"
                color={colors.blueAccent[100]}
                sx={{ m: "15px 0 5px 20px"}}
            >   
                Area: {props.project.area}
            </Typography>
            <Typography
                variant="h2"
                color={colors.blueAccent[100]}
                sx={{ m: "15px 0 5px 20px"}}
            >   
                Price: {props.project.price}
            </Typography>
            <Typography
                variant="h2"
                color={colors.blueAccent[100]}
                sx={{ m: "15px 0 5px 20px"}}
            >   
                Adress: {props.project.adress}
            </Typography>
            <Typography
                variant="h2"
                color={colors.blueAccent[100]}
                sx={{ m: "15px 0 5px 20px"}}
            >   
                Reports:
            </Typography>
            <List sx={{ width: '100%', height: '60px'}}>
                {reports.map(report =>
                <ListItem sx={{width: '100%'}} alignItems="flex-center">
                    <ListItemAvatar>
                        <ImageIcon />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="h2"
                                    color={colors.blueAccent[100]}
                                >
                                    {report.title}
                                </Typography>
                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="h4"
                                    color={colors.blueAccent[300]}
                                >
                                    {report.reportText}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <Button onClick={deleteReport} id={report.id} variant="contained" color="error">Delete</Button>
                </ListItem>
                )}
            </List>
        </Box>
    );
}

export default ProjectWindow;