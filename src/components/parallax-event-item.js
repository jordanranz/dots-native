import React from 'react-native';
import moment from 'moment';
import Parallax from 'react-native-parallax';

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

export default class ParallaxEventItem extends React.Component {
  static propTypes = {
    event: React.PropTypes.object
  };

  render() {
    var event_time = null;
    if (this.props.event.start_time) {
      event_time = new Date(this.props.event.start_time);
    }
    
    return (
      <TouchableHighlight>
        <Parallax.Image
          style={styles.image}
          overlayStyle={styles.overlay}
          source={{ uri: this.props.event.image_uri }}
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
              {this.props.event.place.name}
            </Text>
            <Text style={styles.name} numberOfLines={1}>
              {this.props.event.name}
            </Text>
            <Text style={styles.detail}>
              {this.props.event.price ? this.props.event.price : 'Free'}
            </Text>
            <Text style={styles.detail}>
              {this.props.event.age_restriction}
            </Text>
          </View>
        </Parallax.Image>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH
  },
  overlay: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderTopWidth: 2,
    borderTopColor: '#564CCD',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.6)'
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

