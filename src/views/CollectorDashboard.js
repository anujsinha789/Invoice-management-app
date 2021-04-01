import React, { useState } from 'react';
import theme, { pxToVh , pxToRem } from '../utils/theme';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Footer from '../components/Footer';
import Header from '../components/Header'
import { Typography } from '@material-ui/core';
import { InputBase, TextField, OutlinedInput, Button } from '@material-ui/core';
import GridPanel from '../components/GridPanel';


const useStyles = makeStyles((theme) => ({
  InvoiceListSpanStyle : {
    display : 'inline-block',
    color : '#ffffff',
    margin : '10px 10px',
    fontSize : pxToRem(28),
  }
}));

const CollectorDashboard = (props) => {
  

  const classes = useStyles();
  const styles = {
    background : 'transparent radial-gradient(closest-side at 50% 50%, #58687E 0%, #39495E 100%) 0% 0% no-repeat padding-box',
    padding : pxToRem(10),
  }

  return (
    <div style = {styles}>
      <div className = "HeaderContainer">
        <Header />
      </div>
      <div className = {classes.InvoiceListSpanStyle}>Invoice List</div>
      <div>
        <GridPanel />
      </div>
    </div>
  );
};

export default CollectorDashboard;
