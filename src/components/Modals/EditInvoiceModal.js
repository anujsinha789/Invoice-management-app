import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { updateData } from '../../services/updateInvoice.js';
import { fetchData } from '../../services/fetchData.js';
import theme, { pxToRem } from '../../utils/theme';


const useStyles = makeStyles((theme) => ({
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
  formContainer : {
    width : '100%',
    height : '100%',
    display : 'flex',
  },
  formContainerLeft : {
    backgroundColor : '#2A3E4C',
    display : 'inline-block',
    height : '100%',
    paddingRight : '10px',
  },
  formContainerRight : {
    backgroundColor : '#2A3E4C',
    display : 'inline-block',
    height : '100',
    paddingLeft : '10px',
  },
  input : {
      height : 150,
      background : '#283A46',
      border : '1px solid #356680',
      color : 'white'
  },
  InvoiceAmountInput : {
    background : '#283A46',
    border : '1px solid #356680',
    color : 'white'
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
  editBtnContainer : {
    display : 'inline-block',
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

export default function EditInvoiceModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [invoiceAmount, setInvoiceAmount] = React.useState(0);
  const [notes, setNotes] = React.useState("lorem ipsum dolor");
  const [snackBarErrorOpen, setSnackBarErrorOpen] = React.useState(false);
  const [docId, setDocId] = React.useState(0);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClick = () => {
    setSnackBarErrorOpen(true);
  };

  const handleSnackbarErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarErrorOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async(event) => {
      event.preventDefault();
      console.log(invoiceAmount);
      console.log(notes);
      await updateData(props.docId , invoiceAmount , notes);
      setSnackBarErrorOpen(true);
      fetchData();
  }

  const handleReset = (event) => {
    event.preventDefault();
    setInvoiceAmount(0);
    setNotes("");
  };

  

  return (
    <div style = {{display : 'inline-block'}}>
        <Snackbar open={snackBarErrorOpen} autoHideDuration={6000} onClose={handleSnackbarErrorClose} anchorOrigin = {{vertical: 'bottom', horizontal: 'left'}}>
          <Alert onClose={handleSnackbarErrorClose} severity="success">
              Invoice Updated Succesfully!
          </Alert>
        </Snackbar>
        <div className = {classes.editBtnContainer}>
            <Button variant="outlined" className = {classes.BtnStyle} onClick = {handleOpen} startIcon={<EditIcon style = {{height : pxToRem(20) , width : pxToRem(20)}}/>}>
                Edit
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
                <h3 id="transition-modal-title" style = {{color : '#ffffff'}}>Edit Invoice</h3>
                <span style = {{display : 'flex' , marginLeft : pxToRem(400) , marginTop : pxToRem(20) , color : 'white' ,float : 'right'}}>
                    <CloseIcon onClick = {handleClose}/>
                </span>
            </div>
            <div className = {classes.formContainer}>
                <div className = {classes.formContainerRight}>
                    <form>
                        <div style = {{marginTop : pxToRem(30) , color : '#97A1A9'}}>
                            Invoice Amount 
                            <TextField 
                              id="outlined-basic" 
                              value = {invoiceAmount}
                              type = "number"
                              variant="outlined" 
                              size = 'small' 
                              InputProps={{className: classes.InvoiceAmountInput}} 
                              onChange={(event) => {setInvoiceAmount(event.target.value)}}
                              style = {{marginLeft : pxToRem(100)}}
                            />
                          
                        </div>
                        <div style = {{marginTop : pxToRem(28), color : '#97A1A9'}}>
                            Notes 
                            <TextField 
                              id="outlined-basic" 
                              value = {notes}
                              variant="outlined" 
                              size = 'small' 
                              InputProps={{className: classes.input}} 
                              onChange={(event) => {setNotes(event.target.value)}}
                              style = {{marginLeft : pxToRem(198)}}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className = {classes.modalFooter}>
                <Button onClick={handleSave} style = {{float : 'right'}} className = {classes.AddBtn}>
                    Save
                </Button>
                <Button onClick={handleReset} style = {{float : 'right' , marginRight : '10px'}} className = {classes.btnStyle}>
                    Reset
                </Button>
                <Button onClick={handleClose} style = {{float : 'left'}} className = {classes.cancelBtnStyle}>
                    Cancel
                </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}