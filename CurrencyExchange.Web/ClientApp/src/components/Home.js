import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/AutoComplete';
import Paper from '@material-ui/core/Paper';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import './Home.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "5%"
  },
  input: {
    textAlign: "center",
    width: "75%",
    marginLeft: "20%"
  },
  slider: {
    marginTop: 8
  },
  label: {
    textAlign: "left",
    marginLeft: "20%",
    marginBottom: "5%",
    color: "red"
  },
  btn: {
    top: "25%",
    left: "25%",
    marginBottom: "1%"
  },
  paper: {
    marginTop: "2%",
    borderRadius: 16
  },
  chart: {
    marginLeft: "25%"
  },
  result: {
    marginTop: "1%",
    left: "40%"
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
  const [historicalResult, setHistoricalResult] = useState([]);
  const [showHistoricalResult, setShowHistoricalResult] = useState(false);
  const [shouldShowHelperText, setShouldShowHelperText] = useState(false);
  const [periodSwitchChecked, setPeriodSwitchChecked] = useState(false);
  const [fromDate, setFromDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    axios.get('https://localhost:44306/api/Currency/GetCurrencies')
      .then((response) => {
        setCurrencies(response.data);
      });
  }, currencies);

  const handleAmmountChange = (event) => {
    if (event.target.value < 0) {
      setAmmount(0);

      return;
    }

    setAmmount(event.target.value);
  }

  const handlePeriodSwitchChecked = (event) => {
    setPeriodSwitchChecked(!periodSwitchChecked);
  }

  const handleFromDateChange = (date) => {
    setFromDate(format(date, 'yyyy-MM-dd'));

    if (checkIfEmptyFields()) {
      return;
    }

    axios.get(`https://localhost:44306/api/Currency/GetRatesByDate?baseCurrency=${baseCurrency}&targetCurrency=${targetCurrency}&from=${fromDate}&to=${toDate}`)
      .then((response) => {
        setHistoricalResult([]);
        setHistoricalResult(response.data);
        setShowHistoricalResult(true);
      });
  }

  const handleToDateChange = (date) => {
    setToDate(format(date, 'yyyy-MM-dd'));

    if (checkIfEmptyFields()) {
      return;
    }

    axios.get(`https://localhost:44306/api/Currency/GetRatesByDate?baseCurrency=${baseCurrency}&targetCurrency=${targetCurrency}&from=${fromDate}&to=${toDate}`)
      .then((response) => {
        setHistoricalResult([]);
        setHistoricalResult(response.data);
        setShowHistoricalResult(true);
      });
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

        if (periodSwitchChecked) {
          axios.get(`https://localhost:44306/api/Currency/GetRatesByDate?baseCurrency=${baseCurrency}&targetCurrency=${targetCurrency}&from=${fromDate}&to=${toDate}`)
            .then((response) => {
              setHistoricalResult([]);
              setHistoricalResult(response.data);
              setShowHistoricalResult(true);
            });
        }
      });
  }

  const checkIfEmptyFields = () => {
    if (baseCurrency === "" || targetCurrency === "" || ammount === 0 || ammount === '') {
      return true;
    }

    return false;
  }

  return (
    <div className={classes.root}>
      <div>
        <Paper variant="outlined" className={classes.paper}>
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
                ? <FormHelperText className={classes.label}>Base currency is required</FormHelperText>
                : null}
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="ammount"
                label="Ammount"
                className={classes.input}
                required={true}
                value={ammount}
                onChange={handleAmmountChange}
              />
              {(ammount <= 0 || ammount === "") && shouldShowHelperText
                ? <FormHelperText className={classes.label}>Ammount is required</FormHelperText>
                : null
              }
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
                ? <FormHelperText className={classes.label}>Target currency is required</FormHelperText>
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
            <Grid item xs={12}>
              {showResult
                ? <TextField
                  id="result"
                  label="Result"
                  className={classes.input, classes.result}
                  value={result}
                />
                : null}
            </Grid>
          </Grid>
        </Paper>
      </div>
      <div>
        <Paper variant="outlined" className={classes.paper}>
          <Grid container>
            <Grid item xs={4}>
              <FormControlLabel
                className={classes.input}
                control={
                  <Switch
                    checked={periodSwitchChecked}
                    onChange={handlePeriodSwitchChecked}
                    name="periodSwitch"
                    color="primary"
                    className={classes.slider}
                  />
                }
                label="Show past history"
              />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={4}>
                <DatePicker
                  disabled={!periodSwitchChecked}
                  label="From date"
                  format="dd/MM/yyyy"
                  value={fromDate}
                  onChange={handleFromDateChange}
                  animateYearScrolling
                  className={classes.input}
                />
              </Grid>
              <Grid item xs={4}>
                <DatePicker
                  disabled={!periodSwitchChecked}
                  label="To date"
                  format="dd/MM/yyyy"
                  value={toDate}
                  onChange={handleToDateChange}
                  animateYearScrolling
                  className={classes.input}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
        </Paper>
      </div>
      <div>
        {showHistoricalResult
          ? <Paper variant="outlined" className={classes.paper}>
            <Grid container className={classes.chart}>
              <Chart data={historicalResult} />
            </Grid>
          </Paper>
          : null}
      </div>
    </div >
  );
}

export default Home;