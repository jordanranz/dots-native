'use strict';

import React from 'react-native';
const Icon = require('react-native-vector-icons/FontAwesome');

var {
  StyleSheet,
  PropTypes,
  View,
  Text,
  TouchableOpacity,
} = React;

export default class ButtonNav extends React.Component {
  static propTypes = {
    leftPress: React.PropTypes.func,
    mainPress: React.PropTypes.func,
    rightPress: React.PropTypes.func,
    leftIcon: React.PropTypes.string,
    mainIcon: React.PropTypes.string,
    rightIcon: React.PropTypes.string,
  };

  static defaultProps = {
    leftIcon: 'arrow-left',
    rightIcon: 'arrow-right',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.buttonContainer}>
        {this.props.leftPress ? 
          <TouchableOpacity onPress={this.props.leftPress} activeOpacity={0.6} style={[styles.button, styles.secondaryButton]}>
            <Icon name={this.props.leftIcon} size={26} color="white"/>
          </TouchableOpacity> : null
        }
        
        <TouchableOpacity onPress={this.props.mainPress} activeOpacity={0.6} style={[styles.button, styles.mainButton]}>
          <Icon name={this.props.mainIcon} size={40} color="white"/>
        </TouchableOpacity>

        {this.props.rightPress ? 
          <TouchableOpacity onPress={this.props.rightPress} activeOpacity={0.6} style={[styles.button, styles.secondaryButton]}>
            <Icon name={this.props.rightIcon} size={26} color="white"/>
          </TouchableOpacity> : null
        }
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
