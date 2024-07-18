import {extendTheme} from "@chakra-ui/react";
import {createTheme, responsiveFontSizes} from "@mui/material";

const colors = {
  brand: {
    "50": "#EBF2FA",
    "100": "#C6DBF1",
    "200": "#A1C3E8",
    "300": "#7CACDF",
    "400": "#5794D6",
    "500": "#327DCD",
    "600": "#2864A4",
    "700": "#1E4B7B",
    "800": "#143252",
    "900": "#0A1929"
  }
};

export const theme = extendTheme({colors,  components: {
    Popover: {
      variants: {
        responsive: {
          popper: {
            maxWidth: 'unset',
            width: 'unset'
          }
        }
      }
    }
  }});

export const muiTheme = responsiveFontSizes(createTheme({}));