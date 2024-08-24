import React, { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

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

const uploadFoodItems = async (collectionName) => {
  const locationDocRef = doc(db, `darkstore/${collectionName}/locations/loc`);

  try {
    await setDoc(locationDocRef, {
      lat: 22.9747,
      long: 88.4337

    }, { merge: true });
    console.log("Location updated with latitude and longitude");
  } catch (e) {
    console.error("Error updating location: ", e);
  }
};

function Upload2() {
  useEffect(() => {
    const uploadAllLocations = async () => {
      await uploadFoodItems("kalyani");
    };

    uploadAllLocations();
  }, []);

  return (
    <div className="App">
      <h1>Uploading Food Items to All Locations...</h1>
      <p>Check the console for the upload status.</p>
    </div>
  );
}

export default Upload2;
