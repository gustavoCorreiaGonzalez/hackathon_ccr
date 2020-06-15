import React from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/Header";
import Charts from "../../components/Charts";
import Events from "../../components/Events";
import Cards from "../../components/Cards";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function Home() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <React.Fragment>
      <Header></Header>
      <Cards></Cards>

      <Grid container direction={matches ? "row" : "column"}>
        <Charts />
        <Events />
      </Grid>
    </React.Fragment>
  );
}
