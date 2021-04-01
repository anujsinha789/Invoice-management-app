import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CloseIcon from '@material-ui/icons/Close';
import { pxToRem } from '../../utils/theme';
import ViewCorrespondenceTable from '../ViewCorrespondenceTable.js'
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { renderToString } from 'react-dom/server';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(.5,4), //, 4, 0),
    background: '#2A3E4C 0% 0% no-repeat padding-box',
    boxShadow: '0px 8px 24px #00000029',
    borderRadius: '6px',
    maxWidth : '90%',
    maxHeight : '85%',
    overflow : 'auto'
  },
  titleContainer:{
      borderBottom : '1px solid black',
      textAlign : 'left',
      display : 'flex',
      position : 'sticky',
      top : 0,
      background : '#2A3E4C'
  },
  msgContainer : {
    width : '100%',
    height : '100%',
  },

  msgContainerTop : {
    color : '#ffffff',
    padding : pxToRem(10),
  },

  msgContainerBottom : {
    color : '#ffffff',
    padding : pxToRem(10),
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
      padding : pxToRem(20),
      paddingBottom : pxToRem(20),
      position : 'sticky',
      bottom : 15,
      background : '#2A3E4C',
      opacity : 1,
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
      },
  },
  deleteBtnContainer : {
    display : 'inline-block',
    marginLeft : pxToRem(20),
    marginRight : pxToRem(20)
    // padding : pxToRem(10)
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
        // backgroundColor: '#14AFF1',
        color : '#ffffff'
      }
 },
 tableHeader : {
  color : '#97A1A9',
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


export default function ViewCorrespondenceModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [totalAmountPayble, setTotalAmountPayble] = React.useState(0);
  let rows = [...props.invoiceGroup];
  const [pdfRows,setPdfRows] = React.useState([])
  let totalAmount = 0;

  const handleOpen = () => {
    setPdfRows(rows.map((row,index) => {return [row.InvoiceId.toString(),row.DocId.toString(),row.DocumentCreateDate,row.DueInDate,row.InvoiceCurrency,row.TotalOpenAmount.toString()]}));
    setOpen(true);
    rows.map((row) => {totalAmount += parseFloat(row.TotalOpenAmount)});
    setTotalAmountPayble(totalAmount)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const stringifyReactComponent = () => {
    return renderToString(<ViewCorrespondenceTable  invoiceGroup = {pdfRows}/>)
  }

  const getSelectedRows = () => {
    const cols = ['invoice Number' , 'PO Number' , 'Invoice Date' , 'Due Date' , 'Sales_order_currency' , 'Open Amount($)'];
    return{
      cols,
      pdfRows,
    };
  };

  const handleDownload = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    const stringifiedData = stringifyReactComponent();
    console.log(stringifiedData);
    const { pdfRows,cols } = getSelectedRows();
    autoTable(doc,{
      columns : cols,
      body : pdfRows,
      theme : 'grid',
    });

    window.open(doc.output('bloburl'),'_blank');
  }

  return (
    <div style = {{display : 'inline-block'}}>
        <div className = {classes.viewCorrespondenceBtnContainer}>
        <Button variant="outlined" onClick = {handleOpen} className = {classes.BtnStyle}>
          View Correspondence
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
                <h3 id="transition-modal-title" style = {{color : '#ffffff'}}>View Correspondence</h3>
                <span style = {{display : 'flex' , marginLeft : pxToRem(1300) , marginTop : pxToRem(20) , color : 'white' ,float : 'right'}}>
                    <CloseIcon onClick = {handleClose}/>
                </span>
            </div>
            <div className = {classes.msgContainer}>
                <div className = {classes.msgContainerTop}>
                    <span style = {{color : '#97A1A9'}}>Subject :</span> Invoice Details - Account Name
                </div>
                <div>
                  <span style = {{color : '#C0C6CA'}}>
                  <div style = {{margin : pxToRem(5)}}>Dear Sir/Madam,</div>
                   <div style = {{margin : pxToRem(5) , marginBottom : pxToRem(30)}}>Greetings!</div> 
                  <div style  = {{margin : pxToRem(5)}}>
                    This is to remind you that there are one or more open invoices on your account. 
                    Please provide at your earliest convenience an update on the payment details or clarify the reason for the delay. 
                    If you have any specific issue with the invoice(s), please let us know so that we can address it to the correct Department. 
                  </div>
                  <div style = {{margin : pxToRem(5) , marginBottom : pxToRem(30), marginTop : pxToRem(30)}}>  
                    Please find the details of the invoices below:
                  </div>  
                  </span>
                </div>
                <div className = {classes.msgContainerBottom}>
                  <ViewCorrespondenceTable invoiceGroup = {rows}/>
                </div>
            </div>
            <div style = {{margin : pxToRem(10)}}>
              <span style = {{color : '#C0C6CA'}}>Total Amount to be Paid : </span><span style = {{color : 'white'}}>${totalAmountPayble}</span>
            </div>
            <div style = {{margin : pxToRem(10)}}>
              <span style = {{color : '#C0C6CA'}}>In case you have already made a payment for the above items, please send us the detailsto ensure the payment is posted. </span><br/>
              <span style = {{color : '#C0C6CA'}}>Let us know if we can be of any further assistance. Looking forward to hearing from you. </span>
            </div>
            <div style = {{margin : pxToRem(10)}}>
              <span style = {{color : '#C0C6CA' , margin : pxToRem(2)}}>Kind Regards,</span><br/>
              <span style = {{color : 'white' , margin : pxToRem(2)}} >[Sender's First Name][Sender's Last Name]</span><br/>
              <span style = {{color : '#C0C6CA' , margin : pxToRem(2)}}>Phone : </span><span style = {{color : 'white' , margin : pxToRem(2)}}>[Sender's contact number]</span><br/>
              <span style = {{color : '#C0C6CA' , margin : pxToRem(2)}}>Email : </span><span style = {{color : 'white' , margin : pxToRem(2)}}>[Sender's Email Address]</span><br/>
              <span style = {{color : 'white' , margin : pxToRem(2)}}>Company Name</span><span style = {{color : 'white' , margin : pxToRem(2)}}>[Sender's Company name]</span><br/>
            </div>
            <div className = {classes.modalFooter}>
                <Button onClick={handleDownload} style = {{float : 'right'}} className = {classes.AddBtn}>
                    Download
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