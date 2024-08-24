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

const foodItemsCooked = [
  {
    id: 1,
    icon: "<GiBowlOfRice size='24px' color='white' />",
    name: 'Biriyani',
    description: 'Spiced rice with meat',
    status: 'Available',
    action: 'Available',
    details: 'Delicious blend of spices and tender meat.',
    price: 250,
    type: 'cooked',
    totalleft: 20
  },
  {
    id: 2,
    icon: "<GiTomato size='24px' color='white' />",
    name: 'Tomato Soup',
    description: 'Creamy tomato soup',
    status: 'Out of Stock',
    action: 'Out of Stock',
    details: 'Smooth and rich tomato flavor.',
    price: 150,
    type: 'cooked',
    totalleft: 0
  },
  {
    id: 3,
    icon: "<GiIceCreamCone size='24px' color='white' />",
    name: 'Ice Cream',
    description: 'Vanilla flavor',
    status: 'Available',
    action: 'Available',
    details: 'Creamy vanilla ice cream.',
    price: 120,
    type: 'cooked',
    totalleft: 15
  },
  {
    id: 10,
    icon: "<GiChickenOven size='24px' color='white' />",
    name: 'Roast Chicken',
    description: 'Oven-roasted chicken',
    status: 'Available',
    action: 'Available',
    details: 'Juicy roast chicken with a crispy skin.',
    price: 300,
    type: 'cooked',
    totalleft: 10
  },
  {
    id: 11,
    icon: "<GiHotMeal size='24px' color='white' />",
    name: 'Hot Meal',
    description: 'A hearty hot meal',
    status: 'Available',
    action: 'Available',
    details: 'A delicious and filling hot meal.',
    price: 200,
    type: 'cooked',
    totalleft: 30
  },
  {
    id: 12,
    icon: "<GiHamburger size='24px' color='white' />",
    name: 'Burger',
    description: 'Classic beef burger',
    status: 'Available',
    action: 'Available',
    details: 'Juicy beef burger with fresh toppings.',
    price: 180,
    type: 'cooked',
    totalleft: 25
  },
  {
    id: 13,
    icon: "<GiNoodles size='24px' color='white' />",
    name: 'Noodles',
    description: 'Stir-fried noodles',
    status: 'Available',
    action: 'Available',
    details: 'Stir-fried noodles with vegetables.',
    price: 150,
    type: 'cooked',
    totalleft: 40
  },
  {
    id: 14,
    icon: "<GiCupcake size='24px' color='white' />",
    name: 'Cupcake',
    description: 'Chocolate cupcake',
    status: 'Available',
    action: 'Available',
    details: 'Delicious chocolate cupcake with frosting.',
    price: 90,
    type: 'cooked',
    totalleft: 35
  },
  {
    id: 15,
    icon: "<GiMushroom size='24px' color='white' />",
    name: 'Mushroom Soup',
    description: 'Creamy mushroom soup',
    status: 'Available',
    action: 'Available',
    details: 'Rich and creamy mushroom soup.',
    price: 160,
    type: 'cooked',
    totalleft: 20
  },
  {
    id: 16,
    icon: "<GiPizzaSlice size='24px' color='white' />",
    name: 'Pizza Slice',
    description: 'Cheese pizza slice',
    status: 'Available',
    action: 'Available',
    details: 'Cheese pizza with a crispy crust.',
    price: 130,
    type: 'cooked',
    totalleft: 15
  },
  {
    id: 17,
    icon: "<GiCheeseWedge size='24px' color='white' />",
    name: 'Cheese Wedge',
    description: 'Wedge of fine cheese',
    status: 'Available',
    action: 'Available',
    details: 'Perfect for sandwiches and pasta.',
    price: 180,
    type: 'cooked',
    totalleft: 25
  },
  {
    id: 18,
    icon: "<GiDonut size='24px' color='white' />",
    name: 'Donut',
    description: 'Freshly baked Donut',
    status: 'Available',
    action: 'Available',
    details: 'Delicious Donut with sugar glaze.',
    price: 70,
    type: 'cooked',
    totalleft: 40
  }
];

