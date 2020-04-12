import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

export default (props) => {
    let weekViewSwitch;
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
    let number = props.topAndBottomNum ? props.topAndBottomNum : 15;
    return (
      <div className="chart-buttons-container">
        <div className="chart-buttons-container-left">
          <div className="chart-button-right">
            <Button color="secondary" onClick={() => props.showOrHide()} >Show / Hide All</Button>
          </div>
          <div className="chart-button-right">
            <Button color="secondary" onClick={() => props.showTopTen(number)} >Top {number}</Button>
          </div>
          <div className="chart-button-right">
            <Button color="secondary" onClick={() => props.showBottomTen(number)} >Bottom {number}</Button>
          </div>
        </div>
        <div className="chart-buttons-container-right">
          {weekViewSwitch}
          <div className="chart-button-right">
            <FormControlLabel
              className="chart-button-right-text"
              control={<Switch size="small" onChange={() => props.toggleLogScaleView()} />}
              label="Log"
            />
          </div>
          <div className="chart-button-right">
            <FormControlLabel
              className="chart-button-right-text"
              control={<Switch size="small" onChange={() => props.togglePerCapitaView()} />}
              label="Per 1M Capita"
            />
          </div>
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
            <span className="chart-button-right-text">{props.sinceWord()}</span>
          </div>
        </div>
      </div>
    )

}
