import React, { Component } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ActionCreators from '../ducks/BirdingView';

import binoculars from '../img/binocularsWithLeafs.png';
import forest from '../img/forest.jpg';

const noop = () => {};

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
    this.props.bird && this.props.hideBird();
    this.props.binoculars && this.props.hideBinoculars();
  }

  imageClicked() {
    this.props.showBinoculars();
    if (Math.floor((Math.random() * 100) + 1) <= (__ENV__.BIRD_ODDS || 50)) {
      // You found one!
      this.props.showBird();
    }
    this._backToForestTimer = setTimeout(() => this.backToForest(), __ENV__.LOOK_TIME || 2000);
  }

  render() {
    return (
      <div style={[styles.container, styles.size]} onClick={this.props.binoculars ? ::this.backToForest : noop}>
        <img
          src={forest}
          onClick={::this.imageClicked}
          style={[
            styles.forest,
            styles.size,
            this.props.binoculars && styles.hide,
           ]}
        />
        <img src={binoculars} style={[styles[this.props.binoculars ? 'binoculars' : 'hide'], styles.size]} />
        <img src={this.props.bird} style={[styles.bird, this.props.bird || styles.hide]} />
      </div>
    );
  }
}

