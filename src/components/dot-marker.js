import React from 'react-native';
var {
  StyleSheet,
  PropTypes,
  View,
  Text,
  Animated,
} = React;

const Icon = require('react-native-vector-icons/FontAwesome');

export default class DotMarker extends React.Component {
  static propTypes = {
    costLevel: React.PropTypes.number,
    //selected: React.PropTypes.boolean,
    color: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {costLevel, selected, color} = this.props;

    var cost = [];
    for (var i=0; i < costLevel; i++) {
      cost.push(<Icon name="usd" size={11} color="white"/>);
    }
    return (
      <View style={[
        styles.markerContainer,
        {backgroundColor: color.fill, borderColor: color.border}
      ]}>
        {cost}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  markerContainer: {
    width:26,
    height:26,
    borderRadius: 13,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }
});
