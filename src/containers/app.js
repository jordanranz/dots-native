import React from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ParallaxList from "../components/parallax-list";

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
        <ParallaxList tabLabel="List" />
      </ScrollableTabView>
    );
  }
}

