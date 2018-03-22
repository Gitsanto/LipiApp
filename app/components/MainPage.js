import React, { Component } from "react";
import {
  AppRegistry,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Image
} from "react-native";
//import { StackNavigator } from "react-navigation";

import Button from "./Button";
import quizView from "./View/quizView";
import list from "./list";
import Stage from "./Stage";


import Icon from "react-native-vector-icons/Feather";

const { width, height } = Dimensions.get("window");
export default class MainPage extends Component {
  static navigationOptions = {
    headerVisible: false,
    header: null
  };
  //hiding statusBar
  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <View style={styles.MainContainer}>
      
        <View style={styles.iconItem}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate("setting")}
          >
            
          
          </TouchableHighlight>
        </View>
        <View style={styles.mapNepal}>
          {/* <TouchableHighlight onPress={() => this.props.navigation.navigate("quizView") } style={ styles.imageContainer }>                    */}
          <Image
            source={require("../../assets/img/nepal.png")}
            style={{
              width: width,
              height: height / 2,
              flex: 1,
              resizeMode: "contain",
              paddingTop: 50
            }}
          />
        </View>
        <View style = { styles.buttonContainer }>
        <TouchableHighlight onPress={() => this.props.navigation.navigate("Stage") } >
                 <Image source={require('../../assets/img/playButton.png')} style={{resizeMode:"center"}} />
                 </TouchableHighlight>
          </View>
        
        

        <View style={styles.footer}>
       <Text style={{fontSize: 25,fontWeight: 'bold',color:'white', marginLeft:40}}>Lets learn and play Nepali</Text>
        </View>
        {/*<Button
            text="To Do"
            onPress={() => this.props.navigation.navigate("list")}
          />
         */}
         <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/img/panda.png")}
            style={{bottom:0}} />
          
        </View>
       

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "#00bcd4"
  },

  buttonContainer:{
    flex:1, 
    position:'absolute',
    height:height,
    width:width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.5)'
  },

  iconItem: {
    position: "absolute",

    flex: 1,
    marginLeft: width - 70,

    zIndex: 2
  },
  mapNepal: {
    width: width,

    backgroundColor: "green",

    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  imageContainer: {
    flex:1,
    position:'absolute',
    left:-50,
    bottom:0,
    height:height/2,
    width:width/2,
    justifyContent: "center",
    alignItems: "center"
    
  },
  footer: {
    flex:1,
    backgroundColor:'green',
    alignItems:'center',
    justifyContent: "center",
   
  
    
    
  }
});
AppRegistry.registerComponent("MainPage", () => MainPage);
