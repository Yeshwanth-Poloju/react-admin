import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import HikingOutlinedIcon from '@mui/icons-material/HikingOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';

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
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const userRole = localStorage.getItem('userRole'); // Retrieve user role
  const userName = localStorage.getItem('userName'); // Retrieve user's name


  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  {userRole === "admin" ? "Admin" : "User"}
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
                  src={`../../assets/profile-pic.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userName || "User"} {/* Display logged-in user's name */}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>

                  {userRole === "admin" ? "Administrator" : "Member"}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {userRole === 'admin' && ( // Admin-specific items
              <>
                <Item
                  title="Main Dashboard"
                  to="/"
                  icon={<DashboardIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Bookings"
                  to="/admin/bookings"
                  icon={<DashboardIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  My Dashboard
                </Typography>

                <Item
                  title="Admin Dashboard"
                  to="/dashboard"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="View Admin"
                  to="/admins"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Add Admin"
                  to="/addadmin"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Trip Content
                </Typography>

                <Item
                  title="Trip Dashboard"
                  to="/trips"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Add Trips"
                  to="/addtrips"
                  icon={<BarChartOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Edit Trips"
                  to="/viewtrips"
                  icon={<PieChartOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />


                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Trek Content
                </Typography>

                <Item
                  title="Trek Dashboard"
                  to="/treks"
                  icon={<HikingOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Add Trek"
                  to="/addTrek"
                  icon={<HikingOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Edit Trek"
                  to="/viewtreks"
                  icon={<HikingOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Transport
                </Typography>
                <Item
                  title="Add Vehicle"
                  to="/addvehicle"
                  icon={<AirportShuttleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="View Vehicle"
                  to="/viewvehicles"
                  icon={<AirportShuttleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Adventures
                </Typography>

                <Item
                  title="Adventure Dashboard"
                  to="/adventuredashboard"
                  icon={<LandscapeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Add adventures"
                  to="/addadventure"
                  icon={<LandscapeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Edit adventures"
                  to="/viewadventures"
                  icon={<LandscapeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Itineraries
                </Typography>

                <Item
                  title="Itinerary Dashboard"
                  to="/itinerarydashboard"
                  icon={<PieChartOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Add Itinerary"
                  to="/additinerary"
                  icon={<PieChartOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Edit Itineary"
                  to="/viewitinerary"
                  icon={<PieChartOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                {/* Add more admin-specific items... */}
              </>
            )}
            {userRole === 'user' && ( // User-specific items
              <>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  My Dashboard
                </Typography>
                <Item
                  title="Trip Dashboard"
                  to="/trips"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Trek Dashboard"
                  to="/treks"
                  icon={<HikingOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Adventure Dashboard"
                  to="/adventuredashboard"
                  icon={<LandscapeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Itinerary Dashboard"
                  to="/itinerarydashboard"
                  icon={<PieChartOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                {/* Add more user-specific items... */}
              </>
            )}


          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
