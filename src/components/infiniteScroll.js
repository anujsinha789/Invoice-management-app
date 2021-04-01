import React, { useEffect } from "react";
import axios from "axios";
import { CircularProgress, Hidden } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { makeStyles } from "@material-ui/core/styles";
import DataTable from "./DataTable";
import { fetchData } from '../services/fetchData.js';
import { pxToRem } from "../utils/theme";

const useStyles = makeStyles({
  tableContainer: {
    width: "100%",
    height: "100%",
    margin: "auto",
    backgroundColor : 'none',
    borderRadius : '10px',
    overflowX : 'hidden',
  }
});

function InfiniteScrollTable() {
  let [resData, setresData] = React.useState([]);
  let [isNext, isNextFunc] = React.useState(false);
  let [pageCount, setCount] = React.useState(1);

  // useEffect(async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/1806197/fetch?`,{
  //           params: {
  //           limit: 500,
  //           pageCount,
  //          }
  //         });
  //       setresData([...resData, ...response.data]);
  //       console.log(resData);
  //       isNextFunc(true);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, [pageCount]);
    const fetchData = () => {
      axios
        .get(
          `http://localhost:8080/1806197/fetch?`,
          {
            params: {
            limit: 500,
            pageCount,
           }
          }
        )
        .then((response) => {
          setresData([...resData, ...response.data]);
          isNextFunc(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };  

  function fetchMoreData() {
    console.log("fetchMoreData Called!")
    setCount(pageCount + 1);
    fetchData();
  }

  useEffect(async() => {
    fetchData();
  },[]);

  const classes = useStyles();

  return (
    <div className={classes.tableContainer}>
      <InfiniteScroll
        dataLength={resData.length} //length of our resData
        next={fetchMoreData} //pass the function which will load more data
        hasMore={isNext} //whether to call next component while scrolling or not.
        loader={
          <div
          style={{display : 'flex' , paddingTop : '10px' , overflow: "hidden" ,justifyContent : 'center' , alignItems : 'center' , height : pxToRem(500)}}
          >
            <center>
              <CircularProgress color = 'blue' />
              <div>Loading</div>
            </center>
          </div>
        }
        // scrollableTarget="scrollableDiv"
      >
        <div>
          <DataTable resData={resData} />
        </div>
      </InfiniteScroll>
    </div>
  );
}
export default InfiniteScrollTable;
