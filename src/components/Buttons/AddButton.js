import React from 'react';
import theme, { pxToRem } from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  addBtnContainer : {
    display : 'inline-block',
    padding : pxToRem(10),
  }
  
}));

const btnStyle = {
   backgroundColor : 'transparent',
   height : pxToRem(45),
   border : '1px solid #14AFF1',
   color : '#FFFFFF',
   fontSize : pxToRem(20),
   borderRadius : pxToRem(10),
   display : 'flex',
}
const HandleClick = () => {
  console.log("Add Button Clicked!");
}

function AddButton(props){
    const classes = useStyles();
    return (
      <div className = {classes.addBtnContainer}>
        <Button 
          variant="outlined" 
          style = {btnStyle} 
          startIcon={<AddIcon style = {{height : pxToRem(14) , width : pxToRem(14)}}/>}
        >
          Add
        </Button>
      </div>
    );
}

export default AddButton;
