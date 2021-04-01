import React, { Fragment, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { addData } from '../../services/addInvoice.js'
import { fetchData } from '../../services/fetchData.js'
import { pxToRem } from '../../utils/theme';
  
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
    borderRadius: pxToRem(6),
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
    paddingRight : pxToRem(10),
  },
  formContainerRight : {
    backgroundColor : '#2A3E4C',
    display : 'inline-block',
    height : '100',
    paddingLeft : pxToRem(10),
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
      marginTop : pxToRem(10),
      padding : pxToRem(10),
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
  addBtnContainer : {
    display : 'inline-block',
    marginLeft : pxToRem(150),
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
 dataPickerContainer : {
    display : 'inline-block',
    marginLeft : pxToRem(95),
    width : '55%'
 },
 input: {
  color: "#ffffff",
 },
 NotesInput : {
   height : pxToRem(180),
   textAlign : 'topLeft',
   color : 'white',
 },
 NameInput : {
   color : 'white'
 },
  datePicker: {
    color: 'red',
    textColor: 'red',

  },
}));



export default function AddInvoiceModal() {
  

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [customerName, setCustomerName] = React.useState(null);
  const [customerNumber, setCustomerNumber] = React.useState(null);
  const [invoiceNumber, setInvoiceNumber] = React.useState(0);
  const [invoiceAmount, setInvoiceAmount] = React.useState(0);
  const [dueDate, setDueDate] = React.useState(null);
  const [notes, setNotes] = React.useState(null);
  const [color, setColor] = React.useState(false);
  const [snackBarErrorOpen, setSnackBarErrorOpen] = React.useState(false);
  const [snackBarSuccessOpen, setSnackBarSuccessOpen] = React.useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());

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

  const handleSnackbarSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarSuccessOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    // setSnackBarErrorOpen(true);
  };

  const handleClear = (event) => {
    event.preventDefault();
    setCustomerName("");
    setCustomerNumber("");
    setInvoiceNumber(0);
    setInvoiceAmount(0);
    setNotes(null);
    setSnackBarErrorOpen(false);
    // setSnackBarSuccessOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSnackBarErrorOpen(false);
    setSnackBarSuccessOpen(false);
  };

  const submitData = async(event) => {
    event.preventDefault();
    if(customerName === null || customerNumber === null || invoiceNumber === null || invoiceAmount === null){
      setColor(true);
      setSnackBarErrorOpen(true);
      setSnackBarSuccessOpen(true);
    }
    console.log("Form Submitted!");
    let response_code = await addData(customerName , customerNumber , invoiceNumber , invoiceAmount , notes);
    if(response_code){
      setSnackBarSuccessOpen(true);
      handleClear(event);
    }
    fetchData();
  };



  return (
    <div style = {{display : 'inline-block'}}>
      <Snackbar open={snackBarErrorOpen} autoHideDuration={6000} onClose={handleSnackbarErrorClose} anchorOrigin = {{vertical: 'bottom', horizontal: 'left'}}>
        <Alert onClose={handleSnackbarErrorClose} severity="error">
            Mandatory Feilds Can't be Empty!
        </Alert>
      </Snackbar>
      <Snackbar open={snackBarSuccessOpen} autoHideDuration={6000} onClose={handleSnackbarSuccessClose} anchorOrigin = {{vertical: 'bottom', horizontal: 'left'}}>
        <Alert onClose={handleSnackbarSuccessClose} severity="success">
            Data Added Succesfully!
        </Alert>
      </Snackbar>
      <div className = {classes.addBtnContainer}>
        <Button variant="outlined" onClick={handleOpen} className = {classes.btnStyle}
          startIcon={<AddIcon style = {{height : pxToRem(20) , width : pxToRem(20)}}/>}
        >
          Add
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
                <h3 id="transition-modal-title" style = {{color : '#ffffff'}}>Add Invoice</h3>
                <span style = {{display : 'flex' , marginLeft : pxToRem(1000) , marginTop : pxToRem(25) , color : 'white' ,float : 'right'}}>
                    <CloseIcon onClick = {handleClose}/>
                </span>
            </div>
            <div className = {classes.formContainer}>
                <div className = {classes.formContainerLeft}>
                    <form action = "add" method = "post">
                        <div style = {{marginTop : pxToRem(30) , color : '#97A1A9'}}>
                            Customer Name <span className = {classes.asterix}>*</span>
                            <TextField 
                              id="outlined-basic" 
                              value = {customerName}
                              name = "customerName" 
                              variant="outlined" 
                              size = 'small' 
                              InputProps={{className: classes.NameInput}} 
                              onChange={(event) => {setCustomerName(event.target.value)}} 
                              style = {{border : '1px solid' , borderRadius : pxToRem(5), borderColor : color ? 'red' : '#14AFF1' , marginLeft : pxToRem(100) , backgroundColor : '#283A46' , color : 'white'}}
                            />
                        </div>
                        <div style = {{marginTop : pxToRem(28), color : '#97A1A9'}}>
                            Customer No <span className = {classes.asterix}>*</span>
                            <TextField 
                              id="outlined-basic" 
                              value = {customerNumber}
                              name = "customerNumber" 
                              variant="outlined" 
                              required = 'true' 
                              size = 'small' 
                              InputProps={{className: classes.NameInput}} 
                              onChange={(event) => {setCustomerNumber(event.target.value)}} 
                              style = {{border : '1px solid' , borderRadius : pxToRem(5), borderColor : color ? 'red' : '#14AFF1' , marginLeft : pxToRem(130) , backgroundColor : '#283A46' , color : 'white'}}
                            />
                        </div>
                        <div style = {{marginTop : pxToRem(28) , color : '#97A1A9'}}>
                            Invoice No <span className = {classes.asterix}>*</span>
                            <TextField 
                              id="outlined-basic" 
                              value = {invoiceNumber}
                              type = "number"
                              name = "docId" 
                              variant="outlined" 
                              size = 'small' 
                              InputProps={{className: classes.NameInput}} 
                              onChange={(event) => {setInvoiceNumber(event.target.value)}} 
                              style = {{border : '1px solid' , borderRadius : pxToRem(5), borderColor : color ? 'red' : '#14AFF1' , marginLeft : pxToRem(155) , backgroundColor : '#283A46' , color : 'white'}}
                            />
                        </div>  
                        <div style = {{marginTop : pxToRem(28) , color : '#97A1A9'}}>
                            Invoice Amount <span className = {classes.asterix}>*</span>
                            <TextField 
                              id="outlined-basic" 
                              value = {invoiceAmount}
                              type = "number"
                              name = "invoiceAmount" 
                              variant="outlined" 
                              size = 'small' 
                              InputProps={{className: classes.NameInput}} 
                              onChange={(event) => {setInvoiceAmount(event.target.value)}} 
                              style = {{border : '1px solid' , borderRadius : pxToRem(5), borderColor : color ? 'red' : '#14AFF1', marginLeft : pxToRem(105) , backgroundColor : '#283A46' , color : 'white'}}
                            />
                        </div> 
                    </form>
                </div>
                <div className = {classes.formContainerRight}>
                    <form>
                        <div style = {{marginTop : pxToRem(30) , color : '#97A1A9'}}>
                            Due Date <span className = {classes.asterix}>*</span>
                            <div className = {classes.dataPickerContainer}>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                  clearable
                                  value={selectedDate}
                                  onChange={date => handleDateChange(date)}
                                  minDate={'01/01/2000'}
                                  format="MM/dd/yyyy"
                                  InputProps={{ className: classes.input }}
                                  className = {classes.datePicker}
                                />
                              </MuiPickersUtilsProvider>
                            </div>
                        </div>
                        <div style = {{marginTop : pxToRem(28), color : '#97A1A9'}}>
                            Notes 
                            <TextField 
                              id="outlined-basic" 
                              value = {notes}
                              name = "notes" 
                              variant="outlined" 
                              size = 'small' 
                              InputProps={{className: classes.NotesInput}} 
                              onChange={(event) => {setNotes(event.target.value)}} 
                              style = {{marginLeft : pxToRem(140) , backgroundColor : '#283A46' , color : 'white'}}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className = {classes.modalFooter}>
                <Button onClick={submitData} style = {{float : 'right'}} className = {classes.AddBtn}>
                    Add
                </Button>
                <Button onClick={handleClear} style = {{float : 'right' , marginRight : '10px'}} className = {classes.btnStyle}>
                    Clear
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