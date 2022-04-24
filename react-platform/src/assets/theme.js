import hongaria from "./fonts/hongaria-sans-serif-font/Hongaria-Sans.ttf";
import poppins from "./fonts/poppins/Poppins-Regular.ttf";

import { createTheme } from "@mui/material/styles";

const Hongaria = {
  fontFamily: "hongaria",
  src: `
  local("hongaria"),
  url(${hongaria}),
  format("truetype")
  `
};

const Poppins = {
  fontFamily: "Poppins-Regular",
  src: `local("Poppins-Regular"),
  url(${poppins}) format("truetype")`
};

export const theme = createTheme({
  typography: {
    fontFamily: ["hongaria", "sans-serif"].join(",")
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [Hongaria,Poppins]
      }
    }
  }
});
