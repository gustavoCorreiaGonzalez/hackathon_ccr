import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "../../components/Card";
import Health from "../../assets/health.jpg";
import Info from "../../assets/Info.jpg";
import LifeStyle from "../../assets/lifeStyle.jpg";
import Form from "../Form";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  name: {
    color: "#000",
    marginleft: "24px",
  },
  container: { marginTop: "100px", padding: "0 24px" },
}));

export default function Cards() {
  const classes = useStyles();
  const [open, setOpen] = useState(null);
  const handleOnClickAdd = useCallback((type) => () => setOpen(type), []);
  const handleOnClose = useCallback(() => setOpen(null), []);

  return (
    <Grid container classes={{ root: classes.container }}>
      <Typography variant="h6" classes={{ root: classes.name }}>
        Eventos
      </Typography>
      <Grid container classes={{ root: classes.root }}>
        <Card
          title="Saúde"
          imageTitle="saude"
          image={Health}
          handleOnClickAdd={handleOnClickAdd("eventos-saude")}
          link="/events/eventos-saude"
        ></Card>
        <Card
          title="Bem Estar"
          imageTitle="Bem Estar"
          image={LifeStyle}
          handleOnClickAdd={handleOnClickAdd("eventos-bem-estar")}
          link="/events/eventos-bem-estar"
        ></Card>
        <Card
          title="Informativos"
          imageTitle="Informativos"
          image={Info}
          handleOnClickAdd={handleOnClickAdd("eventos-informativo")}
          link="/events/eventos-informativo"
        ></Card>
      </Grid>

      {open && <Form handleOnClose={handleOnClose} type={open}></Form>}
    </Grid>
  );
}
