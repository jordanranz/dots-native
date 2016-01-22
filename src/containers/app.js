import React from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ParallaxList from "../components/parallax-list";
import DotsMapbox from "../components/dots-mapbox";

export default class App extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollableTabView>
        <DotsMapbox tabLabel="Map" />
        <ParallaxList tabLabel="List" />
      </ScrollableTabView>
    );
  }
}

