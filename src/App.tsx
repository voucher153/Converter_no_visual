import React from 'react';
import classes from './App.module.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import {Block} from './components/Block/Block';
import { Reverse } from './components/Reverse/Reverse';

const App = () => {

  //1

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className={classes.wrapper}>
          <Block whatDoing="from" />
          <Block whatDoing="to" />
          <Reverse />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
