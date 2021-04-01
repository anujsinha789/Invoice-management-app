import React from 'react';
import { pxToRem } from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
   backgroundColor : 'transparent',
   height : pxToRem(45),
   border : '1px solid #14AFF1',
   color : '#FFFFFF',
   fontSize : pxToRem(20),
   borderRadius : pxToRem(10),
   display : 'inline-block'
}
const useStyles = makeStyles((theme) => ({
  viewCorrespondenceBtnContainer : {
    display : 'inline-block',
    marginLeft : pxToRem(20),
    marginRight : pxToRem(20)
  }
}));

function ViewCorrespondenceButton(props) {
  const classes = useStyles();

  return (
    <div className = {classes.viewCorrespondenceBtnContainer}>
      <Button variant="outlined" style = {styles}>
          View Correspondence
      </Button>
    </div>
  );
}

export default ViewCorrespondenceButton;