const foodItemsUncooked = [
  {
    id: 4,
    icon: "<GiWheat size='24px' color='white' />",
    name: 'Wheat Flour',
    description: 'Basic wheat flour for baking',
    status: 'Available',
    action: 'Available',
    details: 'High-quality flour for all baking needs.',
    price: 80,
    type: 'uncooked',
    totalleft: 50
  },
  {
    id: 5,
    icon: "<GiTomato size='24px' color='white' />",
    name: 'Tomato Puree',
    description: 'Pureed tomatoes for cooking',
    status: 'Available',
    action: 'Available',
    details: 'Freshly pureed tomatoes with no preservatives.',
    price: 60,
    type: 'uncooked',
    totalleft: 30
  },
  {
    id: 6,
    icon: "<GiBowlOfRice size='24px' color='white' />",
    name: 'Rice',
    description: 'Long-grain rice',
    status: 'Out of Stock',
    action: 'Out of Stock',
    details: 'Premium long-grain rice suitable for various dishes.',
    price: 100,
    type: 'uncooked',
    totalleft: 0
  },
  {
    id: 21,
    icon: "<GiCheeseWedge size='24px' color='white' />",
    name: 'Cheese Wedge',
    description: 'A wedge of fine cheese',
    status: 'Available',
    action: 'Available',
    details: 'Perfect for sandwiches and pasta.',
    price: 180,
    type: 'uncooked',
    totalleft: 25
  },
  {
    id: 22,
    icon: "<GiFishCooked size='24px' color='white' />",
    name: 'Fresh Fish',
    description: 'Fresh fish for cooking',
    status: 'Available',
    action: 'Available',
    details: 'Freshly caught fish, ready to cook.',
    price: 220,
    type: 'uncooked',
    totalleft: 40
  },
  {
    id: 23,
    icon: "<GiMushroom size='24px' color='white' />",
    name: 'Mushrooms',
    description: 'Fresh mushrooms',
    status: 'Available',
    action: 'Available',
    details: 'Fresh mushrooms for cooking.',
    price: 90,
    type: 'uncooked',
    totalleft: 25
  },
  {
    id: 24,
    icon: "<GiDonut size='24px' color='white' />",
    name: 'Donut Mix',
    description: 'Mix for making Donuts',
    status: 'Available',
    action: 'Available',
    details: 'Ready-to-use mix for making delicious Donuts.',
    price: 110,
    type: 'uncooked',
    totalleft: 15
  },
  {
    id: 25,
    icon: "<GiNoodles size='24px' color='white' />",
    name: 'Noodle Mix',
    description: 'Mix for making noodles',
    status: 'Available',
    action: 'Available',
    details: 'Mix for preparing a quick noodle dish.',
    price: 90,
    type: 'uncooked',
    totalleft: 20
  }
];

const foodItemsFrozen = [
  {
    id: 7,
    icon: "<GiIceCreamCone size='24px' color='white' />",
    name: 'Frozen Ice Cream',
    description: 'Vanilla flavor ice cream',
    status: 'Available',
    action: 'Available',
    details: 'Creamy vanilla ice cream, kept frozen for quality.',
    price: 200,
    type: 'frozen',
    totalleft: 25
  },
  {
    id: 8,
    icon: "<GiBowlOfRice size='24px' color='white' />",
    name: 'Frozen Rice',
    description: 'Pre-cooked frozen rice',
    status: 'Available',
    action: 'Available',
    details: 'Convenient pre-cooked rice, just heat and serve.',
    price: 150,
    type: 'frozen',
    totalleft: 30
  },
  {
    id: 9,
    icon: "<GiHamburger size='24px' color='white' />",
    name: 'Frozen Burger Patties',
    description: 'Pre-made burger patties',
    status: 'Available',
    action: 'Available',
    details: 'Juicy burger patties, ready to cook from frozen.',
    price: 250,
    type: 'frozen',
    totalleft: 20
  },
  {
    id: 26,
    icon: "<GiPizzaSlice size='24px' color='white' />",
    name: 'Frozen Pizza',
    description: 'Frozen cheese pizza',
    status: 'Available',
    action: 'Available',
    details: 'Frozen cheese pizza, ready to bake.',
    price: 250,
    type: 'frozen',
    totalleft: 15
  },
  {
    id: 27,
    icon: "<GiHotMeal size='24px' color='white' />",
    name: 'Frozen Hot Meal',
    description: 'Frozen hot meal package',
    status: 'Available',
    action: 'Available',
    details: 'Complete hot meal, just heat up and enjoy.',
    price: 300,
    type: 'frozen',
    totalleft: 10
  },
  {
    id: 28,
    icon: "<GiCupcake size='24px' color='white' />",
    name: 'Frozen Cupcake',
    description: 'Frozen chocolate cupcake',
    status: 'Available',
    action: 'Available',
    details: 'Chocolate cupcakes, frozen for freshness.',
    price: 100,
    type: 'frozen',
    totalleft: 40
  },
  {
    id: 29,
    icon: "<GiChickenOven size='24px' color='white' />",
    name: 'Frozen Roast Chicken',
    description: 'Frozen roast chicken',
    status: 'Available',
    action: 'Available',
    details: 'Frozen roast chicken, just heat and serve.',
    price: 350,
    type: 'frozen',
    totalleft: 25
  },
  {
    id: 30,
    icon: "<GiCheeseWedge size='24px' color='white' />",
    name: 'Frozen Cheese Wedge',
    description: 'Frozen cheese wedge',
    status: 'Available',
    action: 'Available',
    details: 'Frozen cheese wedge, great for cooking.',
    price: 200,
    type: 'frozen',
    totalleft: 30
  },
  {
    id: 31,
    icon: "<GiTomato size='24px' color='white' />",
    name: 'Frozen Tomato Puree',
    description: 'Frozen tomato puree',
    status: 'Available',
    action: 'Available',
    details: 'Frozen tomato puree for cooking.',
    price: 130,
    type: 'frozen',
    totalleft: 20
  },
  {
    id: 32,
    icon: "<GiNoodles size='24px' color='white' />",
    name: 'Frozen Noodles',
    description: 'Frozen noodles package',
    status: 'Available',
    action: 'Available',
    details: 'Frozen noodles, quick and easy meal option.',
    price: 120,
    type: 'frozen',
    totalleft: 35
  }
  
];


const allFoodItems = [...foodItemsCooked, ...foodItemsUncooked, ...foodItemsFrozen];

const uploadFoodItems = async (collectionName) => {
  const collectionRef = collection(db, `darkstore/${collectionName}/foods`);

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

function Upload() {
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

export default Upload;
