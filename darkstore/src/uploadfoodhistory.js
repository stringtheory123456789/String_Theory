import React, { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

const allFoodItems = [
  {
    id: "1@18082024|1545-0",
    productId: "1",
    icon: "<GiBowlOfRice size=\"24px\" color=\"white\" />",
    quantity: "5",
    arrivalDateTime: "18/08/2024|15:45",
    shelfspan: "2 days",
    marketPrice: 100,
    expirationDateTime: "20/08/2024",
    price: 96
  },
  {
    id: "2@18082024|1630-0",
    productId: "2",
    icon: "<GiTomato size=\"24px\" color=\"white\" />",
    quantity: "6",
    arrivalDateTime: "18/08/2024|16:30",
    shelfspan: "3 days",
    marketPrice: 80,
    expirationDateTime: "21/08/2024",
    price: 73
  },
  {
    id: "3@19082024|1226-0",
    productId: "3",
    icon: "<GiIceCreamCone size=\"24px\" color=\"white\" />",
    quantity: "15",
    arrivalDateTime: "19/08/2024|12:26",
    shelfspan: "2 days",
    marketPrice: 150,
    expirationDateTime: "21/08/2024",
    price: 146
  },
  {
    id: "4@19082024|1005-0",
    productId: "4",
    icon: "<GiWheat size=\"24px\" color=\"white\" />",
    quantity: "50",
    arrivalDateTime: "19/08/2024|10:05",
    shelfspan: "5 days",
    marketPrice: 200,
    expirationDateTime: "24/08/2024",
    price: 190
  },
  {
    id: "5@19082024|1030-0",
    productId: "5",
    icon: "<GiTomato size=\"24px\" color=\"white\" />",
    quantity: "30",
    arrivalDateTime: "19/08/2024|10:30",
    shelfspan: "4 days",
    marketPrice: 90,
    expirationDateTime: "23/08/2024",
    price: 82
  },
  {
    id: "6@20082024|1100-0",
    productId: "6",
    icon: "<GiBowlOfRice size=\"24px\" color=\"white\" />",
    quantity: "0",
    arrivalDateTime: "20/08/2024|11:00",
    shelfspan: "3 days",
    marketPrice: 100,
    expirationDateTime: "23/08/2024",
    price: 94
  },
  {
    id: "7@20082024|1430-0",
    productId: "7",
    icon: "<GiIceCreamCone size=\"24px\" color=\"white\" />",
    quantity: "25",
    arrivalDateTime: "20/08/2024|14:30",
    shelfspan: "4 days",
    marketPrice: 150,
    expirationDateTime: "24/08/2024",
    price: 142
  },
  {
    id: "8@21082024|1700-0",
    productId: "8",
    icon: "<GiBowlOfRice size=\"24px\" color=\"white\" />",
    quantity: "40",
    arrivalDateTime: "21/08/2024|17:00",
    shelfspan: "5 days",
    marketPrice: 100,
    expirationDateTime: "26/08/2024",
    price: 90
  },
  {
    id: "9@21082024|1830-0",
    productId: "9",
    icon: "<GiPizzaSlice size=\"24px\" color=\"white\" />",
    quantity: "20",
    arrivalDateTime: "21/08/2024|18:30",
    shelfspan: "2 days",
    marketPrice: 120,
    expirationDateTime: "23/08/2024",
    price: 116
  },
  {
    id: "1@22082024|1930-1",
    productId: "1",
    icon: "<GiBowlOfRice size=\"24px\" color=\"white\" />",
    quantity: "20",
    arrivalDateTime: "22/08/2024|19:30",
    shelfspan: "2 days",
    marketPrice: 100,
    expirationDateTime: "24/08/2024",
    price: 96
  },
  {
    id: "2@23082024|0900-2",
    productId: "2",
    icon: "<GiTomato size=\"24px\" color=\"white\" />",
    quantity: "6",
    arrivalDateTime: "23/08/2024|09:00",
    shelfspan: "3 days",
    marketPrice: 80,
    expirationDateTime: "26/08/2024",
    price: 73
  },
  {
    id: "3@24082024|1000-1",
    productId: "3",
    icon: "<GiIceCreamCone size=\"24px\" color=\"white\" />",
    quantity: "10",
    arrivalDateTime: "24/08/2024|10:00",
    shelfspan: "4 days",
    marketPrice: 150,
    expirationDateTime: "28/08/2024",
    price: 142
  },
  {
    id: "4@24082024|1100-2",
    productId: "4",
    icon: "<GiWheat size=\"24px\" color=\"white\" />",
    quantity: "40",
    arrivalDateTime: "24/08/2024|11:00",
    shelfspan: "5 days",
    marketPrice: 200,
    expirationDateTime: "29/08/2024",
    price: 190
  },
  {
    id: "5@24082024|1200-1",
    productId: "5",
    icon: "<GiTomato size=\"24px\" color=\"white\" />",
    quantity: "30",
    arrivalDateTime: "24/08/2024|12:00",
    shelfspan: "3 days",
    marketPrice: 90,
    expirationDateTime: "27/08/2024",
    price: 82
  },
  {
    id: "6@24082024|1300-2",
    productId: "6",
    icon: "<GiBowlOfRice size=\"24px\" color=\"white\" />",
    quantity: "20",
    arrivalDateTime: "24/08/2024|13:00",
    shelfspan: "3 days",
    marketPrice: 100,
    expirationDateTime: "27/08/2024",
    price: 94
  },
  {
    id: "7@24082024|1400-1",
    productId: "7",
    icon: "<GiIceCreamCone size=\"24px\" color=\"white\" />",
    quantity: "20",
    arrivalDateTime: "24/08/2024|14:00",
    shelfspan: "2 days",
    marketPrice: 150,
    expirationDateTime: "26/08/2024",
    price: 146
  },
  {
    id: "8@24082024|1500-2",
    productId: "8",
    icon: "<GiBowlOfRice size=\"24px\" color=\"white\" />",
    quantity: "30",
    arrivalDateTime: "24/08/2024|15:00",
    shelfspan: "4 days",
    marketPrice: 100,
    expirationDateTime: "28/08/2024",
    price: 90
  },
  {
    id: "9@24082024|1600-1",
    productId: "9",
    icon: "<GiPizzaSlice size=\"24px\" color=\"white\" />",
    quantity: "20",
    arrivalDateTime: "24/08/2024|16:00",
    shelfspan: "2 days",
    marketPrice: 120,
    expirationDateTime: "26/08/2024",
    price: 116
  },
  {
    id: "1@24082024|1700-3",
    productId: "1",
    icon: "<GiBowlOfRice size=\"24px\" color=\"white\" />",
    quantity: "15",
    arrivalDateTime: "24/08/2024|17:00",
    shelfspan: "3 days",
    marketPrice: 100,
    expirationDateTime: "27/08/2024",
    price: 94
  },
  {
    id: "2@24082024|1800-3",
    productId: "2",
    icon: "<GiTomato size=\"24px\" color=\"white\" />",
    quantity: "6",
    arrivalDateTime: "24/08/2024|18:00",
    shelfspan: "2 days",
    marketPrice: 80,
    expirationDateTime: "26/08/2024",
    price: 73
  },
  {
    id: "3@24082024|1900-2",
    productId: "3",
    icon: "<GiIceCreamCone size=\"24px\" color=\"white\" />",
    quantity: "10",
    arrivalDateTime: "24/08/2024|19:00",
    shelfspan: "5 days",
    marketPrice: 150,
    expirationDateTime: "29/08/2024",
    price: 140
  },
  {
    id: "4@24082024|2000-3",
    productId: "4",
    icon: "<GiWheat size=\"24px\" color=\"white\" />",
    quantity: "20",
    arrivalDateTime: "24/08/2024|20:00",
    shelfspan: "3 days",
    marketPrice: 200,
    expirationDateTime: "27/08/2024",
    price: 190
  },
  {
    id: "5@25082024|0930-1",
    productId: "5",
    icon: "<GiTomato size=\"24px\" color=\"white\" />",
    quantity: "10",
    arrivalDateTime: "25/08/2024|09:30",
    shelfspan: "4 days",
    marketPrice: 90,
    expirationDateTime: "29/08/2024",
    price: 82
  },
  {
    id: "6@25082024|1030-2",
    productId: "6",
    icon: "<GiBowlOfRice size=\"24px\" color=\"white\" />",
    quantity: "15",
    arrivalDateTime: "25/08/2024|10:30",
    shelfspan: "2 days",
    marketPrice: 100,
    expirationDateTime: "27/08/2024",
    price: 96
  },
  {
    id: "7@25082024|1130-1",
    productId: "7",
    icon: "<GiIceCreamCone size=\"24px\" color=\"white\" />",
    quantity: "25",
    arrivalDateTime: "25/08/2024|11:30",
    shelfspan: "3 days",
    marketPrice: 150,
    expirationDateTime: "28/08/2024",
    price: 144
  },
  {
    id: "8@25082024|1230-2",
    productId: "8",
    icon: "<GiBowlOfRice size=\"24px\" color=\"white\" />",
    quantity: "30",
    arrivalDateTime: "25/08/2024|12:30",
    shelfspan: "2 days",
    marketPrice: 100,
    expirationDateTime: "27/08/2024",
    price: 96
  },
  {
    id: "9@25082024|1330-1",
    productId: "9",
    icon: "<GiPizzaSlice size=\"24px\" color=\"white\" />",
    quantity: "10",
    arrivalDateTime: "25/08/2024|13:30",
    shelfspan: "4 days",
    marketPrice: 120,
    expirationDateTime: "29/08/2024",
    price: 116
  }
];

const uploadFoodItems = async (collectionName) => {
  const collectionRef = collection(db, `darkstore/${collectionName}/foodhistory`);

  for (const item of allFoodItems) {
    const newItem = {
      ...item,
      id: `${collectionName}_${item.id}`
    };

    try {
      await addDoc(collectionRef, newItem);
      console.log(`Uploaded ${item.name} to ${collectionName}`);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
};

function Upload3() {
  useEffect(() => {
    const uploadAllLocations = async () => {
      await uploadFoodItems("barrackpore");
      await uploadFoodItems("kalyani");
      await uploadFoodItems("haringhata");
      await uploadFoodItems("kolkata");
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

export default Upload3;