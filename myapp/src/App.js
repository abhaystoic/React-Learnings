import React, { Component } from 'react';
import Ninjas from './Ninjas';
import AddNinja from './AddNinjas';

class App extends Component {
  state = {
    ninjas : [
      { name: 'Abhay', age: 25, belt: 'black', id: 1 },
      { name: 'Yoshi', age: 19, belt: 'red', id: 2 },
      { name: 'Ryu', age: 25, belt: 'yellow', id: 3 },
    ],
  }

  componentDidMount() {
    console.log('Component mounted.');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component updated.');
    console.log(prevProps, prevState);
  }
  
  addNinja = (ninja) => {
    // console.log(ninja);
    ninja.id = Math.random();
    let ninjas = [...this.state.ninjas, ninja];
    this.setState({
      ninjas: ninjas,
    });
  }

  deleteNinja = (id) => {
    let ninjas = this.state.ninjas.filter(ninja => {
      return ninja.id !== id
    });
    this.setState({
      ninjas: ninjas,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>My first React App!</h1>
        <p>Welcome!</p>
        <Ninjas deleteNinja={this.deleteNinja} ninjas={this.state.ninjas}/>
        <AddNinja addNinja={this.addNinja}/>
      </div>
    );
  }
}

export default App;
