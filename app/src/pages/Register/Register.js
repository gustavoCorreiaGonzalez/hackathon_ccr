import React, { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import PasswordTextInput from "../../components/PasswordTextInput";
import LoginContainer from "../../components/LoginContainer";
import validatorEmail from "../../helpers/validatorEmail";
import UserAlreadyCreated from "../../components/UserAlreadyCreated";

const useStyles = makeStyles((theme) => {
  return {
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  };
});

export default function Register() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [userAlreadyCreated, setOpenUserAlreadyCreated] = useState(false);

  const handleOnChangeEmail = useCallback((event) => {
    const email = event.target.value;
    setEmail(email.toLowerCase().trim());
  }, []);

  const handleOnChangePassword = useCallback((event) => {
    const password = event.target.value;
    setPassword(password.trim());
  }, []);

  const handleOnChangeName = useCallback((event) => {
    const name = event.target.value;
    setName(name);
  }, []);

  const handleOnChangeConfirmPassword = useCallback((event) => {
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword.trim());
  }, []);

  const validateForm = () => {
    let errorsCurrent = {};
    if (name.trim().length <= 2) {
      errorsCurrent = { ...errorsCurrent, name: true };
    }

    if (!validatorEmail(email)) {
      errorsCurrent = { ...errorsCurrent, email: true };
    }
    if (
      password.length < 6 ||
      confirmPassword.length < 6 ||
      confirmPassword !== password
    ) {
      errorsCurrent = {
        ...errorsCurrent,
        password: true,
        confirmPassword: true,
      };
    }
    setErrors(errorsCurrent);
    const hasAnyFieldInvalid = Object.values(errorsCurrent).some(
      (item) => item
    );
    if (hasAnyFieldInvalid) return false;
    return true;
  };
  const handleOnClickOnSubmit = (event) => {
    event.preventDefault();
    const isFormValidated = validateForm();
    if (!isFormValidated) return;

    // const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    // if (users.some((user) => user.cpf === cpf || user.cpf === email)) {
    //   setOpenUserAlreadyCreated(true);
    // } else {
    //   users.push({ name, cpf, email, password });
    //   localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    //   setOpenCreated(true);
    // }
  };

  const handleOnCloseUserAlreadyCreated = useCallback(
    () => setOpenUserAlreadyCreated(false),
    []
  );

  const handleOnBlur = validateForm;

  return (
    <LoginContainer handleOnSubmit={handleOnClickOnSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Nome Completo"
        name="name"
        autoComplete="name"
        value={name}
        onChange={handleOnChangeName}
        error={errors.name}
        helperText={
          errors.name &&
          "Nome Inválido, nome precisa conter pelo menos 3 letras"
        }
        onBlur={handleOnBlur}
        data-test="name"
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={handleOnChangeEmail}
        error={errors.email}
        onBlur={handleOnBlur}
        helperText={errors.email && "Email inválido"}
        data-test="email"
      />
      <PasswordTextInput
        name="password"
        label="Senha"
        id="password"
        value={password}
        handleOnChange={handleOnChangePassword}
        error={errors.password}
        onBlur={handleOnBlur}
        helperText={
          errors.password &&
          "As senhas tem que ser iguais e conter seis caracteres"
        }
        dataTest="password"
        autoComplete="new-password"
      />
      <PasswordTextInput
        name="confirmPassword"
        label="Confirme sua senha"
        id="confirmPassword"
        autoComplete="new-password"
        value={confirmPassword}
        handleOnChange={handleOnChangeConfirmPassword}
        error={errors.confirmPassword}
        onBlur={handleOnBlur}
        helperText={
          errors.confirmPassword &&
          "As senhas tem que ser iguais e conter seis caracteres"
        }
        dataTest="confirmPassword"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        data-test="submitButton"
      >
        Entrar
      </Button>
      <Grid container justify="flex-end">
        <Link href="/" variant="body2" data-test="loginLink">
          Já é cadastrado?
        </Link>
      </Grid>
      {userAlreadyCreated && (
        <UserAlreadyCreated handleClose={handleOnCloseUserAlreadyCreated} />
      )}
    </LoginContainer>
  );
}
