import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = (props) => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box
      width="100%"
      padding="1rem 6%"
      textAlign="center"
      backgroundColor={theme.palette.background.alt}
    >
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem,2rem,2.25rem)"
        color="primary"
        sx={{
          "&:hover": {
            color: "primaryLight",
            cursor: "pointer",
          },
        }}
      >
        NexaSphere
      </Typography>
      <Box
        margin="2rem auto"
        padding="2rem"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.neutral.light}
        width={isNonMobileScreens ? "50%" : "93%"}
      >
        <Typography
          textAlign="start"
          fontWeight="500"
          variant="h5"
          sx={{ marginBottom: "1.5rem" }}
        >
          Welcome to NexaSphere , The social Media For sociopaths
        </Typography>
        <Form page="login" />
      </Box>
    </Box>
  );
};

export default LoginPage;
