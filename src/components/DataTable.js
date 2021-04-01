import React , { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PredictButton from './Buttons/PredictButton';
import ViewCorrespondenceModal from './Modals/viewCorrespondenceModal';
import SearchBarComponent from './Buttons/SearchBar.js';
import AddInvoiceModal from './Modals/AddInvoiceModal.js';
import EditInvoiceModal from './Modals/EditInvoiceModal';
import DeleteInvoiceModal from './Modals/DeleteInvoiceModal';
import Checkbox from '@material-ui/core/Checkbox';
import { pxToRem } from '../utils/theme.js';
import { CircularProgress, Hidden } from "@material-ui/core";
import {createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import errorIcon from '../assets/error_icon.svg';
import { sortInvoice } from '../services/sortInvoice.js';

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 650,
    backgroundColor : '#273D49CC'
  },
  dataRow : {
    border : 'none',
  },
  tableHeader : {
    backgroundColor : 'rgb(39 61 73)',
    borderBottom : '1px solid #273D49CC',
    color : '#97A1A9',
  },
  tableHeaderContainer : {
    position: '-webkit-sticky',
    position: 'sticky',
    top: '0'
  },
  LoaderContainer : {
    width : '100%',
    height : '100%',
    backgroundColor : 'red',
    margin : 'auto'
  },
  root : {
    width : '100%',
    display: 'inline-block',
    margin : 'auto',
  },
  gridHeaderLeft : {
    width : '40%',
    display : 'inline-block',
    justifyContent : 'space-between'
  },
  gridHeaderRight : {
    width : '56%',
    display : 'inline-block',
    float : 'right',
    marginLeft : pxToRem(10)
  }
}));

const gridHeader = {
  color: "white",
  backgroundColor : 'rgb(39 61 73)',
  height : pxToRem(50),
  padding : pxToRem(10),
  fontFamily: "Arial",
  opacity : '1',
  width : '100%',
  position: '-webkit-sticky',
  position: 'sticky',
  top: '0'
};

const theme = createMuiTheme({
  palette: {
     secondary: {
         main: '#42baf5'
     }
  }
})




export default function DataTable(props) {
  
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [docId, setDocId] = React.useState(null);
  const [deletedRow , setDeletedRow] = React.useState(null);
  const [invoiceGroup , setInvoiceGroup] = React.useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [noValue,setnoValue] = useState(false);
  const [checked,setChecked] = useState(false);
  const [isChecked , setIsChecked] = useState(false)
  const [serverConnected,setServerConnected] = React.useState(false);




  const handleChange = (event , index , row ,docId) => {
    if(event.target.checked){
      setDeletedRow(docId);
      setDocId(docId);
      setInvoiceGroup([...invoiceGroup , row]);
      setIsChecked(true);
    }
    else{
      setDeletedRow(null);
      let invoiceGroupArr = invoiceGroup.filter((n) => {return n !== row});
      setInvoiceGroup([...invoiceGroupArr]);
      setIsChecked(false);
    }
  }; 

  const handleChangeSelectAll = (event) => {
    if(event.target.checked){
      setChecked(true);
    }
    else{
      setChecked(false);
    }
  }; 

  const checkConnection = () => {
    return !rows.length === 0;
  }

  const handleSort = async() => {
    setIsSorted(true);
    setRows(await sortInvoice());
  }
  
  useEffect(async() => {
    if(isSorted == false){
      const data = await props.resData;
      setRows(data);
    }
    if(checkConnection){
      setServerConnected(true);
    }
  });

  return (
    <div>
    <div style = {gridHeader}>
      <div className = {classes.gridHeaderLeft}>
        <PredictButton isEnabled = {isChecked} invoice = {invoiceGroup}/>
        <ViewCorrespondenceModal invoiceGroup = {invoiceGroup}/>
      </div> 
      <div className = {classes.gridHeaderRight}> 
        <AddInvoiceModal />
        <EditInvoiceModal docId = {docId}/>
        <DeleteInvoiceModal deletedRow = {deletedRow}/>
        <SearchBarComponent />
      </div>  
    </div>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className = {classes.tableHeader}>
            <TableCell className = {classes.tableHeader}>
              <Checkbox checked={checked}
                onChange={(event) => handleChangeSelectAll(event)}
                color="red"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              Customer Name</TableCell>
            <TableCell align="right" className = {classes.tableHeader}>Customer#</TableCell>
            <TableCell align="right" className = {classes.tableHeader}>Sales_order_id</TableCell>
            <TableCell align="right" className = {classes.tableHeader} onClick = {handleSort}>Invoice Amount</TableCell>
            <TableCell align="right" className = {classes.tableHeader}>Due Date</TableCell>
            <TableCell align="right" className = {classes.tableHeader}>Predicted payment date</TableCell>
            <TableCell align="right" className = {classes.tableHeader}>Predicted Aging Bucket</TableCell>
            <TableCell align="right" className = {classes.tableHeader}>Notes</TableCell>
          </TableRow>
        </TableHead>
        {serverConnected && rows.length == 0 && <center><div
          style={{ background : '#273D49CC' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' , width : pxToRem(1800) , margin : 'auto' ,paddingTop : '10px' , overflow: "hidden" , height : pxToRem(500)}}
          >
            <center>
              <MuiThemeProvider theme={theme}>
                <CircularProgress color = 'secondary' />
              </MuiThemeProvider>  
                <div style = {{color : 'white'}}>Loading</div>
            </center>
          </div></center>}
          {!serverConnected && <center><div
          style={{ background : '#273D49CC' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' , width : pxToRem(1800) , margin : 'auto' ,paddingTop : '10px' , overflow: "hidden" , height : pxToRem(500)}}
          >
            <center>
              <div><img src = {errorIcon}></img></div>
              <div style = {{color : 'white'}}>No Results Found!</div>
            </center>
          </div></center>}
        <TableBody> 
        {noValue && <div><h1 style={{textAlign:"center",color:"black"}}>No Results Found</h1></div>}
          {rows.map((row,index) => (
            <TableRow key={row.DocId} style = {{backgroundColor : index % 2 == 0 ? '#283A46' : '#273D49CC' ,color : 'white'}} className = {classes.dataRow}>
              <TableCell component="th" scope="row" style = {{border : 'none' , color : '#ffffff'}}>

              {checked && <Checkbox
                checked={checked}
                onChange={(event) => handleChange(event,index,row,row.DocId)}
                color="red"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />}

              {!checked && <Checkbox
                onChange={(event) => handleChange(event,index,row,row.DocId)}
                color="red"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />}

                {row.CustomerName}
              </TableCell>
              <TableCell align="right" style = {{border : 'none' , color : '#ffffff'}}>{row.CustomerNumber}</TableCell>
              <TableCell align="right" style = {{border : 'none' , color : '#ffffff'}}>{row.InvoiceId}</TableCell>
              <TableCell align="right" style = {{border : 'none' , color : '#ffffff'}}>{row.TotalOpenAmount}K</TableCell>
              <TableCell align="right" style = {{border : 'none' , color : row.ClearDate == null ? 'red' : '#ffffff'}}>{row.DueInDate}</TableCell>
              <TableCell align="right" style = {{border : 'none' , color : '#ffffff'}}>--</TableCell>
              <TableCell align="right" style = {{border : 'none' , color : '#ffffff'}}>--</TableCell>
              <TableCell align="right" style = {{border : 'none' , color : '#ffffff'}}>lorem ipsem dolor</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}



