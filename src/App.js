import React, { Component } from 'react'
import Register from './components/Register/Register';
import Login from './components/Login/Login';

export default class App extends Component {
  render() {
    return (
      <div>
        <Login />
        <Register />
      </div>
    )
  }
}
