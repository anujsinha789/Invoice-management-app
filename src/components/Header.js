import React from 'react';
import { pxToRem } from '../utils/theme';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import logo from '../assets/logo.svg';
import companyLogo from '../assets/companyLogo.svg';


const HrcLogoStyle = {
  top: pxToRem(22),
  margin: 'auto',
  width: pxToRem(235),
  height: pxToRem(50),
}
const companyNameStyle = {
  fontSize : pxToRem(39),
  color : '#ffffff',
  top: pxToRem(20),
  left: pxToRem(86),
  font : 'normal normal bold 39px/50px Futura PT'

}

const useStyles = makeStyles({
  companyLogoContainer : {
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    display : 'flex',
    alignItems : 'center'
  },
  hrcLogoContainer : {
    display : 'inline-block',
    marginLeft: pxToRem(380)
  }
});

function Header(props) {
  
  const classes = useStyles();
  return (
   
    <Grid
      item
      xs={0}
      style={{
        display: 'flex',
        height: "15vh",
        alignItems: "center"
      }}
    >
        <div className = {classes.companyLogoContainer}>
          <img src = {companyLogo} alt="Logo"/>
          <span style = {companyNameStyle}>ABC Product</span>
        </div>
        <div className = {classes.hrcLogoContainer}>
          <img src={logo} alt="Logo" style = {HrcLogoStyle}/>
        </div>  
    </Grid>
  );
}

export default Header;
