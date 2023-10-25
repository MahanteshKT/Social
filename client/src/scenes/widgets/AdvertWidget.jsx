import { Typography, useTheme } from "@mui/material";
import { BaseUrl } from "../../BaseUrl";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={BaseUrl + "assets/info4.jpeg"}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Macbook</Typography>
        <Typography color={medium}>AppleMacbook.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        The MacBook is a brand of Mac notebook computers designed and marketed
        by Apple Inc. that use Apple's macOS operating system since 2006.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
