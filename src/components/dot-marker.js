import React from 'react-native';
var {
  StyleSheet,
  PropTypes,
  View,
  Text,
  Animated,
  TouchableOpacity
} = React;

import {
  GREEN_MARKER,
  GREEN_MARKER_BORDER,
  BLUE_MARKER,
  BLUE_MARKER_BORDER,
  PURPLE_MARKER,
  PURPLE_MARKER_BORDER,
} from '../lib/colors';

const markerColor = {
  1: {
    fill: GREEN_MARKER, 
    border: GREEN_MARKER_BORDER
  }, 
  2: {
    fill: BLUE_MARKER, 
    border: BLUE_MARKER_BORDER
  }, 
  3: {
    fill: PURPLE_MARKER, 
    border: PURPLE_MARKER_BORDER
  },
};

const Icon = require('react-native-vector-icons/FontAwesome');

const DEFAULT_WIDTH = 30;
const DEFAULT_HEIGHT = 30;



export default class DotMarker extends React.Component {
  static propTypes = {
    costLevel: React.PropTypes.number,
    //selected: React.PropTypes.boolean,
  };

  constructor(props) {
    super(props);

    this.state = {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      borderRadius: DEFAULT_WIDTH / 2,
      opacity: 0.8,
      bounceValue: new Animated.Value(1),
    }
  }

  _onPressIn() {
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 1.2,
        friction: 6,
      }
    ).start();
    this.setState({opacity: 1});
  }

  _onPressOut() {
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 1,
        friction: 6,
      }
    ).start();
    this.setState({opacity: 0.8});
  }

  render() {
    const {costLevel, selected} = this.props;

    var cost = [];
    for (var i=0; i < costLevel; i++) {
      cost.push(<Icon key={i} name="usd" size={11} color="white"/>);
    }
    return (
      <TouchableOpacity
        onPressIn={this._onPressIn.bind(this)}
        onPressOut={this._onPressOut.bind(this)}
        activeOpacity={1}
      >
        <Animated.View style={[
          styles.markerContainer,
          {
            backgroundColor: markerColor[costLevel].fill, 
            borderColor: markerColor[costLevel].border, 
            width: this.state.width, 
            height: this.state.height,
            borderRadius: this.state.borderRadius,
            opacity: this.state.opacity,
            transform: [
              {scale: this.state.bounceValue},
            ]
          }
        ]} >
          {cost}
        </Animated.View>
    </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  markerContainer: {
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }
});
