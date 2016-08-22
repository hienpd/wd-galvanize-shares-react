import { blue500 } from 'material-ui/styles/colors';
import { blue700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'components/Routes';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  flatButton: {
    buttonFilterColor: blue700,
    textColor: 'white'
  },

  palette: {
    primary1Color: blue500
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Routes/>
  </MuiThemeProvider>,
  document.getElementById('app')
);
