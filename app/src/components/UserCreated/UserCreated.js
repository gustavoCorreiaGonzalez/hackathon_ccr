import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Transition from '../Transition'

export default function UserCreated() {
  return (
    <Dialog
      open
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        Usuário cadastrado com sucesso
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Por favor, logue-se</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button component="a" href="/" color="primary" data-test="close-button">
          Logar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
