import { createGlobalStyle } from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import breakpoints from "../../config/breakpoints";
import colors from "../Colors";
import "./index.css";

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Poppins Regular;
    font-weight: 400;
    font-size: 12px;
    line-height: 28px;
    box-sizing: border-box;
    background-color: #fff;
  }
 `;

export const themeStyled = { breakpoints, colors };
export const themeMaterialUi = createMuiTheme({
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "#d65738",
      main: "#9e260e",
      dark: "#690000",
      contrastText: "rgba(230, 230, 230, 1)",
    },
    secondary: {
      light: "rgba(115, 235, 255, 1)",
      main: "rgba(50, 100, 110, 1)",
      dark: "rgba(43, 86, 95, 1)",
      contrastText: "rgba(255, 255, 255, 1)",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(60, 60, 60, 1)",
      secondary: "rgba(112, 112, 112, 1)",
      disabled: "rgba(201, 201, 201, 1)",
      hint: "rgba(230, 230, 230, 1)",
    },
  },
});
