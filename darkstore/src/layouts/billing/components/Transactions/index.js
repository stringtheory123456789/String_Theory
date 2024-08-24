import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import Transaction from "layouts/billing/components/Transaction";

function Transactions() {
  return (
    <Card sx={{ height: "100%" }}>
      <VuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="18px"
        sx={({ breakpoints }) => ({
          [breakpoints.down("lg")]: {
            flexDirection: "column",
          },
        })}
      >
        <VuiTypography
          variant="lg"
          fontWeight="bold"
          textTransform="capitalize"
          color="white"
          sx={({ breakpoints }) => ({
            [breakpoints.only("sm")]: {
              mb: "6px",
            },
          })}
        >
          Recent Transactions
        </VuiTypography>
        <VuiBox display="flex" alignItems="flex-start">
          <VuiBox color="white" mr="6px" lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </VuiBox>
          <VuiTypography variant="button" color="text" fontWeight="regular">
            23 - 30 March 2024
          </VuiTypography>
        </VuiBox>
      </VuiBox>
      <VuiBox>
        <VuiBox mb={2}>
          <VuiTypography
            variant="caption"
            color="text"
            fontWeight="medium"
            textTransform="uppercase"
          >
            New Arrivals
          </VuiTypography>
        </VuiBox>
        <VuiBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Transaction
            color="error"
            icon="arrow_downward"
            name="Frozen Pizza"
            description="27 March 2024, at 12:30 PM"
            value="- ₹ 2,500"
          />
          <Transaction
            color="success"
            icon="arrow_upward"
            name="Fresh Vegetables"
            description="27 March 2024, at 04:30 AM"
            value="+ ₹ 2,000"
          />
        </VuiBox>
        <VuiBox mt={1} mb={2}>
          <VuiTypography
            variant="caption"
            color="text"
            fontWeight="medium"
            textTransform="uppercase"
          >
            Yesterday
          </VuiTypography>
        </VuiBox>
        <VuiBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Transaction
            color="success"
            icon="arrow_upward"
            name="Organic Fruits"
            description="26 March 2024, at 13:45 PM"
            value="+ ₹ 750"
          />
          <Transaction
            color="success"
            icon="arrow_upward"
            name="Packaged Snacks"
            description="26 March 2024, at 12:30 PM"
            value="+ ₹ 1,000"
          />
          <Transaction
            color="success"
            icon="arrow_upward"
            name="Beverages"
            description="26 March 2024, at 08:30 AM"
            value="+ ₹ 2,500"
          />
          <Transaction
            color="text"
            icon="priority_high"
            name="Out of Stock"
            description="26 March 2024, at 05:00 AM"
            value="Pending"
          />
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default Transactions;
