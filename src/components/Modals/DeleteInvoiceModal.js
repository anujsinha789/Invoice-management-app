import React , { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import theme, { pxToRem } from '../../utils/theme';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

import { deleteData } from '../../services/deleteInvoice.js'


const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    background: '#2A3E4C 0% 0% no-repeat padding-box',
    boxShadow: '0px 8px 24px #00000029',
    borderRadius: '6px',
  },
  titleContainer:{
      borderBottom : '1px solid black',
      textAlign : 'left',
      display : 'flex'
  },
  msgContainer : {
    width : '100%',
    height : '100%',
  },

  msgContainerTop : {
    color : '#ffffff',
    padding : pxToRem(10)
  },

  msgContainerBottom : {
    color : '#ffffff',
    padding : pxToRem(10)
  },
  
  input : {
      height : 150,
      background : '#283A46',
      border : '1px solid #356680',
  },
  asterix : {
      color : '#FF5B5B',
  },
  modalFooter : {
      borderTop : '1px solid black',
      marginTop : '10px',
      padding : '10px',
  },
  AddBtn : {
    backgroundColor : 'transparent',
    height : pxToRem(45),
    border : '1px solid #14AFF1',
    color : '#FFFFFF',
    fontSize : pxToRem(20),
    borderRadius : pxToRem(10),
    display : 'inline-block',
    display : 'flex',
    '&:hover': {
        backgroundColor: '#14AFF1',
      }
  },
  deleteBtnContainer : {
    display : 'inline-block',
    marginLeft : pxToRem(20),
    marginRight : pxToRem(20)
  },
  btnStyle : {
    backgroundColor : 'transparent',
    height : pxToRem(45),
    border : '1px solid #14AFF1',
    color : '#FFFFFF',
    fontSize : pxToRem(20),
    borderRadius : pxToRem(10),
    display : 'inline-block',
    display : 'flex',
    '&:hover': {
        backgroundColor: '#14AFF1',
      }
 },
 cancelBtnStyle : {
    backgroundColor : 'transparent',
    height : pxToRem(45),
    border : 'none',
    color : '#14AFF1',
    fontSize : pxToRem(20),
    borderRadius : pxToRem(10),
    display : 'inline-block',
    display : 'flex',
    '&:hover': {
        color : '#ffffff'
      }
 },
 BtnStyle : {
  backgroundColor : 'transparent',
  height : pxToRem(45),
  border : '1px solid #14AFF1',
  color : '#FFFFFF',
  fontSize : pxToRem(20),
  borderRadius : pxToRem(10),
  display : 'flex',
  '&:hover': {
    backgroundColor: '#14AFF1',
  }
}
}));


export default function DeleteInvoiceModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    deleteData(props.deletedRow);
  };

  const handleClose = () => {
    setOpen(false);
  }



  return (
    <div style = {{display : 'inline-block'}}>
        <div className = {classes.deleteBtnContainer}>
            <Button variant="outlined" className = {classes.BtnStyle} onClick = {handleOpen} startIcon={<DeleteIcon style = {{height : pxToRem(20) , width : pxToRem(20)}}/>}>
                Delete
            </Button>
        </div>  
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className = {classes.titleContainer}>
                <h3 id="transition-modal-title" style = {{color : '#ffffff'}}>Delete record(s)?</h3>
                <span style = {{display : 'flex' , marginLeft : pxToRem(600) , marginTop : pxToRem(25) , color : 'white' ,float : 'right'}}>
                    <CloseIcon onClick = {handleClose}/>
                </span>
            </div>
            <div className = {classes.msgContainer}>
                <div className = {classes.msgContainerTop}>
                    You'll Use Your record(s) after this action . We can't recover them once you delete.
                </div>
                <div className = {classes.msgContainerBottom}>
                  Are you sure you want to<span style = {{color : '#FF5B5B' , fontWeight : 'bold'}}> permanently delete</span> them?
                </div>
            </div>
            <div className = {classes.modalFooter}>
                <Button onClick={handleDelete} style = {{float : 'right'}} className = {classes.AddBtn}>
                    Delete
                </Button>
                <Button onClick={handleClose} style = {{float : 'right' , marginRight : '10px'}} className = {classes.btnStyle}>
                    Cancel
                </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
