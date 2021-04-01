import React from 'react';
import theme, { pxToRem } from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import SearchIcon from '../../assets/search_icon.svg';
import { fetchData } from '../../services/fetchData.js';

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
  searchBarContainer : {
    display : 'inline-block',
    margin : 0,
    padding : pxToRem(0)
  },
  searchBar: {
      height : pxToRem(45),
      marginTop : pxToRem(-10.5),
      background : '#283A46',
      color : '#ffffff',
      border : '2px solid #356680',
      borderRadius : pxToRem(10),
      '&:focus': {
        border : '2px solid white'
      }
  },
  
}));



function SearchBar(props) {
  const  classes  = useStyles();
   
  const [values, setValues] = React.useState({
    searchTerm: '',
  });
  const [originalRows , setOriginalRows] = React.useState([]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  
  return (
    <div className = {classes.searchBarContainer}>
      <FormControl fullWidth variant="outlined">
          <OutlinedInput
            id="search-bar"
            value={values.searchTerm}
            placeholder = "search by invoice number"
            onChange={handleChange('searchTerm')}
            endAdornment={<InputAdornment position="start"><img src={SearchIcon} alt="Logo" style = {{width : pxToRem(28) , height : pxToRem(28)}}/></InputAdornment>}
            className={classes.searchBar}
          />
        </FormControl>
    </div>
  );
}

export default SearchBar;
