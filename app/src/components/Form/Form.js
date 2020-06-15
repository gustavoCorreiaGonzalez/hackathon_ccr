import React, { useState, useCallback, useMemo } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Transition from "../../components/Transition";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { DateTimePicker } from "@material-ui/pickers";
import Request from "../../config/Request";
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

const localesCCR = [
  {
    id: "1",
    nome: "Pedagio Arujá",
    valor: "R$ 3,70",
    latitude: "-23.4060844",
    longitude: "-46.3910018",
  },
  {
    id: "3",
    nome: "Pedagio Guararema Norte",
    valor: "R$ 3,70",
    latitude: "-23.346588",
    longitude: "-46.1665044",
  },
  {
    id: "4",
    nome: "Pedagio Moreira César",
    valor: "R$ 15,20",
    latitude: "-22.9269866",
    longitude: "-45.3678296",
  },
  {
    id: "5",
    nome: "Pedagio Itatiaia",
    valor: "R$ 15,20",
    latitude: "-22.4948551",
    longitude: "-44.5717627",
  },
  {
    id: "6",
    nome: "Pedagio Viúva Graça",
    valor: "R$ 15,20",
    latitude: "-22.7160414",
    longitude: "-43.718990",
  },

  {
    id: "7",
    nome: "Posto Odontológico",
    horarios: {
      horario: [
        "segundas e quartas-feiras: das 8h às 18h;",
        "terças e quintas-feiras: das 7h às 17h; ",
        "sextas-feiras: das 9h às 17h.",
      ],
    },
    local:
      "Posto de Serviços Arco-Íris, km 82 da Via Dutra sentido SP-RIO, em Roseira (SP)",
    latitude: "-22.908784",
    longitude: "-45.316527",
  },
  {
    id: "8",
    nome: "Estrada para Saúde",
    horarios: {
      horario: [
        "segundas e quartas-feiras: das 8h às 18h;",
        "terças e quintas-feiras: das 7h às 17h; ",
        "sextas-feiras: das 9h às 17h.",
      ],
    },
    local:
      "Posto de Serviços Arco-Íris, km 82 da Via Dutra sentido SP-RIO, em Roseira (SP)",
    latitude: "-22.908784",
    longitude: "-45.316527",
  },

  {
    id: "9",
    nome: "Região dos Lagos",
    valor:
      "R$ 12,40 das 12h de segunda-feira às 12h de sexta-feira, exceto feriados nacionais. R$ 20,60 das 12h de 6ª feira às 12h de 2ª feira e feriados nacionais das 12h da véspera às 12h do dia seguinte.",
    latitude: "-22.8007862",
    longitude: "-42.4667592",
  },
  {
    id: "10",
    nome: "Região dos Lagos",
    valor:
      "R$ 12,40 das 12h de segunda-feira às 12h de sexta-feira, exceto feriados nacionais. R$ 20,60 das 12h de 6ª feira às 12h de 2ª feira e feriados nacionais das 12h da véspera às 12h do dia seguinte.",
    latitude: "-22.8007862",
    longitude: "-42.4667592",
  },
];

const useStyles = makeStyles((theme) => {
  return {
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
      width: "calc(100% - 16px)",
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    actions: {
      flexDirection: "column",
      display: "flex",
      justifyContent: "center",
      "& > *": {
        margin: theme.spacing(1, 0),
      },

      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        margin: theme.spacing(3),
        "& > *": {
          width: "200px",
          margin: theme.spacing(1),
        },
      },
    },
    dialog: {
      [theme.breakpoints.down("md")]: {
        marginTop: "32px",
        boxSizing: "border-box",
        height: "calc(100% - 32px)",
        borderRadius: "16px 16px 0 0",
      },
      borderRadius: "16px 16px",
      marginTop: "0",
    },
  };
});

export default function Form({ type, open = true, handleOnClose }) {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const actionButtonsInFullWidth = useMemo(() => !matches, [matches]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ccrPost, setCcrPost] = useState("");

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const element = localesCCR.find((item) => item.id === ccrPost);
      Request.post("http://34.229.190.77:80/event", {
        name,
        descripton: description,
        date: `${selectedDate.getDate() + 1}/${
          selectedDate.getMonth() + 1
        }/${selectedDate.getFullYear()}`,
        type_event: type,
        latitude: element.latitude || "",
        longitude: element.longitude || "",
      }).then((response) => {
        console.log(response);
      });

      handleOnClose();
    },
    [ccrPost, description, handleOnClose, name, selectedDate, type]
  );

  const handleOnChangeName = useCallback((event) => {
    const name = event.target.value;
    setName(name);
  }, []);
  const handleOnChangeCcr = (event) => {
    setCcrPost(event.target.value);
  };
  const handleOnChangeDescription = useCallback((event) => {
    const description = event.target.value;
    setDescription(description);
  }, []);
  const handleOnChangeDate = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullScreen={fullScreen}
      onClose={handleOnClose}
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle id="max-width-dialog-title">Novo Evento</DialogTitle>
      <DialogContent>
        <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
          <FormControl className={classes.formControl}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Nome"
              label="Nome"
              name="Nome"
              autoComplete="Nome"
              autoFocus
              type="text"
              value={name}
              onChange={handleOnChangeName}
              data-test="code-purchase"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Descrição"
              label="Descrição"
              name="Descrição"
              autoComplete="Descrição"
              type="text"
              value={description}
              onChange={handleOnChangeDescription}
              data-test="code-purchase"
            />
            <DateTimePicker
              locale={"pt-br"}
              label="Data e Hora"
              format="dd/MM/yyyy HH:mm"
              value={selectedDate}
              onChange={handleOnChangeDate}
            />

            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Local</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ccrPost}
                onChange={handleOnChangeCcr}
              >
                {localesCCR.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nome}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </FormControl>
        </form>
      </DialogContent>

      <DialogActions>
        <Grid
          container
          direction="column"
          justify="flex-end"
          alignItems="center"
          className={classes.actions}
        >
          <Button
            variant="outlined"
            fullWidth={actionButtonsInFullWidth}
            color="primary"
            size="large"
            type="button"
            onClick={handleOnClose}
            data-test="cancel-button"
          >
            Cancelar
          </Button>
          <Button
            fullWidth={actionButtonsInFullWidth}
            variant="contained"
            color="primary"
            size="large"
            onClick={handleOnSubmit}
            data-test="add-button"
          >
            Adicionar
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
