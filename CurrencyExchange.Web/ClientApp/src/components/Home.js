import { FormControl } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/AutoComplete';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import './Home.css';


const axios = require('axios');

function Home() {

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
          <Autocomplete
            id="baseCurrency"
            options={currencies}
            getOptionLabel={(option) => option}
            className="dropdown"
            disableClearable
            onChange={(event, newValue) => { setBaseCurrency(newValue); }}
            renderInput={(params) => <TextField {...params} label="Base currency *" />}
          />
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
          <Autocomplete
            id="targetCurrency"
            options={currencies}
            getOptionLabel={(option) => option}
            className="dropdown"
            disableClearable
            onChange={(event, newValue) => { setTargetCurrency(newValue); }}
            renderInput={(params) => <TextField {...params} label="Target currency *" />}
          />
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