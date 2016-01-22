'use strict';

import React from 'react-native';
import {connect} from 'react-redux/native';
import Mapbox from 'react-native-mapbox-gl';

import {getTodayEvents} from '../actions/events';
import mockDayEvents from '../lib/testDataDay';

const Icon = require('react-native-vector-icons/FontAwesome');

const mapRef = 'mapRef';
var {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBarIOS,
    View,
    TabBarIOS,
    TouchableOpacity
} = React;

var DotsMapbox = React.createClass({
    //mixins: [Mapbox.Mixin],

    getInitialState() {
        return {
            center: {
                latitude: 47.60621,
                longitude: -122.332071
            },
            zoom: 12.5,
            annotations: []
        }
    },

    componentWillMount() {
      //this.setState({annotations: this.getAnnotations(mockDayEvents)});
      this.props.dispatch(getTodayEvents())
    },

    /* Mapbox methods */

    onRegionChange(location) {
        this.setState({ currentZoom: location.zoom });
    },

    onRegionWillChange(location) {
        console.log(location);
    },

    onUpdateUserLocation(location) {
        console.log(location);
    },

    onOpenAnnotation(annotation) {
        this.setState({
          center: {
            latitude: annotation.latitude, 
            longitude: annotation.longitude
          }
        });
    },

    onRightAnnotationTapped(e) {
        console.log(e);
    },

    /* Custom methods */

    getAnnotations(events) {
      return events.map(function(event) {
        return {
          coordinates: [event.place.location.latitude, event.place.location.longitude],
          'type': 'point',
          title: event.name,
          subtitle: '',
          annotationImage: {
              url: 'https://s3-us-west-2.amazonaws.com/pop-dot/dot_purple.png',
              height: 30,
              width: 30
          },
          id: event.id.toString(),    
        };
      });
    },

    render() {
        var annotations = this.getAnnotations(this.props.events);
        /*
        return (
            <View style={styles.container}>
                <Mapbox
                    style={styles.map}
                    direction={0}
                    rotateEnabled={true}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    showsUserLocation={true}
                    ref={mapRef}
                    accessToken={'pk.eyJ1Ijoiam9yZGFucmFueiIsImEiOiJjaWgxbmhiaGIweDhiNG1tM3U3aXo5ZWpqIn0.1w-JojM1g7gULggAjidcVA'}
                    styleURL={this.mapStyles.streets}
                    centerCoordinate={this.state.center}
                    zoomLevel={this.state.zoom}
                    onRegionChange={this.onRegionChange}
                    onRegionWillChange={this.onRegionWillChange}
                    annotations={annotations}
                    onOpenAnnotation={this.onOpenAnnotation}
                    onRightAnnotationTapped={this.onRightAnnotationTapped}
                    onUpdateUserLocation={this.onUpdateUserLocation}
                    showsUserLocation={true}
                    annotationCanShowCallout={false}>
                </Mapbox>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity activeOpacity={0.8} style={[styles.button, styles.secondaryButton]}>
                    <Icon name="rocket" size={20} color="white"/>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={[styles.button, styles.mainButton]}>
                    <Icon name="list" size={40} color="white"/>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={[styles.button, styles.secondaryButton]}>
                    <Icon name="rocket" size={20} color="white"/>
                  </TouchableOpacity>
                </View>
            </View>
        );
        */
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
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      flexDirection: 'row'
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderColor: 'rgba(86, 76, 205, 0.7)',
      borderWidth: 5,
      margin: 10
    },
    mainButton: {
      width: 90,
      height: 90,
      borderRadius: 45,
    },
    secondaryButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttonText: {
      color: 'white',
      fontFamily: 'Open Sans',
      fontSize: 18,
    }
});

function mapStateToProps(state) {
  const { isFetching, events } = state.events;

  return {
    isFetching,
    events
  }
}

export default connect(mapStateToProps)(DotsMapbox);