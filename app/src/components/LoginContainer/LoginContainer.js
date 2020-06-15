import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Logo from "../../assets/1200px-Grupo_CCR.svg.png";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import styled from "styled-components";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100vw",
      height: "100vh",
      backgroundColor: theme.palette.primary.main,
    },
    container: {
      backgroundColor: theme.palette.common.white,
      padding: "16px",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      [theme.breakpoints.down("md")]: {
        margin: "16px",
        boxSizing: "border-box",
        flexDirection: "column",
      },
    },
    paper: {
      margin: `${theme.spacing(2)}px 0 `,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        margin: `${theme.spacing(8)}px 0 `,
      },
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    img: {
      display: "flex",
      justifyContent: "center",
    },
  };
});

const Img = styled.img`
  width: 50%;
`;

export default function LoginContainer({ children, handleOnSubmit }) {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      classes={{ root: classes.root }}
    >
      <Grid item xs={12} sm={6} classes={{ root: classes.container }}>
        <Container maxWidth="xs" classes={{ root: classes.img }}>
          <Img src={Logo} />
        </Container>
        <Container maxWidth="xs" className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            CCR
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
            {children}
          </form>
        </Container>
      </Grid>
    </Grid>
  );
}
