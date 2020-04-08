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
            control={<Switch size="small" onChange={() => props.toggleWeekView(props.chartType)} />}
            label="Week"
          />
        </div>
    }
    return (
      <div className="chart-buttons-container">
        <div className="chart-buttons-container-left">
          <div className="chart-button-right">
            <Button color="secondary" onClick={() => props.showOrHide()} >Show / Hide All</Button>
          </div>
          <div className="chart-button-right">
            <Button color="secondary" onClick={() => props.showTopTen(15)} >Top 15</Button>
          </div>
          <div className="chart-button-right">
            <Button color="secondary" onClick={() => props.showBottomTen(15)} >Bottom 15</Button>
          </div>
        </div>
        <div className="chart-buttons-container-right">
          {weekViewSwitch}
          <div className="chart-button-right">
            <FormControlLabel
              className="chart-button-right-text"
              control={<Switch size="small" onChange={() => props.toggleLogScaleView(props.chartType)} />}
              label="Log"
            />
          </div>
          <div className="chart-button-right">
            <FormControlLabel
              className="chart-button-right-text"
              control={<Switch size="small" onChange={() => props.togglePerCapitaView(props.chartType)} />}
              label="Per 1M Capita"
            />
          </div>
          <div className="chart-button-right">
            <FormControlLabel
              className="chart-button-right-text"
              control={<Switch size="small" onChange={() => props.toggleDayZeroView(props.chartType)} />}
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
              onChange={(e) => props.updateDayZeroView(props.chartType, e.target.value)}
            />
            <span className="chart-button-right-text">{props.sinceWord(props.chartType)}</span>
          </div>
        </div>
      </div>
    )

}
