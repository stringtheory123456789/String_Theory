import React, { useState, useEffect } from 'react';
import { Card, Grid, LinearProgress, Stack } from "@mui/material";
import { GiBowlOfRice, GiTomato, GiIceCreamCone, GiPizzaSlice, GiWheat, GiChickenOven, GiHotMeal, GiHamburger, GiNoodles, GiCupcake, GiMushroom, GiCheeseWedge, GiFishCooked, GiDonut } from 'react-icons/gi';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { IoIosRocket, IoGlobe, IoBuild, IoWallet, IoDocumentText } from "react-icons/io5";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

import VuiBox from "components/VuiBox";
import VuiProgress from 'components/VuiProgress';
import VuiTypography from "components/VuiTypography";
import VuiBadge from "components/VuiBadge";
import VuiButton from 'components/VuiButton';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";

import borders from 'assets/theme/base/borders';
import linearGradient from "assets/theme/functions/linearGradient";
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";

import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";

import Food from "./Foodie";
import uncooked from "../../assets/images/unnamed3.png";
import cooked from "../../assets/images/cooked.jpg";
import frozen from "../../assets/images/unnamed4.jpg"

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

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [clicked, setClicked] = useState(true)
  const [clickedFood, setClickedFood] = useState("")
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

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

      return unsubscribe;
    };

    fetchData();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      total: (
        <VuiTypography variant="caption" color="text" fontWeight="medium">
          {item.totalleft}
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
        {clicked ? (
          <>
            <VuiBox mb={3}>
              {screenWidth > 800 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} xl={3}>
                    <MiniStatisticsCard
                      title={{ text: "today's money", fontWeight: "regular" }}
                      count="₹53,000"
                      percentage={{ color: "success", text: "+55%" }}
                      icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    <MiniStatisticsCard
                      title={{ text: "today's users" }}
                      count="2,300"
                      percentage={{ color: "success", text: "+3%" }}
                      icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    <MiniStatisticsCard
                      title={{ text: "new distributers" }}
                      count="+3,462"
                      percentage={{ color: "error", text: "-2%" }}
                      icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    <MiniStatisticsCard
                      title={{ text: "total sales" }}
                      count="₹103,430"
                      percentage={{ color: "success", text: "+5%" }}
                      icon={{ color: "info", component: <FaShoppingCart size="20px" color="white" /> }}
                    />
                  </Grid>
                </Grid>
              )}
            </VuiBox>
            <VuiBox mb={3}>
              <Grid container spacing="18px">
                <Grid item xs={12} lg={12} xl={5}>
                  <WelcomeMark />
                </Grid>
                <Grid item xs={12} lg={6} xl={3}>
                  <SatisfactionRate />
                </Grid>
                <Grid item xs={12} lg={6} xl={4}>
                  <ReferralTracking />
                </Grid>
              </Grid>
            </VuiBox>
            <VuiBox mb={3}>
              <Grid container spacing="18px">
                <Grid item xs={12} lg={6} xl={4}>
                  <Food pic={cooked} text="Cooked Food" setClicked={setClicked} setClickedFood={setClickedFood} /></Grid>
                <Grid item xs={12} lg={6} xl={4}>
                  <Food pic={uncooked} text="Uncooked Food" setClicked={setClicked} setClickedFood={setClickedFood} />
                </Grid>
                <Grid item xs={12} lg={6} xl={4}>
                  <Food pic={frozen} text="Frozen Food" setClicked={setClicked} setClickedFood={setClickedFood} />
                </Grid>
              </Grid>
            </VuiBox>
            
          </>
        ) :
          (
            <>
              <VuiBox mb={3}>
                <Card>
                  <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
                    <VuiTypography variant="lg" color="white">
                      {clickedFood === "cooked" && "Cooked Food Items Table"}
                      {clickedFood === "uncooked" && "Uncooked Food Items Table"}
                      {clickedFood === "frozen" && "Frozen Food Items Table"}
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox
                    sx={{
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
                    {clickedFood === "cooked" && (
                      <Table columns={cookedTableConfig.columns} rows={cookedTableConfig.rows} />
                    )}
                    {clickedFood === "uncooked" && (
                      <Table columns={uncookedTableConfig.columns} rows={uncookedTableConfig.rows} />
                    )}
                    {clickedFood === "frozen" && (
                      <Table columns={frozenTableConfig.columns} rows={frozenTableConfig.rows} />
                    )}
                  </VuiBox>
                </Card>
              </VuiBox>

              <VuiBox p={3} display="flex" justifyContent="flex-end">
                <VuiButton
                  variant="outlined"
                  color="white"
                  onClick={() => setClicked(true)}
                  sx={{
                    border: '2px solid white',
                    color: 'white',
                    textTransform: 'none',
                    transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'white',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  Close Details
                </VuiButton>
                <br />
                <br />
              </VuiBox>
            </>

          )}
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
