import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/AutoComplete';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import React, { useEffect, useState } from 'react';
import './Home.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 64
  },
  input: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  btn: {
    top: `25%`,
    left: `25%`
  }
}));


const axios = require('axios');

function Home() {
  const classes = useStyles();

  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [ammount, setAmmount] = useState(0);
  const [result, setResult] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [shouldShowHelperText, setShouldShowHelperText] = useState(false);
  const [periodSwitchChecked, setPeriodSwitchChecked] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  useEffect(() => {
    axios.get('https://localhost:44306/api/Currency/GetCurrencies')
      .then((response) => {
        setCurrencies(response.data);
      });
  });

  const handleAmmountChange = (event) => {
    setAmmount(event.target.value);
  }

  const handlePeriodSwitchChecked = (event) => {
    setPeriodSwitchChecked(!periodSwitchChecked);
  }

  const handleFromDateChange = (date) => {
    setFromDate(date);
  }

  const handleToDateChange = (date) => {
    setToDate(date);
  }

  const handleButtonClick = (event) => {
    if (checkIfEmptyFields()) {
      setShouldShowHelperText(true);

      return;
    }

    axios.get(`https://localhost:44306/api/Currency/GetRatesByCurrency?baseCurrency=${baseCurrency}&targetCurrency=${targetCurrency}&quantity=${ammount}`)
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
    <div className={classes.root}>
      <div>
        <Grid container>
          <Grid item xs={3}>
            <Autocomplete
              id="baseCurrency"
              options={currencies}
              getOptionLabel={(option) => option}
              disableClearable
              className={classes.input}
              onChange={(event, newValue) => { setBaseCurrency(newValue); }}
              renderInput={(params) => <TextField {...params} label="Base currency *" />}
            />
            {baseCurrency === "" && shouldShowHelperText
              ? <FormHelperText>Base currency is required</FormHelperText>
              : null}
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="ammount"
              label="Ammount"
              className={classes.input}
              required={true}
              onChange={handleAmmountChange}
            />
            {(ammount === 0 || ammount === "") && shouldShowHelperText
              ? <FormHelperText>Ammount is required</FormHelperText>
              : null}
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              id="targetCurrency"
              options={currencies}
              getOptionLabel={(option) => option}
              disableClearable
              className={classes.input}
              onChange={(event, newValue) => { setTargetCurrency(newValue); }}
              renderInput={(params) => <TextField {...params} label="Target currency *" />}
            />
            {targetCurrency === "" && shouldShowHelperText
              ? <FormHelperText>Target currency is required</FormHelperText>
              : null}
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              className={classes.input, classes.btn}
              onClick={handleButtonClick}
            >
              Calculate
            </Button>
          </Grid>
          <Grid item xs={3}>
            {showResult
              ? <TextField
                id="result"
                label="Result"
                className={classes.input}
                value={result}
              />
              : null}
          </Grid>
        </Grid>
      </div>
      <Grid container>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Switch
                checked={periodSwitchChecked}
                onChange={handlePeriodSwitchChecked}
                name="periodSwitch"
              />
            }
            label="Show past history"
          />
        </Grid>
        {periodSwitchChecked
          ?
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={4}>
              <DatePicker
                label="From date"
                value={fromDate}
                onChange={handleFromDateChange}
                animateYearScrolling
              />
            </Grid>
            <Grid item xs={4}>
              <DatePicker
                label="To date"
                value={toDate}
                onChange={handleToDateChange}
                animateYearScrolling
              />
            </Grid>
          </MuiPickersUtilsProvider>
          : null
        }
      </Grid>
    </div >
  );
}

export default Home;