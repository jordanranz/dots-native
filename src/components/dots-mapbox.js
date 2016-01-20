'use strict';

import React from 'react-native';
import Mapbox from 'react-native-mapbox-gl';

import mockDayEvents from '../lib/testDataDay';

const mapRef = 'mapRef';
var {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBarIOS,
    View,
    TabBarIOS,
} = React;

var DotsMapbox = React.createClass({
    mixins: [Mapbox.Mixin],

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
      console.log(mockDayEvents);
      this.setState({annotations: this.getAnnotations(mockDayEvents)});
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
        var titleText = annotation.id
        var color = null;
        switch(titleText){
            case "Foundation Nightclub":
                color = "#867FDB";
                break;
            case "Q Nightclub":
                color = "#509FEB";
                break;
            case "Kremwerk":
                color = "#48DF6E";
                break;
        }
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
                    annotations={this.state.annotations}
                    onOpenAnnotation={this.onOpenAnnotation}
                    onRightAnnotationTapped={this.onRightAnnotationTapped}
                    onUpdateUserLocation={this.onUpdateUserLocation}
                    showsUserLocation={true}
                    annotationCanShowCallout={false}>
                </Mapbox>
            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,    
    },
});

export default DotsMapbox;