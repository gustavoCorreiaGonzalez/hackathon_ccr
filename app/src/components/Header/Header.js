import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBarTop: {
    bottom: "auto",
    top: 0,
  },

  title: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
  },
  titleHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar position="fixed" classes={{ root: classes.appBarTop }}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            CCR
          </Typography>

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <MenuItem onClick={() => {}} data-test="logout-button">
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <p>Sair</p>
            </MenuItem>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
