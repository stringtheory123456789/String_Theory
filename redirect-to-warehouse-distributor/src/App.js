import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, Button, ListItemIcon, Drawer, IconButton, useMediaQuery } from '@mui/material';
import { FaCloudShowersHeavy, FaWarehouse, FaStar, FaStarHalfAlt, FaBars, FaTimes, FaMapPin, FaCrosshairs } from "react-icons/fa";
import 'leaflet/dist/leaflet.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppBar, Toolbar } from '@mui/material';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { subWarehouses } from 'subwarehouses';
import { warehouses } from 'warehouses';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaLocationCrosshairs } from "react-icons/fa6";


const firebaseConfig = {
    apiKey: "AIzaSyAh0vGNcN-MrtUkanrIOdmu_DRgG4mDE9g",
    authDomain: "string-theory-af3f1.firebaseapp.com",
    projectId: "string-theory-af3f1",
    storageBucket: "string-theory-af3f1.appspot.com",
    messagingSenderId: "466466861907",
    appId: "1:466466861907:web:96b7e3c583b0454a2ba7a6",
    measurementId: "G-69NS2T21WN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
});

const mapPinIcon = L.divIcon({
    html: renderToStaticMarkup(<FaMapPin color="red" size="34px" />),
    className: '',
    iconSize: [35, 51],
    iconAnchor: [12, 24],
});

const mapsubPinIcon = L.divIcon({
    html: renderToStaticMarkup(<FaMapPin color="#4285F4" size="44px" />),
    className: '',
    iconSize: [35, 51],
    iconAnchor: [12, 24],
});


const HoveredIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [35, 51],
});

L.Marker.prototype.options.icon = DefaultIcon;

const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const totalStars = 5;

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {[...Array(fullStars)].map((_, index) => (
                <FaStar key={index} style={{ color: 'gold' }} />
            ))}
            {halfStar && <FaStarHalfAlt style={{ color: 'gold' }} />}
            {[...Array(totalStars - fullStars - (halfStar ? 1 : 0))].map((_, index) => (
                <FaStar key={index + fullStars + (halfStar ? 1 : 0)} style={{ color: 'gray' }} />
            ))}
        </div>
    );
};

