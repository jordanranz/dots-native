/* @flow */

import React from "react-native";
import { Provider } from "react-redux/native";
import configureStore from "../store/configure-store";
import Scene from "../components/scene";
import App from "./app";

const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}

export default Root;
