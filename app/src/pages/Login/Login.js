import React, { useState, useCallback, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import { useHistory } from 'react-router-dom'
import PasswordTextInput from '../../components/PasswordTextInput'
import LoginContainer from '../../components/LoginContainer'
import InvalidUser from '../../components/InvalidUser'
import STORAGE_KEYS from '../../constants/storage'
const useStyles = makeStyles((theme) => {
  return {
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }
})

export default function Login() {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
  const [invalidUser, setInvalidUser] = useState(false)

  const history = useHistory()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER))
    if (!user) return
    setEmail(user.email)
    setPassword(user.password)
    setChecked(Boolean(user))
  }, [])

  const handleOnChangeEmail = useCallback((event) => {
    const email = event.target.value
    setEmail(email)
  }, [])

  const handleOnChangePassword = useCallback((event) => {
    const password = event.target.value
    setPassword(password)
  }, [])

  const handleOnClickChecked = useCallback(() => {
    setChecked((state) => !state)
  }, [])

  const handleOnClickOnSubmit = (event) => {
    event.preventDefault()
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]')
    if (
      users.some((user) => user.email === email && user.password === password)
    ) {
      if (checked) {
        localStorage.setItem(
          STORAGE_KEYS.USER,
          JSON.stringify({ email, password })
        )
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER)
      }
      history.push('/dash')
    } else {
      setInvalidUser(true)
    }
  }
  const handleOnCloseInvalidUser = useCallback(() => setInvalidUser(false), [])
  return (
    <LoginContainer handleOnSubmit={handleOnClickOnSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        color="secondary"
        value={email}
        onChange={handleOnChangeEmail}
        data-test="email"
      />
      <PasswordTextInput
        name="password"
        label="Senha"
        id="password"
        value={password}
        handleOnChange={handleOnChangePassword}
        dataTest="password"
        autoComplete="current-password"
      />

      <FormControlLabel
        control={
          <Checkbox
            value="remember"
            color="primary"
            onChange={handleOnClickChecked}
            checked={checked}
            data-test="rememberMe"
          />
        }
        label="Lembre-me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        data-test="submitButton"
      >
        Entrar
      </Button>
      <Grid container justify="flex-end">
        <Link href="/register" variant="body2" data-test="registerLink">
          Registre-se
        </Link>
      </Grid>
      {invalidUser && <InvalidUser handleClose={handleOnCloseInvalidUser} />}
    </LoginContainer>
  )
}