function MapViewChanger({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

export default function App() {
    const [hoveredWarehouse, setHoveredWarehouse] = useState(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState({
        name: "Warehouse - Kalyani",
        location: "Kalyani, West Bengal",
        distance: "52.0 km",
        rating: 4.5,
        lat: 22.975,
        lng: 88.4345,
        code: "KALZ23"
    });
    const [viewSubWarehouses, setViewSubWarehouses] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');
    const markerRefs = useRef({});
    const [mapCenter, setMapCenter] = useState([22.955, 88.4145]);
    const [mapprevCenter, setMapprevCenter] = useState([22.955, 88.4145]);
    const [mapZoom, setMapZoom] = useState(14);
    const [darkstore, setDarkstore] = useState("kalyani");
    const [userlocation, setUserlocation] = useState(null);


    const fetchLocation = async () => {

        if (userlocation) {
            setUserlocation(null);

            await new Promise(resolve => setTimeout(resolve, 1000));

            setMapCenter(mapprevCenter);
            return;
        }
        
        try {
           
            setUserlocation([22.9647105, 88.5250003]);
            setMapprevCenter(mapCenter);
            setMapCenter([22.9647105, 88.5250003]);

        } catch (error) {
            console.error("Error:", error);
        }
    }


    const handleMouseEnter = (warehouse) => {
        setHoveredWarehouse(warehouse);
    };

    const handleMouseLeave = () => {
        setHoveredWarehouse(null);
    };
    const handleWarehouseClick = (warehouse) => {
        console.log('Selected warehouse:', warehouse);
        setSelectedWarehouse(warehouse);

        const darkstore = warehouse.name.split(" - ")[1].toLowerCase();
        setDarkstore(darkstore);
        console.log('Darkstore set to:', darkstore);

        console.log('Warehouse name split and processed:', warehouse.name.split(" - ")[1].toLowerCase());
        setViewSubWarehouses(true);
        console.log('View Sub Warehouses set to true');

        if (isMobile) {
            setDrawerOpen(false);
            console.log('Drawer closed due to mobile view');
        }

        const array = subWarehouses[warehouse.code];
        console.log('SubWarehouses array:', array);

        if (array && array.length > 0) {
            const middleIndex = Math.floor(array.length / 2);
            const { lat, lng } = array[middleIndex] || { lat: null, lng: null };
            console.log('Map center set to:', [lat, lng]);
            setMapCenter([lat, lng]);
            setMapZoom(14);
            console.log('Map zoom set to 14');
        } else {
            setMapCenter([0, 0]);
            console.log('Map center set to [0, 0]');
            setMapZoom(5);
            console.log('Map zoom set to 5');
        }

        console.log('Final warehouse object:', warehouse);

    };


    const handleSubWarehouseClick = (subWarehouse) => {
        console.log(subWarehouse)
        const marker = markerRefs.current[subWarehouse.name];
        if (marker) {
            marker.openPopup();
            setDrawerOpen(false);
        }
    };

    const donateClick = async (subWarehouse) => {
        console.log(darkstore)
        try {
            const docRef = doc(db, 'UserDetails', 'n98UPiF7TCbvuOZfbDovwpSbZVP2');
            await updateDoc(docRef, {
                Donate: 'yes',
                Warehouse: subWarehouse.name,
                Distributor: "null",
                Darkstore: darkstore
            });

            toast.success(
                <p>Warehouse <b>{subWarehouse.name}</b> is selected successfully</p>,
                {
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );

            console.log('Document updated successfully');
        } catch (error) {
            console.error('Error updating document:', error);

            toast.error(
                'Failed to update document. Please try again.',
                {
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );
        }
    };

    const donatedistributorClick = async (subWarehouse, dis) => {
        console.log(dis)
        try {
            const docRef = doc(db, 'UserDetails', 'n98UPiF7TCbvuOZfbDovwpSbZVP2');
            await updateDoc(docRef, {
                Donate: 'yes',
                Warehouse: subWarehouse.name,
                Distributor: dis || "none",
                Darkstore: darkstore
            });

            toast.success(
                <p>Warehouse <b>{subWarehouse.name}</b> and Distributor <b>{dis}</b> are selected successfully</p>,
                {
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );

            console.log('Document updated successfully');
        } catch (error) {
            console.error('Error updating document:', error);

            toast.error(
                'Failed to update document. Please try again.',
                {
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );
        }
    };

    const handleBackClick = () => {
        setViewSubWarehouses(false);
        setSelectedWarehouse(null);
        setMapCenter([22.7660, 88.3706])
        setMapZoom(11)
    };

    const currentWarehouses = viewSubWarehouses
        ? subWarehouses[selectedWarehouse?.code] || []
        : warehouses;

    const drawerContent = (
        <Box p={2}>
            <Paper elevation={3}>
                <Typography variant="h6" component="h2" p={2} align="center">
                    {viewSubWarehouses ? 'Sub Warehouses' : 'All Warehouses'}
                </Typography>

                <Divider />
                <List>
                    {currentWarehouses && Array.isArray(currentWarehouses) && currentWarehouses.map((warehouse) => (
                        <>
                            <ListItem
                                button
                                key={warehouse.code != null ? warehouse.code : warehouse.name}
                                onClick={() => viewSubWarehouses ? handleSubWarehouseClick(warehouse) : handleWarehouseClick(warehouse)}
                                onMouseEnter={() => handleMouseEnter(warehouse)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <ListItemIcon>
                                    <FaWarehouse />
                                </ListItemIcon>
                                <ListItemText
                                    primary={warehouse.name}
                                    secondary={
                                        <div>
                                            {warehouse.location || 'N/A'}
                                            {viewSubWarehouses && (
                                                <>
                                                    Total Profit = {warehouse.total_profit || 'N/A'}
                                                    <br />
                                                    Total Distributors = {warehouse.total_distributors || 'N/A'}
                                                </>
                                            )}
                                            {renderStars(warehouse.rating || 0)}
                                        </div>
                                    }
                                />
                            </ListItem>
                            <Divider />
                        </>
                    ))}
                </List>
                <br />
                {viewSubWarehouses && (
                    <Button variant="contained" color="primary" onClick={handleBackClick} style={{ margin: '10px' }}>
                        Back to Main Warehouses
                    </Button>
                )}
            </Paper>
        </Box>
    );

    return (
        <>
            {isMobile && (
                <AppBar position="fixed" style={{ zIndex: 1201, backgroundColor: 'rgba(0, 0, 0, 0.1)', boxShadow: 'none' }}>
                    <Toolbar style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <IconButton
                            edge="start"
                            aria-label="menu"
                            onClick={() => setDrawerOpen(prev => !prev)}
                            style={{ position: 'absolute', left: 10, color: '#000' }}
                        >
                            {drawerOpen ? <FaTimes /> : <FaBars />}
                        </IconButton>
                    </Toolbar>
                </AppBar>
            )}

            <Box display="flex" height="100vh">
                {isMobile ? (
                    <>
                        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                            {drawerContent}
                        </Drawer>
                    </>
                ) : (
                    <Box width="30%" p={2} overflow="auto">
                        {drawerContent}
                    </Box>
                )}
                <Box width={isMobile ? '100%' : '70%'} position="relative">
                    <MapContainer
                        center={mapCenter}
                        zoom={mapZoom}
                        style={{ height: '100%', width: '100%' }}
                        zoomControl={false}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {userlocation && (
                            <Marker
                                position={userlocation}
                                icon={DefaultIcon}
                            >
                                <Popup>
                                    <Typography variant="h6">Your Current Location</Typography>
                                    <Typography>Latitude: {userlocation[0] || 'N/A'}</Typography>
                                    <Typography>Longitude: {userlocation[1] || 0}</Typography>


                                </Popup>
                            </Marker>
                        )}

                        {currentWarehouses.map((warehouse) => (
                            <Marker
                                key={warehouse.code}
                                position={[warehouse.lat || 0, warehouse.lng || 0]}
                                icon={mapsubPinIcon}
                                ref={(ref) => {
                                    if (ref) {
                                        markerRefs.current[warehouse.code] = ref;
                                    }
                                }}
                            >
                                {viewSubWarehouses ? (
                                    <Popup>
                                        <Typography variant="h6">{warehouse.name}</Typography>
                                        <Typography>Profit: {warehouse.total_profit || 'N/A'}</Typography>
                                        <Typography>Rating: {renderStars(warehouse.rating || 0)}</Typography>

                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => donateClick(warehouse)}
                                                style={{ margin: '10px' }}
                                            >
                                                Donate (WAREHOUSE)
                                            </Button>
                                        </div>
                                    </Popup>
                                ) : (
                                    <Popup>
                                        <Typography variant="h6">{warehouse.name}</Typography>
                                        <Typography>Location: {warehouse.location || 'N/A'}</Typography>
                                        <Typography>Rating: {renderStars(warehouse.rating || 0)}</Typography>

                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleWarehouseClick(warehouse)}
                                                style={{ margin: '10px' }}
                                            >
                                                Select
                                            </Button>
                                        </div>
                                    </Popup>
                                )}
                            </Marker>
                        ))}

                        {currentWarehouses.map((warehouse) =>
                            warehouse.additional_locs && warehouse.additional_locs.length > 0 && (
                                warehouse.additional_locs.map((loc, index) => (
                                    <Marker
                                        key={`${warehouse.code}-sub-${index}`}
                                        position={[loc.lat, loc.lng]}
                                        icon={mapPinIcon}
                                    >
                                        <Popup>
                                            <Typography variant="h6">{loc.distributor_name} (DISTRIBUTOR)</Typography>
                                            <Typography>Rating: {renderStars(warehouse.rating || 0)}</Typography>

                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        donatedistributorClick(warehouse, loc.distributor_name)
                                                    }}
                                                    style={{ margin: '10px' }}
                                                >
                                                    Donate (WAREHOUSE + DISTRIBUTOR)
                                                </Button>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))
                            )
                        )}

                        <MapViewChanger center={mapCenter} zoom={mapZoom} />

                    </MapContainer>

                    { }
                    <Box
                        position="absolute"
                        bottom={100}
                        right={16}
                        zIndex={1201}
                        bgcolor="rgba(255, 255, 255, 0.7)"
                        borderRadius="50%"
                        padding={1}
                        boxShadow={2}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <IconButton
                            aria-label="center-map"
                            onClick={fetchLocation}
                        >
                            <FaLocationCrosshairs color="#000" size={24} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <ToastContainer />
        </>
    );

}    