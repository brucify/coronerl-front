import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

export default (props) => {
    const [logChecked, setLogChecked] = React.useState(props.isLogScaleView);
    let weekViewSwitch;
    let topSwitch;
    let bottomSwitch;
    let dayZeroSwitch;
    let perCapitaSwitch;

    if ([ 'confirmed_daily'
        , 'death_daily'
        , 'recovered_daily'
        , 'net_daily'
        ].includes(props.chartType)) {
      weekViewSwitch =
        <div className="chart-button-right">
          <FormControlLabel
            checked={props.isWeekView}
            control={<Switch size="small" onChange={() => props.toggleWeekView()} />}
            label="Week"
          />
        </div>
    }

    if (![ 'death_vs_pop_density'
         , 'confirmed_vs_pop_density'
         ].includes(props.chartType)) {
      let number = props.topAndBottomNum ? props.topAndBottomNum : 15;
      topSwitch =
        <div className="chart-button-right">
          <Button color="secondary" onClick={() => props.showTopTen(number)} >Top {number}</Button>
        </div>
      bottomSwitch =
        <div className="chart-button-right">
          <Button color="secondary" onClick={() => props.showBottomTen(number)} >Bottom {number}</Button>
        </div>
    }

    if (![ 'death_vs_pop_density'
         , 'confirmed_vs_pop_density'
         ].includes(props.chartType)) {
      dayZeroSwitch =
        <div className="chart-button-right">
          <FormControlLabel
            className="chart-button-right-text"
            control={<Switch size="small" onChange={() => props.toggleDayZeroView()} />}
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

    if (true) {
      perCapitaSwitch =
        <div className="chart-button-right">
          <FormControlLabel
            className="chart-button-right-text"
            control={<Switch size="small" onChange={() => props.togglePerCapitaView()} />}
            label="Per 1M Capita"
          />
        </div>
    }

    return (
      <div className="chart-buttons-container">
        <div className="chart-buttons-container-left">
          <div className="chart-button-right">
            <Button color="secondary" onClick={() => props.showOrHide()} >Show / Hide All</Button>
          </div>
          {topSwitch}
          {bottomSwitch}
        </div>
        <div className="chart-buttons-container-right">
          {weekViewSwitch}
          <div className="chart-button-right">
            <FormControlLabel
              className="chart-button-right-text"
              checked={logChecked}
              control={<Switch size="small" onChange={() => {setLogChecked(!logChecked); props.toggleLogScaleView();}} />}
              label="Log"
            />
          </div>
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
