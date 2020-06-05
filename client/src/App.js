import React, { Fragment } from 'react';
import Header from './components/Header'
import Body from './components/Body'
import { DataProvider } from './components/DataContext'

function App() {
  return (
    <Fragment>
      <DataProvider>
        <Header />
        <Body />
      </DataProvider>
    </Fragment>
  );
}

export default App;
