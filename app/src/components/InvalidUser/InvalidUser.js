import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Transition from '../Transition'

export default function InvalidUser({ handleClose }) {
  return (
    <Dialog
      open
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="user-invalid-dialog">Usuário inválido</DialogTitle>
      <DialogContent>
        <DialogContentText>Email e/ou senha incorretos</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" data-test="close-button">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
