import Tooltip from "@mui/material/Tooltip";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiProgress from "components/VuiProgress";
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <VuiAvatar
          src={image}
          alt={name}
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { dark } }) =>
              `${borderWidth[2]} solid ${dark.focus}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { name: "food", align: "left" },
      { name: "buyers", align: "left" },
      { name: "cost", align: "center" },
      { name: "quantity", align: "center" },
    ],

    rows: [
      {
        food: (
          <VuiBox display="flex" alignItems="center">
            🍛
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Biriyani Order
            </VuiTypography>
          </VuiBox>
        ),
        buyers: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar1, "Rajesh Kumar"],
              [avatar2, "Anjali Sharma"],
              [avatar3, "Vikram Patel"],
              [avatar4, "Neha Gupta"],
            ])}
          </VuiBox>
        ),
        cost: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            ₹50
          </VuiTypography>
        ),
        quantity: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              75%
            </VuiTypography>
            <VuiProgress value={75} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        food: (
          <VuiBox display="flex" alignItems="center">
            🍅
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Tomato Order
            </VuiTypography>
          </VuiBox>
        ),
        buyers: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar2, "Anjali Sharma"],
              [avatar4, "Neha Gupta"],
            ])}
          </VuiBox>
        ),
        cost: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            ₹20
          </VuiTypography>
        ),
        quantity: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              50%
            </VuiTypography>
            <VuiProgress value={50} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        food: (
          <VuiBox display="flex" alignItems="center">
            🍦
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Ice Cream Order
            </VuiTypography>
          </VuiBox>
        ),
        buyers: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar1, "Rajesh Kumar"],
              [avatar3, "Vikram Patel"],
            ])}
          </VuiBox>
        ),
        cost: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            ₹15
          </VuiTypography>
        ),
        quantity: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              100%
            </VuiTypography>
            <VuiProgress value={100} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        food: (
          <VuiBox display="flex" alignItems="center">
            🍕
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Pizza Order
            </VuiTypography>
          </VuiBox>
        ),
        buyers: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar4, "Neha Gupta"],
              [avatar3, "Vikram Patel"],
              [avatar2, "Anjali Sharma"],
              [avatar1, "Rajesh Kumar"],
            ])}
          </VuiBox>
        ),
        cost: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            ₹30
          </VuiTypography>
        ),
        quantity: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              85%
            </VuiTypography>
            <VuiProgress value={85} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        food: (
          <VuiBox display="flex" alignItems="center">
            🍔
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Burger Order
            </VuiTypography>
          </VuiBox>
        ),
        buyers: (
          <VuiBox display="flex" py={1}>
            {avatars([[avatar4, "Neha Gupta"]])}
          </VuiBox>
        ),
        cost: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            ₹10
          </VuiTypography>
        ),
        quantity: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              40%
            </VuiTypography>
            <VuiProgress value={40} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        food: (
          <VuiBox display="flex" alignItems="center">
            🍰
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Cake Order
            </VuiTypography>
          </VuiBox>
        ),
        buyers: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar1, "Rajesh Kumar"],
              [avatar4, "Neha Gupta"],
            ])}
          </VuiBox>
        ),
        cost: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            ₹25
          </VuiTypography>
        ),
        quantity: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              70%
            </VuiTypography>
            <VuiProgress value={70} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
    ],
  };
}
