import React, { useEffect, useState } from 'react';
import { FormControl } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Home.css';

const axios = require('axios');

function Home(props) {

  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [ammount, setAmmount] = useState(0);
  const [result, setResult] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [shouldShowHelperText, setShouldShowHelperText] = useState(false);

  useEffect(() => {
    axios.get('https://localhost:44306/api/Currency/GetCurrencies')
      .then((response) => {
        setCurrencies(response.data);
      });
  });

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  }

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value);
  }

  const handleAmmountChange = (event) => {
    setAmmount(event.target.value);
  }

  const handleButtonClick = (event) => {
    if (checkIfEmptyFields()) {
      setShouldShowHelperText(true);

      return;
    }

    axios.get(`https://localhost:44306/api/Currency/GetRatesByCurrency?baseCurrency=${baseCurrency}&nextCurrency=${targetCurrency}&quantity=${ammount}`)
      .then((response) => {
        setResult(response.data);
        setShowResult(true);
      });
  }

  const checkIfEmptyFields = () => {
    if (baseCurrency === "" || targetCurrency === "" || ammount === 0) {
      return true;
    }

    return false;
  }

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
            value={baseCurrency}
            onChange={handleBaseCurrencyChange}
          >
            {currencies.map((currency) => (<MenuItem value={currency} key={currency}>{currency}</MenuItem>))}
          </Select>
        </div>
        {baseCurrency === "" && shouldShowHelperText
          ? <FormHelperText>Base currency is required</FormHelperText>
          : null}
      </FormControl>
      <FormControl className="form-control">
        <div>
          <TextField
            id="ammount"
            label="Ammount"
            required={true}
            onChange={handleAmmountChange}
          />
        </div>
        {(ammount === 0 || ammount === "") && shouldShowHelperText
          ? <FormHelperText>Ammount is required</FormHelperText>
          : null}
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
            required={true}
            value={targetCurrency}
            onChange={handleTargetCurrencyChange}
          >
            {currencies.map((currency) => (<MenuItem value={currency} key={currency}>{currency}</MenuItem>))}
          </Select>
        </div>
        {targetCurrency === "" && shouldShowHelperText
          ? <FormHelperText>Target currency is required</FormHelperText>
          : null}
      </FormControl>
      <FormControl className="form-control">
        <div>
          <Button
            variant="contained"
            onClick={handleButtonClick}
          >
            Calculate
            </Button>
        </div>
      </FormControl>
      <FormControl className="form-control">
        <div>
          {showResult
            ? <TextField
              id="result"
              label="Result"
              value={result}
            />
            : null}
        </div>
      </FormControl>
    </div>
  );
}

export default Home;