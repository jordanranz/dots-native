'use strict';

import React from 'react-native';
import {connect} from 'react-redux/native';
import MapView from 'react-native-maps';
import ButtonNav from './button-nav';
import DotMarker from './dot-marker';
import ParallaxEventItem from './parallax-event-item'
import GiftedSpinner from 'react-native-gifted-spinner';

import {getTodayEvents} from '../actions/events';
import mockDayEvents from '../lib/testDataDay';

import {
  PURPLE,
  PURPLE_MARKER,
  PURPLE_MARKER_BORDER,
} from '../lib/colors';

var {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBarIOS,
    View,
    TabBarIOS,
    TouchableOpacity,
    Dimensions
} = React;

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE =  47.618893;
const LONGITUDE = -122.335768;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var DotsMap = React.createClass({

  getInitialState() {
    return {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      selected: null
    }
  },

  componentWillMount() {
    //this.setState({annotations: this.getAnnotations(mockDayEvents)});
    this.props.dispatch(getTodayEvents())
  },

  /* Mapbox methods */
  onRegionChange(region) {
    this.setState({ region });
  },

  onMarkerSelect(marker) {
    console.log(marker.nativeEvent);
  },

  render() {
      //var annotations = this.getAnnotations(this.props.events);
      if (this.props.isFetching) {
        return (
          <View style={styles.container}>
            <GiftedSpinner />
          </View>
        );
      }

      return (
          <View style={styles.container}>
            <MapView
              style={styles.map}
              region={this.state.region}
              onRegionChange={this.onRegionChange}
            >
              {this.props.events.map(event => (
                <MapView.Marker
                  key={event.id}
                  coordinate={
                    {
                      latitude: event.place.location.latitude,
                      longitude: event.place.location.longitude
                    }
                  }
                  onSelect={this.onMarkerSelect}
                >
                  <DotMarker
                    costLevel={1}
                    selected={true}
                    color={{
                      fill: PURPLE_MARKER, 
                      border: PURPLE_MARKER_BORDER
                    }}
                  />
                </MapView.Marker>
              ))}
            </MapView>
            <ButtonNav />
            <ParallaxEventItem event={this.props.events[0]}/>
          </View>
      );
      
  },

});

var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
});

function mapStateToProps(state) {
  const { isFetching, events } = state.events;

  return {
    isFetching,
    events
  }
}

export default connect(mapStateToProps)(DotsMap);