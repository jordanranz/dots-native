import React from 'react-native';
var {
  StyleSheet,
  PropTypes,
  View,
  Text,
  TouchableOpacity,
} = React;

const Icon = require('react-native-vector-icons/FontAwesome');

export default class ButtonNav extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity activeOpacity={0.6} style={[styles.button, styles.secondaryButton]}>
          <Icon name="arrow-left" size={26} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={[styles.button, styles.mainButton]}>
          <Icon name="list" size={40} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={[styles.button, styles.secondaryButton]}>
          <Icon name="arrow-right" size={26} color="white"/>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
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
    borderWidth: 3,
  },
  mainButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 15,
    marginLeft: 15,
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
