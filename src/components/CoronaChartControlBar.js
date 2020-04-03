import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';


class CoronaChartControlBar extends React.Component {

  render() {
    let weekViewSwitch;
    if ([ 'confirmed_daily'
        , 'death_daily'
        , 'recovered_daily'
        , 'net_daily'
        ].includes(this.props.chartType)) {
      weekViewSwitch =
        <div className="chart-button-right">
          <FormControlLabel
            checked={this.props.isWeekView}
            control={<Switch size="small" onChange={() => this.props.toggleWeekView(this.props.chartType)} />}
            label="Week"
          />
        </div>
    }

    return (
      <div className="chart-buttons-container">
        <div className="chart-buttons-container-left">
          <div className="chart-button-left">
            <Button color="secondary" onClick={() => this.props.showOrHide()} >Show / Hide All</Button>
          </div>
        </div>
        <div className="chart-buttons-container-right">
          {weekViewSwitch}
          <div className="chart-button-right">
            <FormControlLabel
              className="chart-button-right-text"
              control={<Switch size="small" onChange={() => this.props.toggleLogScaleView(this.props.chartType)} />}
              label="Log"
            />
          </div>
          <div className="chart-button-right">
            <FormControlLabel
              className="chart-button-right-text"
              control={<Switch size="small" onChange={() => this.props.togglePerCapitaView(this.props.chartType)} />}
              label="Per 1M Capita"
            />
          </div>
          <div className="chart-button-right">
            <FormControlLabel
              className="chart-button-right-text"
              control={<Switch size="small" onChange={() => this.props.toggleDayZeroView(this.props.chartType)} />}
              label="Day 0"
            />
            <span className="chart-button-right-text">since</span>
            <TextField
              className="since-number"
              size="small"
              // variant="outlined"
              defaultValue={this.props.dayZaroNum}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => this.props.updateDayZeroView(this.props.chartType, e.target.value)}
            />
            <span className="chart-button-right-text">{this.props.sinceWord(this.props.chartType)}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default CoronaChartControlBar;
