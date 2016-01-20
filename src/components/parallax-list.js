/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

// Libraries
import React from "react-native";
import {connect} from 'react-redux/native';
import moment from 'moment';
// Components
import Parallax from 'react-native-parallax';
// Actions
import {getUpcomingEvents} from '../actions/events';
// Test Event Data
import mockEvents from '../lib/testData';


var {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  PixelRatio,
  Image,
  TouchableHighlight,
} = React;


var IMAGE_WIDTH = Dimensions.get('window').width;
var IMAGE_HEIGHT = Dimensions.get('window').height / 5.7;
var PIXEL_RATIO = PixelRatio.get();
var PARALLAX_FACTOR = 0.3;

console.disableYellowBox = true;

var ParallaxList = React.createClass({
  getInitialState() {
    return { overlayBackground: 'rgba(0,0,0,0.6)' }
  },

  componentWillMount() {
    //this.props.dispatch(getUpcomingEvents())
  },

  _onPressButton() {
    console.log('Event list item pressed');
  },

  render: function() {
    return (
      <Parallax.ScrollView style={styles.scrollView}>
        {//this.props.events.map(function(event, i) {
        mockEvents.map(function(event, i) {
          var event_time = new Date(event.start_time);
          return (
            <TouchableHighlight>
              <Parallax.Image
                key={i}
                style={styles.image}
                overlayStyle={[styles.overlay, {backgroundColor: this.state.overlayBackground}]}
                source={{ uri: event.image_uri }}
                parallaxFactor={PARALLAX_FACTOR}
              >
                <View style={styles.dateContainer}>
                  <Text style={styles.dateDay}>
                    {moment(event_time).format('ddd')}
                  </Text>
                  <Text style={styles.date}>
                    {moment(event_time).format('M') + "." + moment(event_time).format('D')}
                  </Text>
                </View>

                <View style={styles.contentContainer}>
                  <Text style={styles.detail}>
                    {event.place.name}
                  </Text>
                  <Text style={styles.name} numberOfLines={1}>
                    {event.name}
                  </Text>
                  <Text style={styles.detail}>
                    {event.price ? event.price : 'Free'}
                  </Text>
                  <Text style={styles.detail}>
                    {event.age_restriction}
                  </Text>
                </View>
              </Parallax.Image>
            </TouchableHighlight>
          );
        }.bind(this))}
      </Parallax.ScrollView>
    );
  },
});

var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#48DF6E"
  },
  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH
  },
  overlay: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#564CCD',
    padding: 15,
  },
  dateContainer: {
    backgroundColor: 'rgba(55,55,200,0.0)',
    width: IMAGE_HEIGHT - 30,
    height: IMAGE_HEIGHT - 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: IMAGE_HEIGHT,
    borderColor: 'white',
    borderWidth: 2,
    marginRight: 20
  },
  dateDay: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Open Sans',
    fontWeight: '400'
  },
  date: {
    fontSize: 32,
    color: 'white',
    lineHeight: 34,
    fontFamily: 'Open Sans',
    fontWeight: '300'
  },
  contentContainer: {
    backgroundColor: 'rgba(72,223,110,0.0)',
    height: IMAGE_HEIGHT,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'white',
    fontFamily: 'Open Sans',
    fontWeight: '600'
  },
  detail: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Open Sans',
    fontWeight: '300'
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