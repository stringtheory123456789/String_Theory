import React from "react";
import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import gif from "assets/images/unnamed.png";

const Food = ({ pic, text, setClicked, setClickedFood }) => {
    const rating = 4.75;
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
                backgroundImage: `url(${pic})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer"
            })}
            onClick={()=>
            {
                setClickedFood(text.toLowerCase().split(" ")[0])
                setClicked(false)
                console.log(text.toLowerCase().split(" ")[0])
            }
            }
        >
            <VuiBox
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                borderRadius="lg"
                p={3}
                boxShadow="lg"
                position="relative"
                zIndex={1}
            >
                <VuiBox>

                    
                        <VuiTypography
                            color="white"
                            variant="h2"
                            fontWeight="bold"
                            mb="18px"
                            sx={{ textAlign: "center",  marginBottom: "1.5rem" }}
                        >
                            {text}
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

            </VuiBox>
            {}
            <VuiBox
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    zIndex: 0,
                }}
            />
        </Card>
    );
};

export default Food;
