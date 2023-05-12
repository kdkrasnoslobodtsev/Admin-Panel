import { useState } from "react"; 
import { Sidebar, Menu, MenuItem, sidebarClasses, ProSidebarProvider, menuClasses } from "react-pro-sidebar"; 
import { Box, IconButton, Typography, useTheme } from "@mui/material"; 
import { Link } from "react-router-dom"; 
import { tokens } from "../../theme";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined"; 
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"; 
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import AddCommentIcon from '@mui/icons-material/AddComment'; 
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
            component={<Link to={to} />}
        >
            <Typography>{title}</Typography>
        </MenuItem>
    );
};

const SideBar = () => { 
    const theme = useTheme(); 
    const colors = tokens(theme.palette.mode); 
    const [isCollapsed, setIsCollapsed] = useState(false); 
    const [selected, setSelected] = useState("Dashboard"); 
    return ( 
        <Box> 
            <ProSidebarProvider>
                <Sidebar  
                    defaultCollapsed={isCollapsed}
                    rootStyles={{
                        [`.${sidebarClasses.container}`]: {
                            backgroundColor: `${colors.primary[400]} !important`,
                        },
                        [`.${menuClasses.button}:hover`]: {
                            backgroundColor: `${colors.primary[400]} !important`,
                            color: "#868dfb !important",
                        },
                        [`.${menuClasses.active}`]: {
                            color: "#6870fa !important",
                        },
                    }}
                > 
                    <Menu> 
                        <MenuItem 
                            onClick={() => setIsCollapsed(!isCollapsed)} 
                            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined} 
                            style={{ 
                                margin: "10px 0 20px 0",
                            }}
                        > 
                            {!isCollapsed && ( 
                                <Box 
                                    display="flex" 
                                    justifyContent="space-between" 
                                    alignItems="center" 
                                    ml="15px" 
                                > 
                                    <Typography variant="h3"> 
                                        ROYAL PALACE 
                                    </Typography> 
                                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}> 
                                        <MenuOutlinedIcon /> 
                                    </IconButton> 
                                </Box> 
                            )} 
                        </MenuItem> 

                        {!isCollapsed && (
                            <Box mb="25px">
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <img 
                                        alt="profile-user"
                                        width="100px"
                                        height="100px"
                                        src={`../../assets/user.png`}
                                        style={{ cursor: "pointer", borderRadius: "50%"}}
                                    />
                                </Box>
                                <Box textAlign="center">
                                    <Typography
                                        variant="h2"
                                        color={colors.grey[100]}
                                        fontWeight="bold"
                                        sx={{ m: "10px 0 0 0"}}
                                    >
                                        LYRICS RED
                                    </Typography>
                                    <Typography variant="h5" color={colors.greenAccent[500]}>
                                        Admin
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                        
                        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                            <Typography
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{ m: "15px 0 5px 20px" }}
                            >
                                Data
                            </Typography>
                            <Item
                                title="Manage Clients"
                                to="/home/clients"
                                icon={<PersonOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Manage Projects"
                                to="/home/projects"
                                icon={<ApartmentIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Manage News"
                                to="/home/news"
                                icon={<NewspaperIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item 
                                title="Manage Applications"
                                to="/home/applications"
                                icon={<ReceiptLongIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Item 
                                title="Calendar"
                                to="/home/calendar"
                                icon={<CalendarTodayOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Typography
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{ m: "15px 0 5px 20px" }}
                            >
                                Forms
                            </Typography>
                            <Item 
                                title="Profile Form"
                                to="/home/profile-form"
                                icon={<PersonAddIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item 
                                title="Project Form"
                                to="/home/project-form"
                                icon={<DomainAddIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item 
                                title="Print Report"
                                to="/home/report-form"
                                icon={<ReceiptOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item 
                                title="News Form"
                                to="/home/news-form"
                                icon={<AddCommentIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </Box>
                    </Menu> 
                </Sidebar> 
            </ProSidebarProvider>
        </Box> 
    ) 
};
 
export default SideBar;