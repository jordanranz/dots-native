'use strict';

import React from 'react-native';
import {connect} from 'react-redux/native';
import MapView from 'react-native-maps';
import GiftedSpinner from 'react-native-gifted-spinner';
import {Actions} from 'react-native-router-flux'

import ButtonNav from './button-nav';
import DotMarker from './dot-marker';
import ItemSlider from './item-slider';

import {getTodayEvents} from '../actions/events';
import mockDayEvents from '../lib/testDataDay';

import {
  PURPLE_MARKER
} from '../lib/colors';

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
} = React;

var screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE =  47.618893;
const LONGITUDE = -122.335768;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class DotsMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      selected: false,
    }
  }

  componentWillMount() {
    //this.setState({annotations: this.getAnnotations(mockDayEvents)});
    this.props.dispatch(getTodayEvents());
  }

  componentDidMount() {

  }

  /* Map methods */
  onRegionChange(region) {

  }

  onMarkerSelect(marker) {
    
  }

  render() {
    if (this.props.isFetching) {
      return (
        <View style={styles.spinner}>
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
          {this.props.events.map((event) => {
            var costLevel = Math.floor(Math.random() * 3) + 1;
            return (
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
                  costLevel={costLevel}
                  selected={true}
                />
              </MapView.Marker>
            );
          })}
        </MapView>
        <ButtonNav 
          mainPress={Actions.list} 
          mainIcon={'list'} 
          leftPress={() => {return null}} 
          rightPress={() => {return null}} />
        <ItemSlider />
      </View>
    );
      
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 35,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PURPLE_MARKER,
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