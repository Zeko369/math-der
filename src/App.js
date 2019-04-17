import React, { Component } from 'react';
import './App.css';

import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import Tree from './Tree.js'

const styles = {
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 0px',
  },
};

class Application extends Component {
  constructor(props){
    super(props);
    this.state = {
      height: 4,
      radius: 3,
      volume: this.volume(4, 3),
      area: this.area(4, 3),
      material: 100,
      v_locked: false,
      a_locked: false,
      highest: 0
    };
  }

  randomize = () => {
    const r = Math.random() * 9;
    const h = Math.random() * 9;
    if(this.state.a_locked){
      this.handleChangeR(undefined, r)
    } else if(this.state.v_locked){
      this.handleChangeR(undefined, r)
    } else {
      this.setState({
        radius: r,
        height: h,
        area: this.area(r, h),
        volume: this.volume(r, h)
      })
    }
  }

  area = (r, h) => {
    return 2 * Math.pow(r, 2) * Math.PI + 2 * Math.PI * r * h
  }

  volume = (r, h) => {
    return Math.pow(r, 2) * Math.PI * h
  }

  lock = (event) => {
    const id = event.target.id;
    const value = event.target.checked;
    console.log(value)
    this.setState((curr) => {
      return {
        v_locked: id == 'v' ? value : false,
        a_locked: id == 'a' ? value : false
      }
    })
  }

  handleChangeR = (event, radius) => {
    let data = {radius: radius};
    if(this.state.v_locked){
      const new_h = this.state.volume / (Math.PI * radius * radius)
      data['height'] = new_h
      data['area'] = this.area(radius, new_h);
    } else if(this.state.a_locked) {
      const new_h = this.state.area / (2 * Math.PI * radius)
      data['height'] = new_h
      data['volume'] = this.volume(radius, new_h);
    } else {
      data['volume'] = this.volume(radius, this.state.height);
      data['area'] = this.area(radius, this.state.height);
    }

    this.setState(data);
  };

  handleChangeH = (event, height) => {
    let data = {height: height};
    if(this.state.v_locked){
      const new_r = Math.sqrt(this.state.volume / (Math.PI * height))
      data['radius'] = new_r
      data['area'] = this.area(new_r, height);
    } else if(this.state.a_locked) {
      const new_r = this.state.area / (2 * Math.PI * height)
      data['radius'] = new_r
      data['volume'] = this.volume(new_r, height);
    } else {
      data['volume'] = this.volume(this.state.radius, height);
      data['area'] = this.area(this.state.radius, height);
    }

    this.setState(data);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="container">
        <div className={`${classes.root} sliders`}>
          <Typography id="label1">Radius</Typography>
          <Slider
            classes={{ container: classes.slider }}
            value={this.state.radius}
            min={1}
            max={9}
            aria-labelledby="label1"
            onChange={this.handleChangeR}
          />
          <Typography id="label2">Height</Typography>
          <Slider
            classes={{ container: classes.slider }}
            value={this.state.height}
            min={1}
            max={9}
            aria-labelledby="label2"
            onChange={this.handleChangeH}
          />
          <button onClick={this.randomize}>Random</button>
        </div>
        <div className="values">
          <input type="checkbox" id="v" checked={this.state.v_locked} onChange={this.lock}/>
          Volume: { Math.round(this.state.volume * 100) / 100 }
          { this.state.v_locked ? '  Volume is locked' : '' }
          <br/>
          <input type="checkbox" id="a" checked={this.state.a_locked} onChange={this.lock}/>
          Area: { Math.round(this.state.area * 100) / 100 }
          { this.state.a_locked ? '  Area is locked' : '' }
          <br/>
          Highest: { Math.round(this.state.highest * 100) / 100 }
        </div>

        <div className="asd">
          <br/>
          <Tree radius={this.state.radius} height={this.state.height}/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Application);
