import React, { Component } from 'react';
import { FormControl } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Home.css';

const axios = require('axios');

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);

    this.state = {
      currencies: [],
      baseCurrency: '',
      targetCurrency: '',
      ammount: 0,
      result: 0,
      showResult: false
    };

    this.handleBaseCurrencyChange = this.handleBaseCurrencyChange.bind(this);
    this.handleTargetCurrencyChange = this.handleTargetCurrencyChange.bind(this);
    this.handleAmmountChange = this.handleAmmountChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    axios.get('https://localhost:44306/api/Currency/GetCurrencies')
      .then((response) => {
        this.setState({ currencies: response.data });
      })
  }

  handleBaseCurrencyChange(event) {
    this.setState({ baseCurrency: event.target.value });
  }

  handleTargetCurrencyChange(event) {
    this.setState({ targetCurrency: event.target.value });
  }

  handleAmmountChange(event) {
    this.setState( {ammount: event.target.value });
  }

  handleButtonClick(event) {
    axios.get(`https://localhost:44306/api/Currency/GetRatesByCurrency?baseCurrency=${this.state.baseCurrency}&nextCurrency=${this.state.targetCurrency}&quantity=${this.state.ammount}`)
    .then((response) => {
      this.setState({ 
        result: response.data, 
        showResult: true
      });
    });
  }

  render() {
    return (
      <div>
        <FormControl required className="form-control">
          <div className="dropdown">
            <InputLabel id="baseCurrencyLabel">
              Base currency
        </InputLabel>
            <Select
              id="baseCurrency"
              labelId="baseCurrencyLabel"
              className="dropdown"
              value={this.state.baseCurrency}
              onChange={this.handleBaseCurrencyChange}
            >
              {this.state.currencies.map((currency) => (<MenuItem value={currency} key={currency}>{currency}</MenuItem>))}
            </Select>
          </div>
        </FormControl>
        <FormControl className="form-control">
          <div>
            <TextField
              id="ammount"
              label="Ammount"
              required="true"
              onChange={this.handleAmmountChange}
            />
          </div>
        </FormControl>
        <FormControl required className="form-control">
          <div className="dropdown">
            <InputLabel id="targetCurrencyLabel">
              Target currency
          </InputLabel>
            <Select
              id="targetCurrency"
              labelId="targetCurrencyLabel"
              className="dropdown"
              required="true"
              value={this.state.targetCurrency}
              onChange={this.handleTargetCurrencyChange}
            >
              {this.state.currencies.map((currency) => (<MenuItem value={currency} key={currency}>{currency}</MenuItem>))}
            </Select>
          </div>
        </FormControl>
        <FormControl className="form-control">
          <div>
            <Button 
              variant="contained"
              onClick={this.handleButtonClick}
              >Default</Button>
          </div>
        </FormControl>
        <FormControl className="form-control">
          <div>
          { this.state.showResult 
          ? <TextField
              id="result"
              label="Result"
              value={this.state.result}
            /> 
          : null }
          </div>
        </FormControl>
      </div>
    );
  }
}
