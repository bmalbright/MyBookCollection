import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import SeachForBooks from './pages/SearchForBooks'
import SaveMyBooks from './pages/SaveMyBooks'


function App() {
  return (
    <Router>
      <>
        <NavBar />
        <Routes>
          <Route exact path='/' component={SeachForBooks}></Route>
          <Route exact path='/saved' component={SaveMyBooks}></Route>
          <Route render={() => <h1 className="'display-2">WRONG PAGE!</h1>}></Route>
        </Routes>
    </>
</Router >
  );
}

export default App;
