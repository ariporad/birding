import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import { showBird, hideBird } from '../ducks/BirdingView';

import binoculars from '../img/binocularsWithLeafs.png';

const styles = {
  binoculars: {
    hide: {
      display: 'none',
    },
    show: {
      maxWidth: '1500px',
      maxHeight: '750px',
    }
  },
  bird: {
    position: 'relative',
    top: '-550px',
    left: '100px',
  },
  forest: {

  },
  container: {
    width: '1500px',
    height: '750px',
  },
};

@connect(
    state => state.BirdingView
)
@Radium
export default class BirdingView extends Component {
  imageClicked() {
    this.props.dispatch(showBird());
    setTimeout(() => this.props.dispatch(hideBird()), 1000);
  }

  render() {
    return (
      <div style={styles.container}>
        <img src={binoculars} style={styles.binoculars[this.props.bird ? 'show' : 'hide']} />
        <img src={this.props.img} onClick={::this.imageClicked} style={styles[this.props.bird ? 'bird': 'forest']}/>
      </div>
    );
  }
}

