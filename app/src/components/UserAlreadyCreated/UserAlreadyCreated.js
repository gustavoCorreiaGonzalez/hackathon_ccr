import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Transition from '../Transition'

export default function UserAlreadyCreated({ handleClose }) {
  return (
    <Dialog
      open
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        Usuário já cadastrado
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Por favor, tente outro com outro email e/ou CPF
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" data-test="close-button">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
