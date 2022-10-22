import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import image from "../../../Assets/home1.webp";
import Grid from "@mui/material/Grid";
import { Fade } from "react-awesome-reveal";

const BuildTools = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box marginBottom={4}>
        <Box marginBottom={2}>
          <Typography
            variant="h4"
            color="text.primary"
            align={"center"}
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
            mt={4}
          >
            Best Finance Management softwares for Bussiness
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{ fontWeight: 400 }}
            align={"center"}
          >
            Components, plugins, and build tools are all thoroughly documented
            with live examples and markup for easier use and customization.
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Grid
          item
          container
          alignItems={"center"}
          justifyContent={"center"}
          xs={12}
          md={6}
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          <Fade duration={2000} left>
            <img src={`${image}`} alt="" className="img-fluid" />
          </Fade>
        </Grid>
      </Box>
    </Box>
  );
};

export default BuildTools;
