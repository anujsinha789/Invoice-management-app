import React from 'react';
import theme, { pxToRem } from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { prediction } from '../../services/prediction';


const useStyles = makeStyles((theme) => ({
  predictBtnContainer : {
    display : 'inline-block',
    marginLeft : pxToRem(20),
    marginRight : pxToRem(20)
  },
  BtnStyle : {
    height : pxToRem(45),
    border : '1px solid #14AFF1',
    color : '#FFFFFF',
    fontSize : pxToRem(20),
    borderRadius : pxToRem(10),
    textAlign : 'center',
    display : 'flex'
  }
}));

function PredictButton(props) {
  const classes = useStyles();
  const [isDisabled , setIsDisabled] = React.useState(false);
  
  const handleClick = async() => {
    let dataArr = {
      "id" : "1806197",
      "data" : [props.invoice.business_code,props.invoice.total_open_amount,props.invoice.cust_payment_terms]
    }
    setIsDisabled(!props.isEnabled);
    console.log(props.isEnabled);
    const data = await prediction(dataArr);
    console.log(data);
  }
  return (
    <div className = {classes.predictBtnContainer}>
      <Button variant="contained" className = {classes.BtnStyle} style = {{backgroundColor : isDisabled ? '#97A1A9' : ' #14AFF1'}} disabled = {isDisabled} onClick = {handleClick}>
        Predict
      </Button>
    </div>  
  );
}

export default PredictButton;
