import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import Health from "../../assets/health.jpg";
import Info from "../../assets/Info.jpg";
import LifeStyle from "../../assets/lifeStyle.jpg";
import Request from "../../config/Request";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    marginTop: "100px",
    padding: "0 24px",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  secondCard: {
    padding: "0 24px",
  },
}));

export default function ListEvents() {
  let { type } = useParams();
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    Request.get(`http://34.229.190.77:80/event/type/${type}`).then(
      (response) => {
        if (response.ok) {
          setData(response.data);
        }
      }
    );
  }, [type]);

  const getImage = () => {
    if (type === "eventos-saude") return Health;
    if (type === "eventos-bem-estar") return LifeStyle;
    if (type === "eventos-informativo") return Info;
  };

  const getText = () => {
    if (type === "eventos-saude") return "Saúde";
    if (type === "eventos-bem-estar") return "Bem estar";
    if (type === "eventos-informativo") return "Informativos";
  };
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <React.Fragment>
      <Header></Header>
      <Grid container classes={{ root: classes.card }}>
        <Card
          title={getText()}
          imageTitle={getText()}
          image={getImage()}
          link={`/events/${type}`}
        ></Card>
        <Grid item xs={matches ? 6 : 12} classes={{ root: classes.secondCard }}>
          <Typography variant="h6" classes={{ root: classes.name }}>
            Performance
          </Typography>
          <List className={classes.root}>
            {data.map((item) => {
              const currentDate = new Date(item.date);

              return (
                <ListItem
                  component="a"
                  href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                >
                  <ListItemAvatar>
                    <Avatar>{item.name && item.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {`${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`}
                        </Typography>
                        {` - ${item.descripton}`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
