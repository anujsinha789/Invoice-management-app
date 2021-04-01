
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { pxToRem } from '../utils/theme';
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
    padding: theme.spacing(2, 4, 3),
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
      display : 'flex'
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
      bottom : 0,
      background : '#2A3E4C',
      opacity : 1
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


export default function ViewCorrespondenceTable(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [totalAmountPayble, setTotalAmountPayble] = React.useState(0);
  let rows = [...props.invoiceGroup];
  let totalAmount = 0;
  
  return (
    <div style = {{display : 'inline-block' , width : '100%'}}>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow className = {classes.tableHeader}>
                  <TableCell className = {classes.tableHeader}>Invoice Number</TableCell>
                    <TableCell align="right" className = {classes.tableHeader}>PO Number</TableCell>
                    <TableCell align="right" className = {classes.tableHeader}>Invoice Date</TableCell>
                    <TableCell align="right" className = {classes.tableHeader}>Due Date</TableCell>
                    <TableCell align="right" className = {classes.tableHeader}>Sales_order_currency</TableCell>
                    <TableCell align="right" className = {classes.tableHeader}>Open Amount($)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody> 
                {rows.map((row,index) => (
                <TableRow key={row.DocId} style = {{backgroundColor : index % 2 == 0 ? '#283A46' : '#273D49CC' ,color : 'white'}} className = {classes.dataRow}>
                    <TableCell component="th" scope="row" style = {{border : 'none' , color : '#ffffff'}}>
                {row.InvoiceId}
              </TableCell>
              <TableCell align="right" style = {{border : 'none' , color : '#ffffff'}}>{row.DocId}</TableCell>
              <TableCell align="right" style = {{border : 'none' , color : '#ffffff'}}>{row.DocumentCreateDate}</TableCell>
              <TableCell align="right" style = {{border : 'none' , color : '#ffffff'}}>{row.DueInDate}</TableCell>
              <TableCell align="right" style = {{border : 'none' , color : '#ffffff'}}>{row.InvoiceCurrency}</TableCell>
              <TableCell align="right" style = {{border : 'none' , color : '#ffffff'}}>{row.TotalOpenAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </div>
  )};
