import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
}));

export default function Item({ item = {} }) {
  const classes = useStyles();

  const getFunction = () => {
    if (item.type_occurrence === "acidente")
      return { type: "Acidente", color: "#e33371" };
    if (item.type_occurrence === "problema-de-saude")
      return { type: "Problema de Sáude", color: "#ff9800" };
    if (item.type_occurrence === "crime")
      return { type: "Crime", color: "#2196f3" };
  };

  const types = getFunction() || {};
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          alt={types.type && types.type[0]}
          src="/static/images/avatar/2.jpg"
          style={{ backgroundColor: types.color }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={item.whatsapp}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              style={{ color: "#000" }}
            >
              {types.type}
            </Typography>
            {` - ${item.whatsapp}`}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
