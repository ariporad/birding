import React, { Component } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ActionCreators from '../ducks/BirdingView';

import binoculars from '../img/binocularsWithLeafs.png';

const noop = () => {}

const styles = {
  size: {
    width: '1100px',
    height: '650px',
  },
  hide: {
    display: 'none',
  },
  binoculars: {
    maxWidth: '1500px',
    maxHeight: '750px',
  },
  bird: {
    position: 'relative',
    top: '-550px',
    left: '100px',
  },
  forest: {
  },
  container: {
  },
};

@connect(
    state => state.BirdingView,
    dispatch => bindActionCreators(ActionCreators, dispatch)
)
@Radium
export default class BirdingView extends Component {
  backToForest() {
    if (this._backToForestTimer) clearTimeout(this._backToForestTimer);
    this.props.hideBird();
    this.props.hideBinoculars();
  }

  imageClicked() {
    this.props.showBinoculars();
    if (Math.floor((Math.random() * 100) + 1) <= __ENV__.BIRD_ODDS) {
      // You found one!
      this.props.showBird();
    }
    this._backToForestTimer = setTimeout(() => this.backToForest(), 1000);
  }

  render() {
    return (
      <div style={[styles.container, styles.size]} onClick={this.props.binoculars ? ::this.backToForest : noop}>
        <img src={binoculars} style={[styles[this.props.binoculars ? 'binoculars' : 'hide'], styles.size]} />
        <img
          src={this.props.img}
          onClick={this.props.binoculars ? noop : ::this.imageClicked}
          style={[
            styles[this.props.bird ? 'bird': 'forest'],
            (this.props.binoculars && !this.props.bird) && styles.hide,
            this.props.bird || styles.size
           ]}
        />
      </div>
    );
  }
}

