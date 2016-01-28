import React from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ParallaxList from "../components/parallax-list";
import ItemSlider from "../components/item-slider";
import DotsMap from "../components/dots-map";

export default class ScrollableTabView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollableTabView locked={true} tabBarPosition={"bottom"}>
        <DotsMap tabLabel="Map" />
        <ParallaxList tabLabel="List" />
      </ScrollableTabView>
    );
  }
}

