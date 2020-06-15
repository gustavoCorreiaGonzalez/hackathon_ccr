import React, { useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Visibility from '@material-ui/icons/Visibility'

export default function PasswordTextInput({
  handleOnChange,
  error,
  helperText,
  name,
  label,
  id,
  value,
  dataTest,
  autoComplete,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleClickShowPassword = useCallback(() => {
    setIsPasswordVisible(true)
  }, [])

  const handleMouseDownPassword = useCallback(() => {
    setIsPasswordVisible(false)
  }, [])

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name={name}
      label={label}
      id={id}
      autoComplete={autoComplete}
      value={value}
      onChange={handleOnChange}
      error={error}
      helperText={error && helperText}
      data-test={dataTest}
      type={isPasswordVisible ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              data-test="visibility-icon"
            >
              {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}
