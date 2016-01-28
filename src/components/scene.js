/* @flow */
/*eslint-disable prefer-const */

import React from "react-native";

import App from "../containers/app";
import NavigationBar from "./navigation-bar";
import ParallaxList from "./parallax-list";
import DotsMap from "./dots-map";
import ItemSlider from "./item-slider";

let {
  Navigator,
  View
} = React;

class Scene extends React.Component {
  renderScene(route: Object, navigator: Object) {
    const Component = route.component;
    return (
      <View style={{flex: 1}}>
        <NavigationBar
          backgroundStyle={{backgroundColor: "#564ccd", }}
          navigator={navigator}
          route={route}
          title={route.title}
          titleColor="#fff"
        />
        <Component
          navigator={navigator}
          route={route}
          {...route.passProps}
        />
      </View>
    );
  }
  render() {
    return (
      <Navigator
        style={{flex: 1}}
        renderScene={this.renderScene}
        initialRoute={{
          component: DotsMap,
          title: "Dots"
        }}
      />
    );
  }
}

export default Scene;
