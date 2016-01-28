import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux'

import DotsMap from "../components/dots-map";
import ParallaxList from "../components/parallax-list";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router name="root" hideNavBar={true}>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>

        <Route name="map" component={DotsMap} initial={true} title="Map" type="replace"/>
        <Route name="list" component={ParallaxList} title="List" hideNavBar={true} type="replace"/>
      </Router>
    );
  }
}

