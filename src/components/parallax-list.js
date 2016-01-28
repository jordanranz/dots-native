'use strict';

import React from "react-native";
import {connect} from 'react-redux/native';
import Parallax from 'react-native-parallax';
import {Actions} from 'react-native-router-flux'
import GiftedSpinner from 'react-native-gifted-spinner';

import ParallaxEventItem from './parallax-event-item'
import ButtonNav from './button-nav';

import mockEvents from '../lib/testData';

// Actions
import {getUpcomingEvents} from '../actions/events';

import {
  PURPLE_MARKER
} from '../lib/colors';

var {
  View,
  StyleSheet,
  ScrollView,
  Dimensions
} = React;

console.disableYellowBox = true;

var screen = Dimensions.get('window');

var ParallaxList = React.createClass({
  componentWillMount() {
    this.props.dispatch(getUpcomingEvents())
  },

  render: function() {
    if (this.props.isFetching) {
      return (
        <View style={styles.spinner}>
          <GiftedSpinner />
        </View>
      );
    }
    
    return (
      <Parallax.ScrollView style={styles.scrollView}>
        <ButtonNav 
          mainPress={Actions.map} 
          mainIcon={'map-marker'}
          leftPress={() => {return null}} 
          rightPress={() => {return null}} />
        {this.props.events.map(
          //mockEvents.map(
            (event, i) => <ParallaxEventItem key={i} event={event} width={screen.width} /> 
          )}
      </Parallax.ScrollView>
    );
  },
});

var styles = StyleSheet.create({
  scrollView: {
    paddingTop: 35,
    backgroundColor: PURPLE_MARKER
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PURPLE_MARKER,
  },
});

function mapStateToProps(state) {
  const { isFetching, events } = state.events;

  return {
    isFetching,
    events
  }
}

export default connect(mapStateToProps)(ParallaxList);