import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export class Home extends Component {
  static displayName = Home.name;

  componentDidMount(){
    
  }

  render () {
    return (
      <div>
        <h1>Home</h1>
        <InputLabel>Base currency</InputLabel>
        <Select></Select>
        <InputLabel>Target currency</InputLabel>
        <Select></Select>
      </div>
    );
  }
}
