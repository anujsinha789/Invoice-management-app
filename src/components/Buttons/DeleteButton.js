import React from 'react';
import theme, { pxToRem } from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
   backgroundColor : 'transparent',
   height : pxToRem(45),
   border : '1px solid #14AFF1',
   color : '#FFFFFF',
   fontSize : pxToRem(20),
   borderRadius : pxToRem(10),
   display : 'flex'
}

const useStyles = makeStyles((theme) => ({
  deleteBtnContainer : {
    display : 'inline-block',
  }
}));

function DeleteButton(props) {
  const  classes  = useStyles();
  return (
    <div className = {classes.deleteBtnContainer}>
      <Button variant="outlined" style = {styles} startIcon={<DeleteIcon style = {{height : pxToRem(20) , width : pxToRem(20)}}/>}>
          Delete
      </Button>
    </div>
  );
}

export default DeleteButton;
