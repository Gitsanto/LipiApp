/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, StatusBar, Text, View } from "react-native";
import { StackNavigator } from "react-navigation";

import Screen from "./app/components/Screen";
import Swiper from "./app/components/Swiper";
import MainPage from "./app/components/MainPage";

import quizView from "./app/components/View/quizView";
import list from "./app/components/list";
import setting from "./app/components/setting";
import Stage from "./app/components/Stage";

/*const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});*/

class Home extends Component<{}> {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    },
    header: null
  };
   _loadResourcesAsync = () => {
    return Promise.all([
      this._loadAssetsAsync(),
      
    ])
  }
//hiding statusBar
componentDidMount() {
  StatusBar.setHidden(true);
}
  
  _loadAssetsAsync = async () => {
    return Promise.all([
      
      Asset.fromModule(require('./assets/icon.png')).downloadAsync(),
     
    ]);
  };

  render() {
    if (!this.state.fontLoaded) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={console.error}
          onFinish={() => {
            this.setState({ fontLoaded: true });
          }}
        />
      );
    }
    return (
      <View style={styles.container}>
             {/*<StatusBar barStyle="light-content" backgroundColor="#16a085" />*/}

        <Screen navigation={this.props.navigation} />
      </View>
    );
  }
}

export default App = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home"
    }
  },
  Screen: {
    screen: Screen,
    navigationOptions: {
      title: "Screen"
    }
  },
  Swiper: {
    screen: Swiper,
    navigationOptions: {
      title: "Swiper"
    }
  },
  MainPage: {
    screen: MainPage,
    navigationOptions: {
      title: "MainPage"
    }
  },
   quizView: {
    screen: quizView,
    navigationOptions: {
      title: "quizView"
    }
  },
  
  list: {
    screen: list,
    navigationOptions: {
      title: "list"
    }
  },
  setting: {
    screen: setting,
    navigationOptions: {
      title: "setting"
    }
  },
  Stage: {
    screen: Stage,
    navigationOptions: {
      title: "Stage"
    }
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
