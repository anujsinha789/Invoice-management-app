import React from 'react';
import Paper from '@material-ui/core/Paper';
import { pxToRem } from '../utils/theme';
import DataTable  from './DataTable';
import InfiniteScrollTable from './infiniteScroll.js';

const mystyle = {
        color: "white",
        backgroundColor: "#273D49CC",
        height : pxToRem(739),
        fontFamily: "Arial",
        overflow : 'auto'
};


function GridPanel() {
  return (
      <div>
          <Paper style = {mystyle} maxWidth = "lg">
            <div>
              <InfiniteScrollTable />
            </div>
          </Paper>
      </div>
  );
}

export default GridPanel;
