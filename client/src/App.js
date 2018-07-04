import React, { Component } from 'react';
import NavBar from './components/nav-bar/NavBar';
import Main from './components/main/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Main/>
      </div>
    );
  }
}

export default App;
