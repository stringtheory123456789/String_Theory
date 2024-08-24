import Card from "@mui/material/Card";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import Bill from "layouts/billing/components/Bill";

function BillingInformation() {
  return (
    <Card id="delete-account">
      <VuiBox>
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          Billing Information
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill
            name="Aarav Patel"
            company="Mumbai Spice Co."
            email="aarav.patel@mumbaispice.co.in"
            vat="IN1234567890"
          />
          <Bill
            name="Saanvi Sharma"
            company="Delhi Delight"
            email="saanvi.sharma@delhidelight.in"
            vat="IN0987654321"
          />
          <Bill
            name="Vivaan Reddy"
            company="Bangalore Bites"
            email="vivaan.reddy@bangalorebites.in"
            vat="IN1122334455"
            noGutter
          />
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default BillingInformation;
