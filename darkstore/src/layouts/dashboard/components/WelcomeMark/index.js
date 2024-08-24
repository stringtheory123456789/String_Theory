import React from "react";
import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import gif from "assets/images/unnamed.png";
import { useSelector, useDispatch } from 'react-redux'

const WelcomeMark = () => {
  const rating = 4.75;
  const count = useSelector((state) => state.counter.value1)
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <Card
      sx={() => ({
        height: "340px",
        py: "32px",
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url(${gif})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      })}
    >
      <VuiBox
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        borderRadius="lg"
        p={3}
        boxShadow="lg"
        position="relative"
        zIndex={1}
      >
        <VuiBox>
        <VuiTypography
            color="white"
            variant="body1"
            fontWeight="regular"
            mb="auto"
          >
            <br />
          </VuiTypography>
          
          <VuiTypography
            color="white"
            variant="h2"
            fontWeight="bold"
            mb="18px"
          >
            Kalyani Dark Store
          </VuiTypography>
          <VuiTypography
            color="white"
            variant="h4"
            fontWeight="regular"
            mb="12px"
          >
            Kalyani (KALZ23)
          </VuiTypography>
          
          <VuiTypography
            color="white"
            variant="body1"
            fontWeight="regular"
            mb="auto"
          >
            <br />
          </VuiTypography>
        </VuiBox>
        <VuiBox display="flex" mt="auto">
      {}
      {Array.from({ length: fullStars }, (_, index) => (
        <Icon
          key={`full-${index}`}
          sx={{
            color: "yellow",
            fontSize: "2.5rem",
            ml: index < fullStars - 1 ? "5px" : "0",
          }}
        >
          star
        </Icon>
      ))}

      {}
      {hasHalfStar && (
        <Icon
          sx={{
            color: "yellow",
            fontSize: "2.5rem",
            ml: "5px",
          }}
        >
          star_half
        </Icon>
      )}

      {}
      {Array.from({ length: emptyStars }, (_, index) => (
        <Icon
          key={`empty-${index}`}
          sx={{
            color: "grey",
            fontSize: "2.5rem",
            ml: index < emptyStars - 1 ? "5px" : "0",
          }}
        >
          star_border
        </Icon>
      ))}
    </VuiBox>
      </VuiBox>
      {}
      <VuiBox
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 0,
        }}
      />
    </Card>
  );
};

export default WelcomeMark;
