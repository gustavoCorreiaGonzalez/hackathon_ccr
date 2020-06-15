import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Item from "../Item";
import Request from "../../config/Request";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("sm")]: {
      flexDirection: "90%",
    },
  },
  container: { marginTop: "16px", padding: "0 24px" },
}));
export default function AlignItemsList() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    Request.get("http://34.229.190.77:80/occurrence").then((response) => {
      if (response.ok) {
        console.log(response);
        setData(response.data);
      }
    });
  }, []);
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Grid item xs={matches ? 4 : 12} classes={{ root: classes.container }}>
      <Typography variant="h6" classes={{ root: classes.name }}>
        Ocorrência
      </Typography>
      <List className={classes.root}>
        {data.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <Item item={item} />
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </Grid>
  );
}
