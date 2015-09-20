import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setImage } from '../ducks/BirdingView';

const birds = require.context('../img', false, /^\.\/bird[0-9]+\.(png|jpe?g)$/);

function randomItem(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

function randomBird() {
  return birds(randomItem(birds.keys()));
}

@connect(
  state => state.BirdingView
)
export default class BirdingView extends Component {
  imageClicked() {
    this.props.dispatch(setImage(randomBird()));
  }

  render() {
    return (
      <img src={this.props.img} onClick={::this.imageClicked} />
    );
  }
}

