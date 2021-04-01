import React from 'react';
import { pxToRem } from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

const styles = {
   backgroundColor : 'transparent',
   height : pxToRem(45),
  //  width : pxToRem(99),
   border : '1px solid #14AFF1',
   color : '#FFFFFF',
   fontSize : pxToRem(20),
   borderRadius : pxToRem(10),
   display : 'flex'
}

const useStyles = makeStyles((theme) => ({
  editBtnContainer : {
    display : 'inline-block',
  }
}));

function EditButton(props) {
  const classes = useStyles();

  return (
    <div className = {classes.editBtnContainer}>
      <Button variant="outlined" style = {styles} startIcon={<EditIcon style = {{height : pxToRem(20) , width : pxToRem(20)}}/>}>
          Edit
      </Button>
    </div>  
  );
}

export default EditButton;
