import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setImage } from '../ducks/BirdingView';

import bird1 from '../img/bird1.png';

@connect(
  state => state.BirdingView
)
export default class BirdingView extends Component {
  imageClicked() {
    this.props.dispatch(setImage(bird1));
  }

  render() {
    return (
      <img src={this.props.img} onClick={::this.imageClicked} />
    );
  }
}
