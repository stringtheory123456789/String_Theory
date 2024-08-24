import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const defaultIcon = L.icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function OrdersOverview() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationDocRef = doc(db, 'darkstore/kalyani/locations', 'loc');
        const unsubscribe = onSnapshot(locationDocRef, (doc) => {
          const data = doc.data();
          if (data) {
            setLocation({
              lat: data.lat,
              long: data.long,
            });
          } else {
            console.error("No location data found");
            toast.error("No location data found");
          }
        }, (error) => {
          console.error("Error fetching document:", error);
          toast.error("Error fetching document");
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error in fetchData:", error);
        toast.error("An error occurred while fetching data");
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="h-100">
      <VuiBox mb="16px">
        <VuiTypography variant="lg" fontWeight="bold" mb="5px" color="white">
          Location
        </VuiTypography>
      </VuiBox>
      <VuiBox height="400px">
        {location ? (
          <MapContainer
            center={[location.lat, location.long]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.lat, location.long]} icon={defaultIcon}>
              <Popup>
                Kalyani DARK STORE
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p>Loading location...</p>
        )}
      </VuiBox>
      <ToastContainer />
    </Card>
  );
}

export default OrdersOverview;
