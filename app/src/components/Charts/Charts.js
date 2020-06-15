import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import ApexCharts from "react-apexcharts";
import Request from "../../config/Request";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  container: { marginTop: "16px", padding: "0 24px" },
});

export default function Cards() {
  const [series, setSeries] = useState([
    {
      name: "Eventos",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  });

  useEffect(() => {
    Request.get("http://34.229.190.77:80/event/date").then((response) => {
      if (response.ok) {
        setSeries([
          {
            name: "Eventos",
            data: response.data.map((item) => item.events),
          },
        ]);
        setOptions({
          chart: {
            height: 350,
            type: "area",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
            categories: response.data.map((item) => item.date),
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
        });
      }
    });
  }, []);
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Grid item xs={matches ? 8 : 12} classes={{ root: classes.container }}>
      <Typography variant="h6" classes={{ root: classes.name }}>
        Performance
      </Typography>
      <ApexCharts options={options} series={series} type="area" height={200} />
    </Grid>
  );
}
