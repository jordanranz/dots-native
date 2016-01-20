/* @flow */
/*eslint-disable prefer-const */

import React from "react-native";
import { connect } from "react-redux/native";
import { fetchData } from "../actions";

let {
  Text,
  ScrollView
} = React;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchData());
  }
  render() {
    return (
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>{this.props.isFetching ? "Loading" : this.props.meow}</Text>
      </ScrollView>
    );
  }
}

App.propTypes = {
  dispatch: React.PropTypes.func,
  message: React.PropTypes.string,
  isFetching: React.PropTypes.bool,
  meow: React.PropTypes.string
};

App.defaultProps = {
  dispatch: () => {},
  isFetching: false,
  message: "",
  meow: "lol"
};

export default connect((state) => ({
  isFetching: state.data.isFetching,
  message: state.data.message,
  meow: state.data.meow
}))(App);
