import React from 'react-native';
import clamp from 'clamp';

import ParallaxEventItem from './parallax-event-item'

import mockEvents from '../lib/testData';

var {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBarIOS,
    View,
    TabBarIOS,
    TouchableOpacity,
    Dimensions,
    Animated,
    PanResponder
} = React;

import {
  PURPLE_MARKER,
} from '../lib/colors';

var screen = Dimensions.get('window');

const DEFAULT_WIDTH = screen.width - 20;
const SWIPE_THRESHOLD = 95;

export default class ItemSlider extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      //pan: new Animated.ValueXY(),
      panX: new Animated.Value(0),
      panY: new Animated.Value(0),
      isDocked: true,
    };

    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.panX.setOffset(this.state.panX._value);
        this.state.panX.setValue(0);
        this.state.panY.setOffset(this.state.panY._value);
        this.state.panY.setValue(0);
      },

      onPanResponderMove: (evt, gestureState) => {
        

        var dx2 = gestureState.dx * gestureState.dx;
        var dy2 = gestureState.dy * gestureState.dy;

        if (!this.direction) {
          this.direction = dx2 > dy2 ? 'x' : 'y';
        }
        
        if (this.direction == 'x') {
          this.state.panX.setValue(gestureState.dx);
        } else {
          this.state.panY.setValue(gestureState.dy);
        }
      },

      onPanResponderRelease: (e, gestureState) => {
        this.state.panX.flattenOffset();
        this.state.panY.flattenOffset();
        var velocityX;

        if (gestureState.vx >= 0) {
          velocityX = clamp(gestureState.vx, 3, 5);
        } else if (gestureState.vx < 0) {
          velocityX = clamp(gestureState.vx * -1, 3, 5) * -1;
        }

        if (this.direction == 'x' && Math.abs(this.state.panX._value) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.panX, {
            velocity: velocityX,
            deceleration: 0.99
          }).start(this._nextItem.bind(this))
        } else {
          Animated.spring(this.state.panX, {
            toValue: 0,
            friction: 7
          }).start()
        }

        if (this.direction == 'y') {
          if (Math.abs(gestureState.dy) > SWIPE_THRESHOLD) {
            if (this.state.isDocked) {
              Animated.spring(this.state.panY, {
                toValue: -345,
                friction: 7
              }).start();
              this.state.isDocked = false;
            } else {
              Animated.spring(this.state.panY, {
                toValue: 0,
                friction: 7
              }).start();
              this.state.isDocked = true;
            }
          } else {
            if (this.state.isDocked) {
              Animated.spring(this.state.panY, {
                toValue: 0,
                friction: 7
              }).start();
              this.state.isDocked = true;
            } else {
              Animated.spring(this.state.panY, {
                toValue: -345,
                friction: 7
              }).start();   
              this.state.isDocked = false;           
            }
          }
        }

        // if (this.direction == 'y' && Math.abs(this.state.panY._value + gestureState.dy) > SWIPE_THRESHOLD) {
          // Animated.spring(this.state.panY, {
          //   toValue: -345,
          //   friction: 7
          // }).start();
          // this.setState({isDocked: false});
        // } else {
          // Animated.spring(this.state.panY, {
          //   toValue: 0,
          //   friction: 7
          // }).start();
          // this.setState({isDocked: true});
        // }

        this.direction = null;
      }
    })
  }

  _nextItem() {
    this.state.panX.setValue(0);
    this.state.panY.setValue(0);
  }

  render() {
    let { panX, panY } = this.state;

    let opacity = panX.interpolate({inputRange: [-200, 0, 200], outputRange: [0.7, 1, 0.7]})
    //let width = panY.interpolate({inputRange: [-420, -150], outputRange: [screen.width - 10, screen.width - 30]})
    let scale = panY.interpolate({inputRange: [-345, -120], outputRange: [1.02, 1]})

    let animatedCardStyles = {transform: [{translateX: panX}, {translateY: panY}, {scale: scale}], opacity};
    return (
      
      <Animated.View
        style={[styles.item, animatedCardStyles]} {...this.panResponder.panHandlers}>
        <ParallaxEventItem event={mockEvents[0]} width={DEFAULT_WIDTH - 10}/>
      </Animated.View>
      
    );
  }
}

var styles = StyleSheet.create({
  item: {
    width: DEFAULT_WIDTH,
    height: 450,
    backgroundColor: PURPLE_MARKER,
    borderRadius: 3,
    marginBottom: -330,
    overflow: 'hidden',
    padding: 5
  }
});