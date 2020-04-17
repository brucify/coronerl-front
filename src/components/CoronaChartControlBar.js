import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

export default (props) => {
    const [weekChecked,      setweekChecked]      = React.useState(props.isWeekView);
    const [logChecked,       setLogChecked]       = React.useState(props.isLogScaleView);
    const [perCapitaChecked, setPerCapitaChecked] = React.useState(props.isPerCapitaView);
    const [dayZeroChecked,   setDayZeroChecked]   = React.useState(props.isDayZeroView);

    let topButton;
    let bottomButton;
    let weekViewSwitch;
    let logSwitch;
    let dayZeroSwitch;
    let perCapitaSwitch;

    if (![ 'death_vs_pop_density'
         , 'confirmed_vs_pop_density'
         ].includes(props.chartType)) {
      let number = props.topAndBottomNum ? props.topAndBottomNum : 15;
      topButton =
        <div className="chart-button-right">
          <Button color="secondary" onClick={() => props.showTopTen(number)} >Top {number}</Button>
        </div>
      bottomButton =
        <div className="chart-button-right">
          <Button color="secondary" onClick={() => props.showBottomTen(number)} >Bottom {number}</Button>
        </div>
    }

    if ([ 'confirmed_daily'
        , 'death_daily'
        , 'recovered_daily'
        , 'net_daily'
        ].includes(props.chartType)) {
      weekViewSwitch =
        <div className="chart-button-right">
          <FormControlLabel
            checked={weekChecked}
            control={<Switch size="small" onChange={() => {setweekChecked(!weekChecked); props.toggleWeekView();}} />}
            label="Week"
          />
        </div>
    }

    if (true) {
      logSwitch =
        <div className="chart-button-right">
          <FormControlLabel
            className="chart-button-right-text"
            checked={logChecked}
            control={<Switch size="small" onChange={() => {setLogChecked(!logChecked); props.toggleLogScaleView();}} />}
            label="Log"
          />
        </div>
    }

    if (true) {
      perCapitaSwitch =
        <div className="chart-button-right">
          <FormControlLabel
            className="chart-button-right-text"
            checked={perCapitaChecked}
            control={<Switch size="small" onChange={() => {setPerCapitaChecked(!perCapitaChecked); props.togglePerCapitaView();}} />}
            label="Per 1M Capita"
          />
        </div>
    }

    if (![ 'death_vs_pop_density'
         , 'confirmed_vs_pop_density'
         ].includes(props.chartType)) {
      dayZeroSwitch =
        <div className="chart-button-right">
          <FormControlLabel
            className="chart-button-right-text"
            checked={dayZeroChecked}
            control={<Switch size="small" onChange={() => {setDayZeroChecked(!dayZeroChecked); props.toggleDayZeroView();}} />}
            label="Day 0"
          />
          <span className="chart-button-right-text">since</span>
          <TextField
            className="since-number"
            size="small"
            // variant="outlined"
            defaultValue={props.dayZaroNum}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => props.updateDayZeroView(e.target.value)}
          />
          <span className="chart-button-right-text">{sinceWord(props.chartType)}</span>
        </div>
    }

    return (
      <div className="chart-buttons-container">
        <div className="chart-buttons-container-left">
          <div className="chart-button-right">
            <Button color="secondary" onClick={() => props.showOrHide()} >Show / Hide All</Button>
          </div>
          {topButton}
          {bottomButton}
        </div>
        <div className="chart-buttons-container-right">
          {weekViewSwitch}
          {logSwitch}
          {perCapitaSwitch}
          {dayZeroSwitch}
        </div>
      </div>
    )
}

export const sinceWord = (chartType) => {
  switch (chartType) {
    case "death":           return "deaths";
    case "death_vs_pop_density": return "deaths";
    case "death_daily":     return "deaths a day";
    case "recovered":       return "recovered";
    case "recovered_daily": return "recovered a day";
    case "confirmed":       return "cases";
    case "confirmed_vs_pop_density": return "cases";
    case "confirmed_daily": return "cases a day";
    case "active":          return "cases";
    case "net_daily":       return "cases a day";
    default:                return "cases";
  }
}
