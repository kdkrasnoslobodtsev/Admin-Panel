import React, { useEffect } from "react";
import { Box, Button, List, ListItem, ListItemAvatar, ListItemText, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import ImageIcon from '@mui/icons-material/Image';
import { useState } from "react";
import axios from "axios";

const NewsPanel = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const data = []

    const [news, setNews] = useState(data);

    useEffect(() => {
    axios.get('https://localhost:5001/api/News')
        .then(function (response) {
            setNews(response.data);
        }).catch(function (error) {
            alert(error);
        });
    }, []);

    const deletePost = async (event) => {
        await axios.delete(`https://localhost:5001/api/News/${event.target.id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        }).then (function(response) {
            console.log(response.status);
        })
        await axios.get('https://localhost:5001/api/News')
        .then(function (response) {
            setNews(response.data);
        }).catch(function (error) {
            alert(error);
        });
    }

    return (
        <Box m="20px">
            <Header title="News" subtitle="Panel of Current News" />
            <List sx={{ width: '100%', height: '60px'}}>
                {news.map(post =>
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
                                    {post.title}
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
                                    {post.text}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <Button onClick={deletePost} id={post.id} variant="contained" color="error">Delete</Button>
                </ListItem>
                )}
            </List>
        </Box>
    )
}

export default NewsPanel;