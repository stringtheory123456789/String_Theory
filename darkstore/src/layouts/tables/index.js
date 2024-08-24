import React, { useState, useEffect } from 'react';
import { Card } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiBadge from "components/VuiBadge";
import VuiButton from 'components/VuiButton';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import { GiBowlOfRice, GiTomato, GiIceCreamCone, GiPizzaSlice, GiWheat, GiChickenOven, GiHotMeal, GiHamburger, GiNoodles, GiCupcake, GiMushroom, GiCheeseWedge, GiFishCooked, GiDonut } from 'react-icons/gi';
import { FaEye } from 'react-icons/fa';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import borders from 'assets/theme/base/borders';

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

function Tables() {
  const [foodItems, setFoodItems] = useState([]);
  const [foodHistory, setFoodHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyConfig, setHistoryConfig] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const kalyanifoodCollection = collection(db, 'darkstore/kalyani/foods');
      const unsubscribe = onSnapshot(kalyanifoodCollection, (snapshot) => {
        const fetchedItems = snapshot.docs.map(doc => ({
          docId: doc.id,
          id: doc.data().id,
          ...doc.data()
        }));
        setFoodItems(fetchedItems);
      });

      const kalyanifoodHistory = collection(db, 'darkstore/kalyani/foodhistory');
      const unsubscribe2 = onSnapshot(kalyanifoodHistory, (snapshot) => {
        const fetchedItems2 = snapshot.docs.map(doc => {
          const data = doc.data();
          const [arrivalDate, arrivalTime] = data.arrivalDateTime.split('|');

          return {
            docId: doc.id,
            id: data.id,
            arrivalDate,
            arrivalTime,
            icon: data.icon,
            productId: data.productId,
            quantity: data.quantity,
            shelfspan: data.shelfspan,
          };
        });

        setFoodHistory(fetchedItems2);
      });

      return () => {
        unsubscribe();
        unsubscribe2();
      };
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      const filteredHistory = foodHistory.filter(item => {
        const baseId = item.id.split('@')[0];
        return baseId === selectedItem.id;
      });

      setHistory(filteredHistory);
      setHistoryConfig(createTableConfig1(filteredHistory));
    }
  }, [selectedItem, foodHistory]);

  function FoodItem({ icon, name, description }) {
    let IconComponent;
    switch (icon) {
      case "<GiBowlOfRice size='24px' color='white' />":
        IconComponent = <GiBowlOfRice size="24px" color="white" />;
        break;
      case "<GiTomato size='24px' color='white' />":
        IconComponent = <GiTomato size="24px" color="white" />;
        break;
      case "<GiIceCreamCone size='24px' color='white' />":
        IconComponent = <GiIceCreamCone size="24px" color="white" />;
        break;
      case "<GiPizzaSlice size='24px' color='white' />":
        IconComponent = <GiPizzaSlice size="24px" color="white" />;
        break;
      case "<GiWheat size='24px' color='white' />":
        IconComponent = <GiWheat size="24px" color="white" />;
        break;
      case "<GiChickenOven size='24px' color='white' />":
        IconComponent = <GiChickenOven size="24px" color="white" />;
        break;
      case "<GiHotMeal size='24px' color='white' />":
        IconComponent = <GiHotMeal size="24px" color="white" />;
        break;
      case "<GiHamburger size='24px' color='white' />":
        IconComponent = <GiHamburger size="24px" color="white" />;
        break;
      case "<GiNoodles size='24px' color='white' />":
        IconComponent = <GiNoodles size="24px" color="white" />;
        break;
      case "<GiCupcake size='24px' color='white' />":
        IconComponent = <GiCupcake size="24px" color="white" />;
        break;
      case "<GiMushroom size='24px' color='white' />":
        IconComponent = <GiMushroom size="24px" color="white" />;
        break;
      case "<GiCheeseWedge size='24px' color='white' />":
        IconComponent = <GiCheeseWedge size="24px" color="white" />;
        break;
      case "<GiFishCooked size='24px' color='white' />":
        IconComponent = <GiFishCooked size="24px" color="white" />;
        break;
      case "<GiDonut size='24px' color='white' />":
        IconComponent = <GiDonut size="24px" color="white" />;
        break;
      default:
        IconComponent = null;
    }

    return (
      <VuiBox display="flex" alignItems="center" px={1} py={0.5}>
        <VuiBox mr={2}>{IconComponent}</VuiBox>
        <VuiBox display="flex" flexDirection="column">
          <VuiTypography variant="button" color="white" fontWeight="medium">
            {name}
          </VuiTypography>
          <VuiTypography variant="caption" color="text">
            {description}
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    );
  }

  function StatusBadge({ status }) {
    return (
      <VuiBadge
        variant="standard"
        badgeContent={status}
        container
        sx={{
          color: status === 'Available' ? 'green' : 'red',
          background: 'unset',
          border: 'none',
          fontWeight: 'bold',
        }}
      />
    );
  }

  function ActionIcon({ item }) {
    const handleClick = () => {
      setSelectedItem(item);
    };

    return (
      <FaEye
        size="18px"
        color="white"
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
      />
    );
  }

  const createTableConfig = (items) => ({
    columns: [
      { name: 'foodItem', align: 'left' },
      { name: 'description', align: 'left' },
      { name: 'total', align: 'center' },
      { name: 'status', align: 'center' },
      { name: 'action', align: 'center' },
    ],
    rows: items.map(item => ({
      id: item.id,
      foodItem: <FoodItem icon={item.icon} name={item.name} description={item.description} />,
      description: (
        <VuiTypography variant="caption" color="text" fontWeight="medium">
          {item.details}
        </VuiTypography>
      ),
      status: <StatusBadge status={item.totalleft > 0 ? 'Available' : 'Out of Stock'} />,
      action: <ActionIcon item={item} />,
      total: (
        <VuiTypography variant="caption" color="text" fontWeight="medium">
          {item.totalleft}
        </VuiTypography>
      ),
    })),
  });

  const createTableConfig1 = (items) => ({
    columns: [
      { name: 'sl_no', align: 'center' },

      { name: 'unique_id', align: 'center' },
      { name: 'arrival_date', align: 'center' },
      { name: 'arrival_time', align: 'center' },
      { name: 'shelf_span', align: 'center' },
    ],
    rows: items.map((item, index) => ({
      sl_no: (
        <VuiTypography variant="caption" color="text" fontWeight="medium">
          {index + 1}
        </VuiTypography>
      ),
      unique_id: (
        <VuiTypography variant="caption" color="text" fontWeight="medium">
          {item.id}
        </VuiTypography>
      ),
      arrival_date: (
        <VuiTypography variant="caption" color="text" fontWeight="medium">
          {item.arrivalDate}
        </VuiTypography>
      ),
      arrival_time: (
        <VuiTypography variant="caption" color="text" fontWeight="medium">
          {item.arrivalTime}
        </VuiTypography>
      ),
      shelf_span: (
        <VuiTypography variant="caption" color="text" fontWeight="medium">
          {item.shelfspan}
        </VuiTypography>
      ),
    })),
  });



  const cookedItems = foodItems.filter(item => item.type === 'cooked');
  const uncookedItems = foodItems.filter(item => item.type === 'uncooked');
  const frozenItems = foodItems.filter(item => item.type === 'frozen');

  const cookedTableConfig = createTableConfig(cookedItems);
  const uncookedTableConfig = createTableConfig(uncookedItems);
  const frozenTableConfig = createTableConfig(frozenItems);


  return (
    <DashboardLayout>
      <VuiBox py={3}>
        {selectedItem && historyConfig ? (
          <>
            <Card>
              <VuiBox mb={3}>
                <Card>
                  <VuiBox display="flex" justifyContent="flex-start" mb="22px">
                    <VuiTypography variant="lg" color="white">
                      <GiBowlOfRice size="24px" color="white" style={{ marginRight: "4px" }} />
                    </VuiTypography>
                    <VuiTypography variant="lg" color="white">
                      {selectedItem.name}
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox
                    sx={{
                      height: '300px',
                      overflowY: 'auto',
                      "& th": {
                        borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                          `${borderWidth[1]} solid ${grey[700]}`,
                      },
                      "& .MuiTableRow-root:not(:last-child)": {
                        "& td": {
                          borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                            `${borderWidth[1]} solid ${grey[700]}`,
                        },
                      },
                    }}
                  >
                    <Table columns={historyConfig.columns} rows={historyConfig.rows} />
                  </VuiBox>

                  <VuiBox display="flex" justifyContent="flex-end" mb={3}>
                    <VuiButton
                      onClick={() => {
                        setSelectedItem(null);
                        setHistoryConfig(null);
                      }}
                      variant="contained"
                      color="primary"
                    >
                      GO BACK
                    </VuiButton>
                  </VuiBox>
                </Card>
              </VuiBox>

            </Card>
            <br /><br />
          </>
        ) : (

          <>
            <VuiBox mb={3}>
              <Card>
                <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
                  <VuiTypography variant="lg" color="white">
                    Cooked Food Items Table
                  </VuiTypography>
                </VuiBox>
                <VuiBox
                  sx={{
                    height: '300px',
                    overflowY: 'auto',
                    "& th": {
                      borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                        `${borderWidth[1]} solid ${grey[700]}`,
                    },
                    "& .MuiTableRow-root:not(:last-child)": {
                      "& td": {
                        borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                          `${borderWidth[1]} solid ${grey[700]}`,
                      },
                    },
                  }}
                >
                  <Table columns={cookedTableConfig.columns} rows={cookedTableConfig.rows} />
                </VuiBox>
              </Card>
            </VuiBox>
            <VuiBox mb={3}>
              <Card>
                <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
                  <VuiTypography variant="lg" color="white">
                    Uncooked Food Items Table
                  </VuiTypography>
                </VuiBox>
                <VuiBox
                  sx={{
                    height: '300px',
                    overflowY: 'auto',
                    "& th": {
                      borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                        `${borderWidth[1]} solid ${grey[700]}`,
                    },
                    "& .MuiTableRow-root:not(:last-child)": {
                      "& td": {
                        borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                          `${borderWidth[1]} solid ${grey[700]}`,
                      },
                    },
                  }}
                >
                  <Table columns={uncookedTableConfig.columns} rows={uncookedTableConfig.rows} />
                </VuiBox>
              </Card>
            </VuiBox>
            <VuiBox mb={3}>
              <Card>
                <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
                  <VuiTypography variant="lg" color="white">
                    Frozen Food Items Table
                  </VuiTypography>
                </VuiBox>
                <VuiBox
                  sx={{
                    height: '300px',
                    overflowY: 'auto',
                    "& th": {
                      borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                        `${borderWidth[1]} solid ${grey[700]}`,
                    },
                    "& .MuiTableRow-root:not(:last-child)": {
                      "& td": {
                        borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                          `${borderWidth[1]} solid ${grey[700]}`,
                      },
                    },
                  }}
                >
                  <Table columns={frozenTableConfig.columns} rows={frozenTableConfig.rows} />
                </VuiBox>
              </Card>
            </VuiBox>
          </>
        )}
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
