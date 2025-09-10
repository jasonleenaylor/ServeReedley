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

// Amplify theme that matches MUI theme colors
export const amplifyTheme = {
  name: "reedley-crn-theme",
  tokens: {
    colors: {
      brand: {
        primary: {
          "10": "#fff8e1",
          "20": "#ffecb3",
          "40": themeColors.primary, // Use your actual primary color
          "60": yellow[500],
          "80": yellow[700],
          "90": yellow[800],
          "100": yellow[900],
        },
      },
      neutral: {
        "10": "#ffffff",
        "20": "#f5f5f5",
        "40": themeColors.secondary, // Use your actual secondary color
        "60": grey[700],
        "80": grey[800],
        "90": grey[900],
        "100": "#000000",
      },
    },
    components: {
      authenticator: {
        router: {
          boxShadow: "none",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "{colors.neutral.20}",
        },
      },
      button: {
        primary: {
          backgroundColor: "{colors.brand.primary.40}",
          color: "{colors.neutral.100}",
          _hover: {
            backgroundColor: "{colors.brand.primary.60}",
          },
          _active: {
            backgroundColor: "{colors.brand.primary.80}",
          },
        },
      },
      fieldcontrol: {
        borderColor: "{colors.neutral.40}",
        _focus: {
          borderColor: "{colors.brand.primary.40}",
        },
      },
    },
  },
};

export default theme;
