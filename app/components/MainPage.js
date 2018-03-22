import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
//import { StackNavigator } from "react-navigation";

import Button from "./Button";
import quizView from "./View/quizView";


export default class MainPage extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    },
    headerLeft: null
  };
  render() {
    return(
    <View style = { styles.MainContainer }>
 
    <View style={{marginBottom: 20}}>

     <Text style = { styles.TextStyle }> This is MainActivity </Text>

    </View>
    <Button
            text="Play"
            onPress={() => this.props.navigation.navigate("quizView")}
          />
    
   
  </View>
    );
  }
}

const styles = StyleSheet.create({
   MainContainer: {
      justifyContent: 'center',
      flex:1,
      margin: 10,
      backgroundColor:'green',
    
   },

  });
AppRegistry.registerComponent("MainPage", () => MainPage);
