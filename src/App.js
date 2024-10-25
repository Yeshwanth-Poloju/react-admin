import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Login from "./scenes/login";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import AddTrips from "./scenes/Trips/addtrip";
import AllTrips from "./scenes/Trips/tripDashboard";
import ViewTrips from "./scenes/Trips/viewtrips";
import EditTrips from "./scenes/Trips/edittrips";
import AddTrek from './scenes/Treks/addTrek';
import ViewTreks from './scenes/Treks/ViewTreks';
import EditTrek from './scenes/Treks/EditTrek';
import AllTreks from "./scenes/Treks/TrekDashboard";
import AddAdventure from "./scenes/Adventures/AddAdventure";
import ViewAdventure from "./scenes/Adventures/ViewAdventure";
import AdventureDashboard from "./scenes/Adventures/AdventureDashboard";
import EditAdventure from "./scenes/Adventures/EditAdventure";
import AddItinerary from "./scenes/Itinerary/AddItinerary"; // Import AddItinerary
import ViewItinerary from "./scenes/Itinerary/ViewItinerary"; // Import ViewItinerary
import EditItinerary from "./scenes/Itinerary/EditItinerary"; // Import EditItinerary
import ItineraryDashboard from "./scenes/Itinerary/ItineraryDashboard"; // Import ItineraryDashboard

import AddVehicle from './scenes/Vehicle/AddVehicle';
import ViewVehicle from './scenes/Vehicle/ViewVehicle';

import AddAdmin from './scenes/Admin/AddAdmin';
import ViewAdmin from './scenes/Admin/ViewAdmin';
import EditAdmin from './scenes/Admin/EditAdmin';
import AdminList from './scenes/Admin/AdminList';


function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const navigate = useNavigate();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/team" element={<Team />} />
                            <Route path="/contacts" element={<Contacts />} />
                            <Route path="/invoices" element={<Invoices />} />
                            <Route path="/form" element={<Form />} />
                            <Route path="/bar" element={<Bar />} />
                            <Route path="/pie" element={<Pie />} />
                            <Route path="/line" element={<Line />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/geography" element={<Geography />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/trips" element={<AllTrips />} />
                            <Route path="/addtrips" element={<AddTrips />} />
                            <Route path="/viewtrips" element={<ViewTrips />} />
                            <Route path="/edittrips/:tripId" element={<EditTrips />} />

                            <Route path="/addvehicle" element={<AddVehicle />} />
                            <Route path="/viewvehicles" element={<ViewVehicle />} />    

                            {/* Trek Routes */}
                            <Route path="/addtrek" element={<AddTrek />} />
                            <Route path="/viewtreks" element={<ViewTreks />} />
                            <Route path="/editTrek/:trekId" element={<EditTrek />} />
                            <Route path="/treks" element={<AllTreks />} />

                            {/* Adventure Routes */}
                            <Route path="/addadventure" element={<AddAdventure />} />
                            <Route path="/viewadventures" element={<ViewAdventure />} />
                            <Route path="/adventuredashboard" element={<AdventureDashboard />} />
                            <Route path="/editadventure/:adventureId" element={<EditAdventure />} />

                            {/* Itinerary Routes */}
                            <Route path="/additinerary" element={<AddItinerary />} />
                            <Route path="/viewitinerary" element={<ViewItinerary />} />
                            <Route path="/edititinerary/:itineraryId" element={<EditItinerary />} />
                            <Route path="/itinerarydashboard" element={<ItineraryDashboard />} />

                            <Route path="/addadmin" element={< AddAdmin />} />
                            <Route path="/admins" element={<ViewAdmin />} />
                            <Route path="/editadmin/:id" element={<EditAdmin />} />
                            <Route path="/dashboard" element={<AdminList />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;