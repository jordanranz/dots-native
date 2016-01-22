/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

// Libraries
import React from "react-native";
import {connect} from 'react-redux/native';
// Components
import Parallax from 'react-native-parallax';
import ParallaxEventItem from './parallax-event-item'
// Actions
import {getUpcomingEvents} from '../actions/events';
// Test Event Data
import mockEvents from '../lib/testData';


var {
  StyleSheet,
  ScrollView
} = React;

console.disableYellowBox = true;

var ParallaxList = React.createClass({
  componentWillMount() {
    this.props.dispatch(getUpcomingEvents())
  },

  render: function() {
    return (
      <Parallax.ScrollView style={styles.scrollView}>
        {this.props.events.map(
          //mockEvents.map(
            (event, i) => <ParallaxEventItem key={i} event={event}/> 
          )}
      </Parallax.ScrollView>
    );
  },
});

var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#48DF6E"
  }
});

function mapStateToProps(state) {
  const { isFetching, events } = state.events;

  return {
    isFetching,
    events
  }
}

export default connect(mapStateToProps)(ParallaxList);