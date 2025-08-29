// theme.ts
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { PaletteOptions } from "@mui/material/styles/createPalette";
import { green, grey, orange, red, yellow } from "@mui/material/colors";

// Theme color constants
export const themeColors = {
  primary: yellow[600],
  secondary: grey[600],
  error: red[600],
  warn: orange[300],
  success: green[600],
  highlight: yellow[200],
};

// Common palette settings
const palette: PaletteOptions = {
  mode: "light", // was 'type' in v4
  primary: { main: themeColors.primary },
  secondary: { main: themeColors.secondary },
  error: { main: themeColors.error },
  background: { default: "#ffffff" },
  contrastThreshold: 3,
  tonalOffset: 0.2,
};

// Typography settings
const typography = {
  fontFamily: [
    '"Roboto"',
    '"Noto Sans"',
    '"Helvetica"',
    '"Arial"',
    "sans-serif",
  ].join(","),
};

// Dynamic font scaling
const dynamicFontParams = { factor: 2 };

// Create theme
let baseTheme = createTheme({
  palette,
  typography,
  spacing: 8,
  components: {
    MuiTableHead: { styleOverrides: { root: { backgroundColor: "#fff" } } },
    MuiTableBody: { styleOverrides: { root: { backgroundColor: "#fff" } } },
    MuiTableFooter: { styleOverrides: { root: { backgroundColor: "#fff" } } },
    MuiTableRow: { styleOverrides: { root: { backgroundColor: "#fff" } } },
    MuiTableCell: { styleOverrides: { root: { backgroundColor: "#fff" } } },

    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: themeColors.primary,
          margin: -1,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: themeColors.primary,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "standard", // default to underline
      },
    },
  },
});

// Enable responsive font sizes
const theme = responsiveFontSizes(baseTheme, dynamicFontParams);

export default theme;
