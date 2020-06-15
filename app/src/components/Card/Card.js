import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "calc(100% - 24px)",
    margin: "12px",
    [theme.breakpoints.up("sm")]: {
      width: "calc(30% - 24px)",
    },
  },
  media: {
    height: 200,
  },
}));

export default function MediaCard({
  image,
  title,
  imageTitle,
  handleOnClickAdd,
  link,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={imageTitle} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          ></Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleOnClickAdd}>
          Adicionar
        </Button>
        <Button size="small" color="primary" href={link}>
          Veja os eventos
        </Button>
      </CardActions>
    </Card>
  );
}
